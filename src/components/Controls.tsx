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
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-md p-4 rounded-lg text-white">
      <div className="flex items-center gap-4 text-sm">
        <button
          onClick={toggleIsRunning}
          className="px-4 py-2 bg-blue-500 rounded-md"
        >
          {isRunning ? "Detener" : "Iniciar"}
        </button>
        <button
          onClick={randomizeGrid}
          className="px-4 py-2 bg-green-500 rounded-md"
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
            max="0.00001"
            step="0.000001"
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
