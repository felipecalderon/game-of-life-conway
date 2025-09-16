import { useEffect } from "react";
import Grid from "./components/Grid";
import useGridCalculation from "./hooks/useGridCalculation";
import { useGameStore } from "./store/gameStore";

function App() {
  const { rows, cols } = useGridCalculation();
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
    <div className="relative w-screen h-screen bg-black text-green-500 overflow-hidden flex flex-col items-center">
      <div className="absolute bottom-4 text-white font-bold py-2 px-4">
        Año: {generation} - D.C{" "}
        <span className="italic">(después de Conway)</span>
      </div>
      <Grid />
    </div>
  );
}

export default App;
