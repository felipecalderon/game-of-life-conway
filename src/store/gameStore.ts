import { create } from 'zustand';
import { calculateNextGeneration } from '../utils/gameLogic';
import type { GameState } from '../types';

/**
 * Hook de Zustand para gestionar el estado global del juego.
 * Contiene el estado de la grilla, las dimensiones, el estado de ejecución y las acciones para manipularlo.
 */
export const useGameStore = create<GameState>((set, get) => ({
  /** La grilla actual del juego, representada como una matriz 2D. */
  grid: [],
  /** Número de filas en la grilla. */
  rows: 0,
  /** Número de columnas en la grilla. */
  cols: 0,
  /** `true` si la simulación está en curso, `false` si está pausada. */
  isRunning: true,
  /** El número de la generación actual. */
  generation: 0,

  /**
   * Inicializa o reinicia la grilla con un patrón aleatorio.
   * @param rows El número de filas para la nueva grilla.
   * @param cols El número de columnas para la nueva grilla.
   */
  initializeGrid: (rows, cols) => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
    );
    set({ grid: newGrid, rows, cols, generation: 0 });
  },

  /**
   * Calcula y establece la siguiente generación de la grilla.
   */
  nextGeneration: () => {
    set(state => ({
      grid: calculateNextGeneration(state.grid),
      generation: state.generation + 1,
    }));
  },

  /**
   * Cambia el estado de una célula individual (de viva a muerta o viceversa).
   * @param row La fila de la célula a cambiar.
   * @param col La columna de la célula a cambiar.
   */
  toggleCell: (row, col) => {
    const newGrid = get().grid.map(arr => [...arr]);
    newGrid[row][col] = newGrid[row][col] ? 0 : 1;
    set({ grid: newGrid });
  },
}));
