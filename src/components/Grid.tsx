import { useRef, useEffect } from "react";
import { useGameStore } from "../store/gameStore";
import type { GameState } from "../types";

interface GridProps {
  cellSize: number;
}

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
    const isResizing =
      !prevGrid ||
      prevGrid.length !== rows ||
      (prevGrid[0] && prevGrid[0].length !== cols);

    if (isResizing) {
      canvas.width = cols * cellSize;
      canvas.height = rows * cellSize;
    }

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
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
    prevGridRef.current = grid;
  }, [grid, cellSize]);

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