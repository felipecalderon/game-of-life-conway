export type Grid = (0 | 1)[][];

export interface GameState {
  grid: Grid;
  backGrid: Grid;
  rows: number;
  cols: number;
  isRunning: boolean;
  generation: number;
  initializeGrid: (rows: number, cols: number) => void;
  nextGeneration: () => void;
  toggleCell: (row: number, col: number) => void;
  toggleIsRunning: () => void;
}
