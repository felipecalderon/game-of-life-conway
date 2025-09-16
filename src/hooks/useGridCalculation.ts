import { useState, useEffect } from "react";

const useGridCalculation = () => {
  const [dimensions, setDimensions] = useState({ rows: 0, cols: 0 });

  useEffect(() => {
    const calculateDimensions = () => {
      // Create a temporary element to measure character size
      const tempElement = document.createElement("span");
      tempElement.style.fontFamily = "monospace";
      tempElement.style.fontSize = "12px"; // Ensure this matches your grid's font size
      tempElement.style.position = "absolute";
      tempElement.style.left = "-9999px";
      tempElement.style.top = "-9999px";
      tempElement.style.whiteSpace = "pre";
      tempElement.style.lineHeight = "1"; // Or your specific line-height
      tempElement.innerHTML = "X";
      document.body.appendChild(tempElement);

      const charWidth = tempElement.clientWidth;
      const charHeight = tempElement.clientHeight;

      document.body.removeChild(tempElement);

      if (charWidth > 0 && charHeight > 0) {
        const cols = Math.floor(window.innerWidth / charWidth);
        const rows = Math.floor(window.innerHeight / charHeight);
        setDimensions({ rows, cols });
      }
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);

    return () => {
      window.removeEventListener("resize", calculateDimensions);
    };
  }, []);

  return dimensions;
};

export default useGridCalculation;
