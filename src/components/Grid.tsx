import { useRef, useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import type { GameState } from "../types";

interface GridProps {
  /** El tamaño en píxeles de cada celda cuadrada. */
  cellSize: number;
}

/**
 * Componente que renderiza la grilla del juego en un elemento <canvas>.
 * Utiliza dibujado por canva optimizada para únicamente actualizar las celdas que han cambiado.
 */
const Grid = ({ cellSize }: GridProps) => {
  const grid = useGameStore((state) => state.grid);
  const toggleCell = useGameStore((state) => state.toggleCell);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const prevGridRef = useRef<GameState["grid"] | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const rows = grid.length;
    if (rows === 0) return;
    const cols = grid[0].length;

    const prevGrid = prevGridRef.current;
    // Determina si es un redibujado completo (por cambio de tamaño) o una actualización.
    const isResizing =
      !prevGrid ||
      prevGrid.length !== rows ||
      (prevGrid[0] && prevGrid[0].length !== cols);

    if (isResizing) {
      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;
    }

    // Itera sobre cada celda para dibujarla si es necesario.
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // La optimización clave: solo dibuja si la celda cambió o si es un redibujado completo.
        if (isResizing || !prevGrid || grid[row][col] !== prevGrid[row][col]) {
          context.fillStyle = grid[row][col] ? "#cbd5e1" : "black";
          context.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
          context.strokeStyle = "#334155"; // slate-700
          context.strokeRect(
            col * cellSize,
            row * cellSize,
            cellSize,
            cellSize
          );
        }
      }
    }
    // Guarda la grilla actual para la comparación en la próxima renderización.
    prevGridRef.current = grid;
  }, [grid, cellSize]);

  /**
   * Maneja el evento de clic en el canvas para cambiar el estado de una celda.
   */
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      toggleCell(row, col);
    }
  };

  return <canvas ref={canvasRef} onClick={handleCanvasClick} />;
};

export default Grid;
