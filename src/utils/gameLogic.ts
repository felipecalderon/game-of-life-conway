/**
 * @file Contiene la lógica principal del Juego de la Vida de Conway.
 */

/**
 * Representa la estructura de la grilla del juego.
 * Es una matriz 2D donde `1` es una célula viva y `0` es una célula muerta.
 */
type Grid = (0 | 1)[][];

/**
 * Calcula el siguiente estado de la grilla basándose en las reglas del Juego de la Vida de Conway.
 *
 * @param grid El estado actual de la grilla.
 * @returns El nuevo estado de la grilla para la siguiente generación.
 */
export const calculateNextGeneration = (grid: Grid): Grid => {
  const rows = grid.length;
  if (rows === 0) return [];
  const cols = grid[0].length;
  if (cols === 0) return [];

  // Se crea una copia de la grilla para no mutar el estado original directamente.
  const newGrid = grid.map(arr => [...arr]);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      // Coordenadas de las 8 celdas vecinas.
      const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],         [0, 1],
        [1, -1], [1, 0], [1, 1],
      ];
      let liveNeighbors = 0;

      // Calcula el número de vecinas vivas.
      neighbors.forEach(([x, y]) => {
        // Lógica para un mundo toroidal (los bordes se conectan).
        const newRow = (row + x + rows) % rows;
        const newCol = (col + y + cols) % cols;
        liveNeighbors += grid[newRow][newCol];
      });

      const cell = grid[row][col];

      /**
       * Aplicación de las reglas del Juego de la Vida:
       * 1. Una célula viva con menos de 2 vecinas vivas muere (subpoblación).
       * 2. Una célula viva con más de 3 vecinas vivas muere (sobrepoblación).
       * 3. Una célula muerta con exactamente 3 vecinas vivas nace.
       * 4. Una célula viva con 2 o 3 vecinas vivas sobrevive (caso implícito).
       */
      if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        newGrid[row][col] = 0;
      } else if (cell === 0 && liveNeighbors === 3) {
        newGrid[row][col] = 1;
      }

      // Factor de "caos": introduce una pequeña probabilidad de cambio aleatorio.
      // Esto previene que la simulación se estanque en patrones estáticos.
      if (Math.random() < 0.0005) {
        newGrid[row][col] = Math.random() > 0.5 ? 1 : 0;
      }
    }
  }

  return newGrid;
};
