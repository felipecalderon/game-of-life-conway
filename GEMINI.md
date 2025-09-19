# GEMINI Project Context: Conway's Game of Life

## Project Overview

El Juego de la vida de Conway, background misterioso: El objetivo es crear una simulación del Juego de la Vida que ocupe toda la pantalla, recalculando su tamaño dinámicamente. Usaremos un stack moderno con React, TypeScript, Zustand y Tailwind CSS

- **Framework:** React
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Linting:** ESLint
- **Store:** Zustand

The main application entry point is `src/main.tsx`, which renders the root `App` component from `src/App.tsx`.

## Building and Running

The following scripts are defined in `package.json` and can be run with `pnpm <script>`:

- **`pnpm dev`**: Starts the Vite development server with Hot Module Replacement (HMR) for a live development experience.
- **`pnpm build`**: Type-checks the code with TypeScript (`tsc -b`) and then creates a production-ready build of the application in the `dist/` directory.
- **`pnpm lint`**: Runs ESLint to check the entire codebase for style and programming errors.
- **`pnpm preview`**: Starts a local web server to preview the production build from the `dist/` directory.

## Estructura del Proyecto (Clean Architecture)

/src
|-- /components # Componentes reutilizables (ej. Grid, Cell)
|-- /hooks # Hooks personalizados (ej. useGridCalculation)
|-- /store # Lógica de Zustand para el estado global
|-- /types # Definiciones de tipos de TypeScript
|-- /utils # Funciones de utilidad (lógica del juego)
|-- /App.tsx # Componente principal
|-- /index.css # Estilos globales con Tailwind
|-- /main.tsx # Punto de entrada de la aplicación

## Interfaz principal:

interface GameState {
grid: (0 | 1)[][];
rows: number;
cols: number;
isRunning: boolean;
generation: number;
initializeGrid: (rows: number, cols: number) => void;
nextGeneration: () => void;
toggleCell: (row: number, col: number) => void;
}
