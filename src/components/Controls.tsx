import { useGameStore } from "../store/gameStore";

const Controls = () => {
  const {
    isRunning,
    toggleIsRunning,
    speed,
    setSpeed,
    initialChaos,
    setInitialChaos,
    evolutionChaos,
    setEvolutionChaos,
    randomizeGrid,
    generation,
  } = useGameStore();

  return (
    <div className="absolute bottom-4 left-1/2 w-fit -translate-x-1/2 rounded-lg bg-white/10 p-4 text-white backdrop-blur-md md:w-auto">
      <div className="flex flex-col items-center gap-4 text-sm md:flex-row">
        <button
          onClick={toggleIsRunning}
          className="px-4 py-2 bg-sky-700 rounded-md"
        >
          {isRunning ? "Detener" : "Iniciar"}
        </button>
        <button
          onClick={randomizeGrid}
          className="px-4 py-2 bg-lime-600 rounded-md"
        >
          Aplicar filtros
        </button>
        <div className="flex flex-col">
          <label htmlFor="speed">Velocidad: {speed}ms</label>
          <input
            type="range"
            id="speed"
            min="1"
            max="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="initialChaos">
            Aleatoriedad inicial: {initialChaos.toFixed(2)}
          </label>
          <input
            type="range"
            id="initialChaos"
            min="0.01"
            max="1"
            step="0.01"
            value={initialChaos}
            onChange={(e) => setInitialChaos(Number(e.target.value))}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="evolutionChaos">
            Factor de caos: {evolutionChaos.toFixed(6)}
          </label>
          <input
            type="range"
            id="evolutionChaos"
            min="0"
            max="0.0001"
            step="0.00001"
            value={evolutionChaos}
            onChange={(e) => setEvolutionChaos(Number(e.target.value))}
          />
        </div>
      </div>
      <p className="text-center pt-3">
        Generación: <strong>{generation}</strong>
      </p>
    </div>
  );
};

export default Controls;
