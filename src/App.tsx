import { useEffect } from "react";
import Grid from "./components/Grid";
import useGridCalculation from "./hooks/useGridCalculation";
import { useGameStore } from "./store/gameStore";

/**
 * Componente principal de la aplicación del Juego de la Vida.
 * Orquesta la inicialización de la grilla, el bucle del juego y la renderización de los componentes.
 */
function App() {
  const cellSize = 6;
  const { rows, cols } = useGridCalculation(cellSize);
  const { initializeGrid, isRunning, nextGeneration, generation } =
    useGameStore();

  // Efecto para inicializar la grilla cuando las dimensiones se calculan por primera vez.
  useEffect(() => {
    if (rows > 0 && cols > 0) {
      initializeGrid(rows, cols);
    }
  }, [rows, cols, initializeGrid]);

  // Efecto para manejar el bucle principal del juego.
  useEffect(() => {
    if (!isRunning) {
      return; // Si el juego está pausado, no hace nada.
    }

    // Configura un intervalo para avanzar a la siguiente generación cada 30ms.
    const interval = setInterval(() => {
      nextGeneration();
    }, 30);

    // Limpieza: elimina el intervalo cuando el componente se desmonta o isRunning cambia.
    return () => clearInterval(interval);
  }, [isRunning, nextGeneration]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
      <div className="absolute top-4 text-slate-600 font-bold py-2 px-4 bg-white">
        Generación: {generation}
      </div>
      <Grid cellSize={cellSize} />
    </div>
  );
}

export default App;
