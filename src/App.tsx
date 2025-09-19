import { useEffect } from "react";
import Grid from "./components/Grid";
import Controls from "./components/Controls";
import useGridCalculation from "./hooks/useGridCalculation";
import { useGameStore } from "./store/gameStore";

/**
 * Componente principal de la aplicación del Juego de la Vida.
 * Orquesta la inicialización de la grilla, el bucle del juego y la renderización de los componentes.
 */
function App() {
  const cellSize = 6;
  const { rows, cols } = useGridCalculation(cellSize);
  const { initializeGrid, isRunning, nextGeneration, toggleIsRunning, speed } =
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

    // Configura un intervalo para avanzar a la siguiente generación.
    const interval = setInterval(() => {
      nextGeneration();
    }, speed);

    // Limpieza: elimina el intervalo cuando el componente se desmonta o isRunning cambia.
    return () => clearInterval(interval);
  }, [isRunning, nextGeneration, speed]);

  // Efecto para controlar la pausa/reanudación con la barra espaciadora.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault(); // Evita el comportamiento por defecto del navegador
        toggleIsRunning();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleIsRunning]);

  return (
    <div className="relative w-screen h-screen overflow-hidden flex flex-col items-center justify-center bg-black">
      {!isRunning && (
        <div className="absolute z-10 text-white text-5xl font-black tracking-widest">
          PAUSA
        </div>
      )}
      <Grid cellSize={cellSize} />
      <Controls />
    </div>
  );
}

export default App;
