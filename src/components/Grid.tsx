import { useGameStore } from "../store/gameStore";

const Grid = () => {
  const grid = useGameStore((state) => state.grid);
  const toggleCell = useGameStore((state) => state.toggleCell);

  const gridContent = grid
    .map((row) => row.map((cell) => (cell ? "■" : " ")).join(""))
    .join("\n");

  const handleCellClick = (event: React.MouseEvent<HTMLPreElement>) => {
    if (!grid || grid.length === 0) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const charWidth = event.currentTarget.scrollWidth / grid[0].length;
    const charHeight = event.currentTarget.scrollHeight / grid.length;

    const col = Math.floor(x / charWidth);
    const row = Math.floor(y / charHeight);

    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      toggleCell(row, col);
    }
  };

  return (
    <pre
      className="absolute font-mono text-base leading-none cursor-pointer"
      onClick={handleCellClick}
    >
      {gridContent}
    </pre>
  );
};

export default Grid;
