import { create } from 'zustand';
import { calculateNextGeneration } from '../utils/gameLogic';
import type { GameState } from '../types';

export const useGameStore = create<GameState>((set, get) => ({
  grid: [],
  rows: 0,
  cols: 0,
  isRunning: true, // Start running by default
  generation: 0,

  initializeGrid: (rows, cols) => {
    const newGrid = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => (Math.random() > 0.7 ? 1 : 0))
    );
    set({ grid: newGrid, rows, cols, generation: 0 }); // Reset generation on init
  },

  nextGeneration: () => {
    set(state => ({
      grid: calculateNextGeneration(state.grid),
      generation: state.generation + 1, // Increment generation
    }));
  },

  toggleCell: (row, col) => {
    const newGrid = get().grid.map(arr => [...arr]);
    newGrid[row][col] = newGrid[row][col] ? 0 : 1;
    set({ grid: newGrid });
  },
}));
