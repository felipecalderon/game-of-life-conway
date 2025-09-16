export interface GameState {
  grid: (0 | 1)[][];
  rows: number;
  cols: number;
  isRunning: boolean;
  generation: number;
  initializeGrid: (rows: number, cols: number) => void;
  nextGeneration: () => void;
  toggleCell: (row: number, col: number) => void;
}
