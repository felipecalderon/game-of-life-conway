import { create } from 'zustand';
import { calculateNextGeneration } from '../utils/gameLogic';
import type { GameState, Grid } from '../types';

/**
 * Hook de Zustand para gestionar el estado global del juego.
 * Contiene el estado de la grilla, las dimensiones, el estado de ejecución y las acciones para manipularlo.
 * Utiliza una estrategia de doble buffer (`grid` y `backGrid`) para optimizar el cálculo de generaciones.
 */
export const useGameStore = create<GameState>((set, get) => ({
  /** La grilla actual del juego (buffer frontal), representada como una matriz 2D. */
  grid: [],
  /** La grilla del back-buffer, usada para escribir la siguiente generación. */
  backGrid: [],
  /** Número de filas en la grilla. */
  rows: 0,
  /** Número de columnas en la grilla. */
  cols: 0,
  /** `true` si la simulación está en curso, `false` si está pausada. */
  isRunning: true,
  /** El número de la generación actual. */
  generation: 0,

  /**
   * Inicializa o reinicia ambas grillas (principal y back-buffer) con un patrón aleatorio.
   * @param rows El número de filas para la nueva grilla.
   * @param cols El número de columnas para la nueva grilla.
   */
  initializeGrid: (rows, cols) => {
    const createRandomGrid = (): Grid =>
      Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
      );
    set({ grid: createRandomGrid(), backGrid: createRandomGrid(), rows, cols, generation: 0 });
  },

  /**
   * Calcula la siguiente generación usando la estrategia de doble buffer y los intercambia.
   */
  nextGeneration: () => {
    const { grid, backGrid } = get();
    // La lógica de cálculo ahora muta el backGrid en lugar de devolver una nueva grilla.
    calculateNextGeneration(grid, backGrid);

    // Intercambia los buffers: el back-buffer se convierte en el nuevo grid visible.
    set(state => ({
      grid: state.backGrid,
      backGrid: state.grid,
      generation: state.generation + 1,
    }));
  },

  /**
   * Cambia el estado de una célula individual en la grilla visible actualmente.
   * @param row La fila de la célula a cambiar.
   * @param col La columna de la célula a cambiar.
   */
  toggleCell: (row, col) => {
    set(state => {
      const newGrid = state.grid.map(arr => [...arr]);
      newGrid[row][col] = newGrid[row][col] ? 0 : 1;
      return { grid: newGrid };
    });
  },
}));
