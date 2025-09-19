export type Grid = (0 | 1)[][];

export interface GameState {
  grid: Grid;
  backGrid: Grid;
  rows: number;
  cols: number;
  isRunning: boolean;
  generation: number;
  speed: number;
  initialChaos: number;
  evolutionChaos: number;
  initializeGrid: (rows: number, cols: number) => void;
  nextGeneration: () => void;
  toggleCell: (row: number, col: number) => void;
  toggleIsRunning: () => void;
  setSpeed: (speed: number) => void;
  setInitialChaos: (chaos: number) => void;
  setEvolutionChaos: (chaos: number) => void;
  randomizeGrid: () => void;
}
