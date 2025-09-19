type Grid = (0 | 1)[][];

export const calculateNextGeneration = (grid: Grid): Grid => {
  const rows = grid.length;
  if (rows === 0) return [];
  const cols = grid[0].length;
  if (cols === 0) return [];

  // Create a new grid to store the next state
  const newGrid = grid.map(arr => [...arr]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];
      let liveNeighbors = 0;

      neighbors.forEach(([x, y]) => {
        const newRow = (row + x + rows) % rows;
        const newCol = (col + y + cols) % cols;
        liveNeighbors += grid[newRow][newCol];
      });

      const cell = grid[row][col];
      // Apply Conway's Game of Life rules
      if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        newGrid[row][col] = 0; // Dies by underpopulation or overpopulation
      } else if (cell === 0 && liveNeighbors === 3) {
        newGrid[row][col] = 1; // Comes to life
      }
      // Introduce chaos to prevent static loops
      if (Math.random() < 0.0005) {
        newGrid[row][col] = Math.random() > 0.5 ? 1 : 0;
      }
    }
  }

  return newGrid;
};
