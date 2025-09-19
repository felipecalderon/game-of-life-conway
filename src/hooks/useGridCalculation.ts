import { useState, useEffect } from "react";

/**
 * Hook personalizado para calcular las dimensiones (filas y columnas) de la grilla
 * basándose en el tamaño de la ventana y el tamaño de la celda.
 *
 * @param cellSize El tamaño en píxeles de cada celda. Por defecto es 12.
 * @returns Un objeto con el número de `rows` y `cols` que caben en la pantalla.
 */
const useGridCalculation = (cellSize = 12) => {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    /**
     * Calcula y actualiza las dimensiones de la grilla en el estado.
     */
    const calculateDimensions = () => {
      const cols = Math.floor(window.innerWidth / cellSize);
      const rows = Math.floor(window.innerHeight / cellSize);
      setDimensions({ rows, cols });
    };

    calculateDimensions(); // Calcular al montar el componente
    window.addEventListener("resize", calculateDimensions); // Recalcular si la ventana cambia de tamaño

    // Limpieza: remover el event listener cuando el componente se desmonte.
    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [cellSize]);

  return dimensions;
};

export default useGridCalculation;
