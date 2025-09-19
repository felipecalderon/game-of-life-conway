import { useEffect } from "react";
import Grid from "./components/Grid";
import useGridCalculation from "./hooks/useGridCalculation";
import { useGameStore } from "./store/gameStore";

function App() {
  const cellSize = 6;
  const { rows, cols } = useGridCalculation(cellSize);
  const { initializeGrid, isRunning, nextGeneration, generation } =
    useGameStore();

  useEffect(() => {
    if (rows > 0 && cols > 0) {
      initializeGrid(rows, cols);
    }
  }, [rows, cols, initializeGrid]);

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const interval = setInterval(() => {
      nextGeneration();
    }, 30);

    return () => clearInterval(interval);
  }, [isRunning, nextGeneration]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute top-4 text-white font-bold py-2 px-4">
        Generación: {generation}
      </div>
      <Grid cellSize={cellSize} />
    </div>
  );
}

export default App;
