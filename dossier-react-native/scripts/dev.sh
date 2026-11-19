#!/usr/bin/env bash
# Arranca el entorno de desarrollo.
#   ./scripts/dev.sh          -> emulador Android + Expo Go (por defecto)
#   ./scripts/dev.sh tunnel   -> móvil físico con Expo Go (QR vía túnel)
#   ./scripts/dev.sh web      -> navegador
#   ./scripts/dev.sh host     -> solo Metro, para el emulador del anfitrión (scripts/host/)
set -euo pipefail
cd "$(dirname "$0")/.."

export ANDROID_HOME="${ANDROID_HOME:-$HOME/Android/Sdk}"
export PATH="$ANDROID_HOME/emulator:$ANDROID_HOME/platform-tools:$PATH"
AVD_NAME="${AVD_NAME:-dossier_pixel}"
MODE="${1:-android}"

[[ -d node_modules ]] || { echo "==> Instalando dependencias..."; npm install; }

case "$MODE" in
  tunnel) exec npx expo start --tunnel ;;
  web)    exec npx expo start --web ;;
  host)
    echo "==> Metro para el emulador del anfitrión. En el anfitrión ejecuta: scripts/host/emulador-anfitrion.sh"
    exec npx expo start ;;
  android) ;;
  *) echo "Uso: $0 [android|tunnel|web|host]"; exit 1 ;;
esac

if [[ ! -e /dev/kvm ]]; then
  echo "ERROR: /dev/kvm no existe; el emulador no puede arrancar."
  echo "Activa la virtualización anidada (ver README-DEV.md) o usa: npm run dev:tunnel"
  exit 1
fi
if [[ ! -x "$ANDROID_HOME/emulator/emulator" ]] || ! emulator -list-avds | grep -qx "$AVD_NAME"; then
  echo "==> Falta el SDK o el AVD; ejecutando setup..."
  bash scripts/setup-android.sh
fi

if ! adb devices | grep -q '^emulator-.*device$'; then
  echo "==> Arrancando emulador '$AVD_NAME'..."
  nohup emulator -avd "$AVD_NAME" -no-snapshot-save -no-boot-anim >/tmp/emulator-"$USER".log 2>&1 &
  adb wait-for-device
  until [[ "$(adb shell getprop sys.boot_completed 2>/dev/null | tr -d '\r')" == "1" ]]; do sleep 2; done
  echo "==> Emulador listo."
fi

# Expo instala Expo Go en el emulador si hace falta y abre la app.
exec npx expo start --android
