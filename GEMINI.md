# Contexto del Proyecto GEMINI: El Juego de la Vida de Conway

## Descripción General del Proyecto

Este proyecto es una implementación madura y dinámica del Juego de la Vida de Conway. La simulación está diseñada para ocupar toda la pantalla, recalculando sus dimensiones dinámicamente cuando la ventana cambia de tamaño. Utiliza un stack tecnológico moderno que incluye React, TypeScript, Zustand para el manejo del estado y Tailwind CSS para los estilos. La aplicación cuenta con controles para pausar/reanudar la simulación, ajustar la velocidad y aleatorizar el estado de la cuadrícula.

- **Framework:** React
- **Lenguaje:** TypeScript
- **Herramienta de Build:** Vite
- **Estilos:** Tailwind CSS
- **Linting:** ESLint
- **Manejo de Estado:** Zustand

El punto de entrada principal de la aplicación es `src/main.tsx`, que renderiza el componente raíz `App` desde `src/App.tsx`.

## Compilación y Ejecución

Los siguientes scripts están definidos en `package.json` y se pueden ejecutar con `pnpm <script>`:

- **`pnpm dev`**: Inicia el servidor de desarrollo de Vite con Hot Module Replacement (HMR).
- **`pnpm build`**: Comprueba los tipos del código con TypeScript (`tsc -b`) y luego crea una build de producción en el directorio `dist/`.
- **`pnpm lint`**: Ejecuta ESLint para revisar todo el código en busca de errores de estilo y programación.
- **`pnpm preview`**: Inicia un servidor web local para previsualizar la build de producción del directorio `dist/`.
- **`pnpm deploy`**: Despliega la aplicación en GitHub Pages.

## Estructura del Proyecto (Arquitectura Limpia)

```
/src
|-- /components     # Componentes de React reutilizables (Grid, Cell, Controls)
|-- /hooks          # Hooks personalizados (ej. useGridCalculation)
|-- /store          # Store de Zustand para el estado global (gameStore)
|-- /types          # Definiciones de tipos de TypeScript
|-- /utils          # Funciones de utilidad (gameLogic)
|-- App.tsx         # Componente principal de la aplicación
|-- index.css       # Estilos globales con Tailwind CSS
|-- main.tsx        # Punto de entrada de la aplicación
```

## Interfaz del Estado Principal (Zustand)

El estado global de la aplicación es gestionado por Zustand y se define en `src/store/gameStore.ts`. La interfaz principal es `GameState`:

```typescript
interface GameState {
  grid: (0 | 1)[][];
  rows: number;
  cols: number;
  isRunning: boolean;
  generation: number;
  speed: number;
  initialChaos: number;
  evolutionChaos: number;

  // Acciones
  initializeGrid: (rows: number, cols: number) => void;
  nextGeneration: () => void;
  toggleCell: (row: number, col: number) => void;
  toggleIsRunning: () => void;
  randomizeGrid: () => void;
  setSpeed: (speed: number) => void;
  setInitialChaos: (chaos: number) => void;
  setEvolutionChaos: (chaos: number) => void;
}
```
