import React, { useState, useEffect } from "react";
import "../App.css";

const DROP_LENGTH = 5; // Length of each drop

// Generate shades of color for the drop
const generateColorShades = (baseColor, length) => {
  return Array.from({ length }, (_, i) => `hsl(${baseColor}, 100%, ${70 - i * 10}%)`);
};

const Grid = ({ rows, cols }) => {
  const [grid, setGrid] = useState(createEmptyGrid());
  const [dropPositions, setDropPositions] = useState(initializeDrops());

  // Create an empty grid
  function createEmptyGrid() {
    return Array.from({ length: rows }, () => Array(cols).fill(null));
  }

  // Initialize the drops: each drop will start at the top of a random column
  function initializeDrops() {
    const drops = [];
    const numDrops = Math.floor(cols / 2); // You can adjust the number of drops here

    for (let i = 0; i < numDrops; i++) {
      drops.push({
        startRow: Math.floor(Math.random() * rows), // Random start row
        startCol: Math.floor(Math.random() * cols), // Random column for each drop (fixed per drop)
        color: Math.floor(Math.random() * 360), // Random color for each drop
      });
    }
    return drops;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setDropPositions((oldDrops) => {
        return oldDrops.map((drop) => {
          // If the drop reaches the bottom, reset it to the top
          const isAtBottom = drop.startRow >= rows;
          return {
            startRow: isAtBottom ? 0 : drop.startRow + 1, // Move down, reset to top if at bottom
            startCol: drop.startCol, // Stay in the same column
            color: drop.color, // Keep the same color
          };
        });
      });
    }, 200); // Adjust speed here

    return () => clearInterval(interval); // Cleanup on unmount
  }, [rows, cols]);

  return (
    <div className="grid">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="row">
          {row.map((_, colIndex) => {
            // Check if a drop is in this column and row
            const activeDrop = dropPositions.find(
              (drop) =>
                colIndex === drop.startCol && // Check if drop is in this column
                rowIndex >= drop.startRow && // Check if drop is within the drop's active range
                rowIndex < drop.startRow + DROP_LENGTH // Check if drop is in its length range
            );

            // If an active drop exists, generate the corresponding color shade
            const color = activeDrop
              ? generateColorShades(activeDrop.color, DROP_LENGTH)[rowIndex - activeDrop.startRow]
              : "";

            return (
              <div
                key={colIndex}
                className="cell"
                style={{ backgroundColor: color }}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Grid;
