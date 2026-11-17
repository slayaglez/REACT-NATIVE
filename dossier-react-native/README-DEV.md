# Entorno de desarrollo

Este proyecto se programa dentro de una VM de VirtualBox. Hay tres formas de ver la app con recarga en vivo (Fast Refresh: guardas en el IDE y el cambio aparece al instante):

| Opción | Comando en la VM | Cuándo usarla |
|---|---|---|
| **A. Emulador en el anfitrión** (recomendada) | `npm run dev:host` | Rápido y estable. Requiere el script del anfitrión (abajo). |
| **B. Móvil físico** | `npm run dev:tunnel` | Escanea el QR con Expo Go (Play Store). |
| **C. Emulador dentro de la VM** | `npm run dev` | Lento; configurado en modo ligero, puede colgar la VM. |
| Navegador | `npm run dev:web` | Maquetar rápido; no es 100 % fiel al móvil. |

Todos los comandos se lanzan desde `dossier-react-native/` e instalan dependencias si faltan.

## A. Emulador en el anfitrión + Metro en la VM

```
emulador (anfitrión) ──adb reverse──> 127.0.0.1:8081 (anfitrión) ──NAT VirtualBox──> VM:8081 (Metro)
```

1. **En la VM:** `npm run dev:host` (deja Metro corriendo).
2. **En el anfitrión:** copia `scripts/host/emulador-anfitrion.sh` (vía `git pull` del repo, o como prefieras) y ejecútalo:
   ```bash
   ./emulador-anfitrion.sh               # detecta la VM si solo hay una encendida
   ./emulador-anfitrion.sh "Nombre VM"   # si hay varias
   ```

El script es idempotente. La primera vez descarga el SDK (~3 GB en `~/Android/Sdk` del anfitrión, sin sudo; necesita Java 17+) y crea el AVD `dossier_host`. También añade la redirección del puerto 8081 a la VM (solo en `127.0.0.1`, no se expone a la red), arranca el emulador, instala Expo Go y abre la app.

Las siguientes veces solo arranca el emulador y conecta: unos segundos.

Si reinicias el emulador o Expo Go pierde la conexión, vuelve a ejecutar el script del anfitrión.

## Atajos en la terminal de Metro

| Tecla | Acción |
|---|---|
| `r` | Recargar la app |
| `m` | Menú de desarrollo |
| `j` | Abrir el debugger |
| `Ctrl+C` | Parar Metro |

## C. Emulador dentro de la VM

Necesita virtualización anidada (ya activada: `VBoxManage modifyvm "NOMBRE_VM" --nested-hw-virt on`). El AVD `dossier_pixel` usa GPU por software, 2 GB de RAM y 2 núcleos para no tumbar la VM. Si aun así se cuelga, usa la opción A o la B.

`npm run setup:android` instala o repara el SDK y el AVD de la VM. Android Studio está en `~/.local/opt/android-studio/bin/studio`.

## Problemas frecuentes

- **Pantalla en blanco o la app no conecta:** pulsa `r` en Metro, o `npx expo start -c` para limpiar caché.
- **Opción A: "Metro no responde":** ¿está `npm run dev:host` corriendo en la VM? Comprueba en el anfitrión `curl 127.0.0.1:8081/status` (debe decir `packager-status:running`).
- **El emulador no arranca:** mira `/tmp/emulator-$USER.log`.
- **Añadí una librería nativa y falla en Expo Go:** Expo Go solo trae los módulos de Expo; necesitas un development build (`npx expo run:android`). Instala paquetes siempre con `npx expo install <paquete>`.
