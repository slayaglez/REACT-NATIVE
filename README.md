# REACT-NATIVE · Dossier UT2

Proyecto Expo único: `dossier-react-native/`. Todas las prácticas se abren desde el índice (`src/app/index.tsx`).
Cada ruta de `src/app/practicaXX.tsx` reexporta una pantalla de `src/screens/`.

Arranque: `cd dossier-react-native && npx expo start` y pulsar `a` con el emulador abierto.

---

## Práctica 1. Hola mundo

**Procedimiento:** pantalla `src/screens/HolaMundoScreen.tsx` con un `View` y un `Text` que muestra «¡Hola mundo! Soy Sebastián». Estilos con `StyleSheet.create()`: fondo `lightpink`, `flex: 1`, `justifyContent: 'center'` y `alignItems: 'center'`. La ruta `src/app/practica01.tsx` la exporta.

**Captura:**

![Práctica 1](capturas/practica01.png)

**Problemas encontrados:** —

**Estado:** ✅ Completada

## Práctica 2. Contador con dos botones

**Procedimiento:** estado `contador` con `useState(0)` y dos `Button`: «Incrementar» (`setContador(n => n + 1)`) y «Decrementar» (`setContador(n => n - 1)`). El valor se muestra en un `Text`. El contenedor personaliza el color de fondo, el color del borde (`borderColor`, `borderWidth`) y redondea las esquinas con `borderRadius`. Ruta: `src/app/practica02.tsx`.

**Captura:**

![Práctica 2](capturas/practica02.png)

**Problemas encontrados:** el `Button` nativo no admite estilos de `View`; solo se ha cambiado su `color`.

**Estado:** ✅ Completada

## Práctica 3. `InicioScreen` y estilos separados

**Procedimiento:** el contador de la práctica 2 se ha movido a `src/screens/InicioScreen.tsx`, con sus estilos en `StyleSheet.create()`. El «Hola mundo» se ha conservado en `src/screens/HolaMundoScreen.tsx`. Las rutas de `src/app/` solo enlazan a las pantallas:

```tsx
// src/app/practica03.tsx
export { default } from '../screens/InicioScreen';
```

Como ya se ha creado el índice general (apartado «Estructura de carpetas»), `src/app/index.tsx` es el menú de prácticas en vez de mostrar `<InicioScreen />` directamente.

**Captura:**

![Práctica 3](capturas/practica03.png)

**Problemas encontrados:** —

**Estado:** ✅ Completada

## Práctica 4. Tres cajas

**Procedimiento:** componente reutilizable `src/components/Caja.tsx` (100 × 100) que recibe por propiedades `nombre` y `bg` (color de fondo, `green` por defecto) y combina estilos con `style={[styles.caja, { backgroundColor: bg }]}`. La pantalla `src/screens/PrincipalScreen.tsx` muestra el texto «Contenedor Principal» y un `View` escenario con `flex: 1` que contiene tres `Caja` de colores distintos (rojo, azul y verde por defecto). Ruta: `src/app/practica04.tsx`.

**Captura:**

![Práctica 4](capturas/practica04.png)

**Problemas encontrados:** —

**Estado:** ✅ Completada

## Práctica 5. Modificar `flex` dinámicamente

**Procedimiento:** nuevo componente `src/components/CajaFlex.tsx`, una variante de `Caja` sin altura fija (con `height: 100` el `flex` apenas se notaría). Recibe por propiedades `nombre`, `bg`, el valor actual `valorFlex` y dos funciones (`onMas` y `onMenos`), y aplica `{ flex: valorFlex }` a su `View`. La pantalla `src/screens/Practica5.tsx` guarda tres estados independientes (`flex1`, `flex2`, `flex3`, empezando en 1) y pasa a cada caja sus funciones: `n => n + 1` para aumentar y `n => Math.max(0, n - 1)` para disminuir sin bajar de 0. Cada caja muestra su valor actual y el escenario reparte el espacio vertical en proporción a esos valores. `Caja` y la práctica 4 no se modifican. Ruta: `src/app/practica05.tsx`.

**Captura:**

![Práctica 5](capturas/practica05.png)

**Problemas encontrados:** —

**Estado:** ✅ Completada
