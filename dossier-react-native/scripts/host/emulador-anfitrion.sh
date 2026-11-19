#!/usr/bin/env bash
# SE EJECUTA EN EL ANFITRIÓN (Linux), no en la VM.
#
# Arranca un emulador Android en el anfitrión (KVM nativo, rápido) y lo conecta
# con Metro, que corre dentro de la VM de VirtualBox:
#
#   emulador ──adb reverse──> 127.0.0.1:8081 (anfitrión) ──NAT VirtualBox──> VM:8081 (Metro)
#
# Uso:  ./emulador-anfitrion.sh ["Nombre de la VM"]
#       (si solo hay una VM encendida, el nombre se detecta solo)
#
# La primera vez descarga el SDK (~3 GB) en ~/Android/Sdk. No necesita sudo.
set -euo pipefail

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$PATH"
AVD_NAME="${AVD_NAME:-dossier_host}"
API="${ANDROID_API:-36}"
IMAGE="system-images;android-${API};google_apis;x86_64"
EXPO_SDK="${EXPO_SDK:-58.0.0}"
PORT=8081
CLT_URL="https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip"

say() { printf '\n==> %s\n' "$*"; }
die() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

[[ -e /dev/kvm ]] || die "/dev/kvm no existe en el anfitrión. Activa VT-x/AMD-V en la BIOS."
[[ -r /dev/kvm && -w /dev/kvm ]] || die "Sin permiso sobre /dev/kvm: sudo usermod -aG kvm \$USER y vuelve a iniciar sesión."
command -v VBoxManage >/dev/null || die "No encuentro VBoxManage."

# --- Java (lo necesita sdkmanager) ---------------------------------------------
if ! command -v java >/dev/null; then
  for jbr in "$HOME"/.local/opt/android-studio/jbr /opt/android-studio/jbr /snap/android-studio/current/jbr; do
    [[ -x "$jbr/bin/java" ]] && { export JAVA_HOME="$jbr"; export PATH="$jbr/bin:$PATH"; break; }
  done
fi
command -v java >/dev/null || die "Falta Java 17+. Instálalo (p.ej. sudo apt install openjdk-21-jre-headless) y repite."

# --- 1. SDK mínimo para emular -------------------------------------------------
if [[ ! -x "$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager" ]]; then
  say "Descargando Android command-line tools..."
  tmp="$(mktemp -d)"
  curl -sSL -o "$tmp/clt.zip" "$CLT_URL"
  unzip -q "$tmp/clt.zip" -d "$tmp"
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  rm -rf "$ANDROID_HOME/cmdline-tools/latest"
  mv "$tmp/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
  rm -rf "$tmp"
fi
if [[ ! -x "$ANDROID_HOME/emulator/emulator" || ! -x "$ANDROID_HOME/platform-tools/adb" || ! -d "$ANDROID_HOME/system-images/android-${API}/google_apis/x86_64" ]]; then
  say "Instalando emulador, platform-tools e imagen Android ${API} (tarda la primera vez)..."
  yes | sdkmanager --licenses >/dev/null || true
  sdkmanager --install "platform-tools" "emulator" "$IMAGE" | grep -v '^\[' || true
fi

# --- 2. AVD --------------------------------------------------------------------
if ! emulator -list-avds | grep -qx "$AVD_NAME"; then
  say "Creando AVD '$AVD_NAME'..."
  echo no | avdmanager create avd -n "$AVD_NAME" -k "$IMAGE" -d pixel_7 --force 2>&1 | grep -v devices.xml || true
  cfg="$HOME/.android/avd/${AVD_NAME}.avd/config.ini"
  sed -i '/^hw.keyboard=/d;/^hw.ramSize=/d;/^hw.gpu/d' "$cfg"
  printf 'hw.keyboard=yes\nhw.ramSize=4096\nhw.gpu.enabled=yes\nhw.gpu.mode=host\n' >> "$cfg"
fi

# --- 3. Redirección de puertos de VirtualBox (anfitrión:8081 -> VM:8081) ----------
VM="${1:-}"
if [[ -z "$VM" ]]; then
  mapfile -t running < <(VBoxManage list runningvms | sed -E 's/^"(.*)" \{.*/\1/')
  [[ ${#running[@]} -eq 1 ]] || die "Indica el nombre de la VM: $0 \"Nombre VM\"  (encendidas: ${running[*]:-ninguna})"
  VM="${running[0]}"
fi
if ! VBoxManage showvminfo "$VM" --machinereadable | grep -q '^Forwarding.*="metro,'; then
  say "Añadiendo redirección de puerto $PORT a la VM '$VM'..."
  if VBoxManage list runningvms | grep -q "^\"$VM\""; then
    VBoxManage controlvm "$VM" natpf1 "metro,tcp,127.0.0.1,$PORT,,$PORT"
  else
    VBoxManage modifyvm "$VM" --natpf1 "metro,tcp,127.0.0.1,$PORT,,$PORT"
  fi
fi

# --- 4. Emulador ---------------------------------------------------------------
if ! adb devices | grep -q '^emulator-.*device$'; then
  say "Arrancando emulador '$AVD_NAME'..."
  nohup emulator -avd "$AVD_NAME" -no-snapshot-save -no-boot-anim >"/tmp/emulator-$USER.log" 2>&1 &
  adb wait-for-device
  until [[ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do sleep 2; done
fi

# --- 5. Expo Go ----------------------------------------------------------------
if ! adb shell pm list packages | grep -q 'host.exp.exponent'; then
  say "Instalando Expo Go (SDK $EXPO_SDK)..."
  apk_url="$(curl -fsSL https://api.expo.dev/v2/versions | python3 -c '
import json, sys
d = json.load(sys.stdin); d = d.get("data", d)
print(d["sdkVersions"].get(sys.argv[1], {}).get("androidClientUrl") or d["androidClientUrl"])' "$EXPO_SDK")"
  tmp="$(mktemp -d)"
  curl -fsSL -o "$tmp/expo-go.apk" "$apk_url"
  adb install -r "$tmp/expo-go.apk" >/dev/null
  rm -rf "$tmp"
fi

# --- 6. Conectar con Metro de la VM -------------------------------------------
adb reverse "tcp:$PORT" "tcp:$PORT" >/dev/null
if curl -fs -o /dev/null "http://127.0.0.1:$PORT/status"; then
  say "Metro responde desde la VM. Abriendo la app en Expo Go..."
  adb shell am start -a android.intent.action.VIEW -d "exp://127.0.0.1:$PORT" >/dev/null
else
  say "El emulador está listo, pero Metro no responde en el puerto $PORT."
  echo "    En la VM ejecuta:  npm run dev:host"
  echo "    Y después repite este script (o abre exp://127.0.0.1:$PORT en Expo Go)."
fi
