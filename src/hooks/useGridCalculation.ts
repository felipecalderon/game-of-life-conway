import { useState, useEffect } from "react";

const useGridCalculation = (cellSize = 12) => {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const calculateDimensions = () => {
      const cols = Math.floor(window.innerWidth / cellSize);
      const rows = Math.floor(window.innerHeight / cellSize);
      setDimensions({ rows, cols });
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, [cellSize]);

  return dimensions;
};

export default useGridCalculation;
