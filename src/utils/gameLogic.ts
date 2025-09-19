/**
 * @file Contiene la lógica principal del Juego de la Vida de Conway.
 */

import type { Grid } from "../types";

// Coordenadas de las 8 celdas vecinas, definidas una sola vez para optimización.
const neighbors = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

/**
 * Calcula el siguiente estado de la grilla y lo escribe en un buffer de escritura (writeGrid),
 * basándose en el estado de un buffer de lectura (readGrid).
 * Esta función MUTA el `writeGrid`.
 *
 * @param readGrid El estado actual de la grilla desde donde se lee.
 * @param writeGrid El buffer donde se escribirá el nuevo estado de la grilla.
 */
export const calculateNextGeneration = (
  readGrid: Grid,
  writeGrid: Grid
): void => {
  const rows = readGrid.length;
  if (rows === 0) return;
  const cols = readGrid[0].length;
  if (cols === 0) return;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      let liveNeighbors = 0;

      // Calcula el número de vecinas vivas desde el `readGrid`.
      neighbors.forEach(([x, y]) => {
        const newRow = (row + x + rows) % rows;
        const newCol = (col + y + cols) % cols;
        liveNeighbors += readGrid[newRow][newCol];
      });

      const cell = readGrid[row][col];
      let newCellState = cell;

      /**
       * Aplicación de las reglas del Juego de la Vida:
       */
      if (cell === 1 && (liveNeighbors < 2 || liveNeighbors > 3)) {
        newCellState = 0; // Muere
      } else if (cell === 0 && liveNeighbors === 3) {
        newCellState = 1; // Nace
      }

      // Factor de "caos"
      if (Math.random() < 0.0005) {
        newCellState = Math.random() > 0.5 ? 1 : 0;
      }

      // Escribe el resultado en el buffer de escritura.
      writeGrid[row][col] = newCellState;
    }
  }
};
