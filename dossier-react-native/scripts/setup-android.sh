#!/usr/bin/env bash
# Instala/actualiza el Android SDK, el emulador y crea el AVD del proyecto.
# Idempotente: se puede ejecutar varias veces sin romper nada. No requiere sudo.
set -euo pipefail

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
AVD_NAME="${AVD_NAME:-dossier_pixel}"
API="${ANDROID_API:-36}"
IMAGE="system-images;android-${API};google_apis;x86_64"
CLT_URL="https://dl.google.com/android/repository/commandlinetools-linux-15859902_latest.zip"

SDKMANAGER="$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager"
AVDMANAGER="$ANDROID_HOME/cmdline-tools/latest/bin/avdmanager"

# 1. Command-line tools
if [[ ! -x "$SDKMANAGER" ]]; then
  echo "==> Descargando Android command-line tools..."
  tmp="$(mktemp -d)"
  curl -sSL -o "$tmp/clt.zip" "$CLT_URL"
  unzip -q "$tmp/clt.zip" -d "$tmp"
  mkdir -p "$ANDROID_HOME/cmdline-tools"
  rm -rf "$ANDROID_HOME/cmdline-tools/latest"
  mv "$tmp/cmdline-tools" "$ANDROID_HOME/cmdline-tools/latest"
  rm -rf "$tmp"
fi

# 2. Paquetes del SDK
echo "==> Aceptando licencias e instalando paquetes del SDK (puede tardar)..."
yes | "$SDKMANAGER" --licenses >/dev/null || true
"$SDKMANAGER" --install "platform-tools" "emulator" "platforms;android-${API}" "$IMAGE"

# 3. AVD
if ! "$ANDROID_HOME/emulator/emulator" -list-avds | grep -qx "$AVD_NAME"; then
  echo "==> Creando AVD '$AVD_NAME'..."
  echo no | "$AVDMANAGER" create avd -n "$AVD_NAME" -k "$IMAGE" -d pixel_7 --force
  cfg="$HOME/.android/avd/${AVD_NAME}.avd/config.ini"
  # Config ligera para correr dentro de una VM: GPU por software, 2 GB, 2 núcleos
  sed -i '/^hw.keyboard=/d;/^hw.ramSize=/d;/^hw.gpu/d;/^hw.cpu.ncore=/d' "$cfg"
  printf 'hw.keyboard=yes\nhw.ramSize=2048\nhw.cpu.ncore=2\nhw.gpu.enabled=yes\nhw.gpu.mode=swiftshader_indirect\n' >> "$cfg"
fi

# 4. Variables de entorno en ~/.bashrc
if ! grep -q 'ANDROID_HOME=' "$HOME/.bashrc" 2>/dev/null; then
  cat >> "$HOME/.bashrc" <<'EOF'

# Android SDK (añadido por dossier-react-native/scripts/setup-android.sh)
export ANDROID_HOME="$HOME/Android/Sdk"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$ANDROID_HOME/cmdline-tools/latest/bin:$HOME/.local/opt/android-studio/bin:$PATH"
EOF
  echo "==> Variables añadidas a ~/.bashrc (abre una terminal nueva para usarlas)."
fi

echo "==> Listo. AVD disponible: $AVD_NAME"
[[ -e /dev/kvm ]] || echo "AVISO: /dev/kvm no existe. El emulador no arrancará hasta activar la virtualización anidada (ver README-DEV.md)."
