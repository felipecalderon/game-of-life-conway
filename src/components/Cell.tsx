import React from "react";
import { useGameStore } from "../store/gameStore";

interface CellProps {
  row: number;
  col: number;
  isAlive: boolean;
}

const Cell = ({ row, col, isAlive }: CellProps) => {
  const toggleCell = useGameStore((state) => state.toggleCell);

  const handleCellClick = () => {
    toggleCell(row, col);
  };

  return (
    <div
      style={{ backgroundColor: isAlive ? "black" : "#cbd5e1" }}
      onClick={handleCellClick}
    />
  );
};

export default React.memo(Cell);
