
import React, { useState, useEffect } from 'react';
import Node, { NodeType } from './Node';

const Grid = ({
  numRows,
  numCols,
  startNodePos,
  endNodePos,
  isRunningAlgorithm,
  resetGrid,
  onGridReset,
  onGridReady,
  visitedNodesInOrder,
  nodesInShortestPathOrder,
}) => {
  const [grid, setGrid] = useState([]);
  const [mouseIsPressed, setMouseIsPressed] = useState(false);
  const [currentOperation, setCurrentOperation] = useState(null);

  useEffect(() => {
    const initialGrid = createInitialGrid();
    setGrid(initialGrid);
    const startNode = initialGrid[startNodePos.row][startNodePos.col];
    const endNode = initialGrid[endNodePos.row][endNodePos.col];
    onGridReady(initialGrid, startNode, endNode);
  }, [numRows, numCols]);

  useEffect(() => {
    if (resetGrid) {
      resetGridState();
      onGridReset();
    }
  }, [resetGrid]);

  useEffect(() => {
    animateVisitedNodes();
  }, [visitedNodesInOrder]);

  useEffect(() => {
    if (nodesInShortestPathOrder.length > 0) {
      animateShortestPath();
    }
  }, [nodesInShortestPathOrder]);

  const createInitialGrid = () => {
    const initialGrid = [];
    for (let row = 0; row < numRows; row++) {
      const currentRow = [];
      for (let col = 0; col < numCols; col++) {
        let type = NodeType.DEFAULT;
        if (row === startNodePos.row && col === startNodePos.col) {
          type = NodeType.START;
        } else if (row === endNodePos.row && col === endNodePos.col) {
          type = NodeType.END;
        }
        
        currentRow.push({
          row,
          col,
          type,
          isVisited: false,
          distance: Infinity,
          isPath: false,
          previousNode: null,
        });
      }
      initialGrid.push(currentRow);
    }
    return initialGrid;
  };

  const resetGridState = () => {
    const newGrid = grid.map(row => 
      row.map(node => ({
        ...node,
        isVisited: false,
        distance: Infinity,
        isPath: false,
        previousNode: null,
        isAnimating: false,
      }))
    );
    setGrid(newGrid);
  };

  const handleMouseDown = (row, col) => {
    if (isRunningAlgorithm) return;
    
    const node = grid[row][col];
    
    if (node.type === NodeType.START) {
      setCurrentOperation('moveStart');
    } else if (node.type === NodeType.END) {
      setCurrentOperation('moveEnd');
    } else {
      setCurrentOperation('wall');
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
    }
    
    setMouseIsPressed(true);
  };

  const handleMouseEnter = (row, col) => {
    if (!mouseIsPressed || isRunningAlgorithm) return;
    
    if (currentOperation === 'wall') {
      const newGrid = toggleWall(grid, row, col);
      setGrid(newGrid);
    } else if (currentOperation === 'moveStart') {
      const newGrid = moveNode(grid, NodeType.START, row, col);
      setGrid(newGrid);
    } else if (currentOperation === 'moveEnd') {
      const newGrid = moveNode(grid, NodeType.END, row, col);
      setGrid(newGrid);
    }
  };

  const handleMouseUp = () => {
    setMouseIsPressed(false);
    setCurrentOperation(null);
    
    // Update grid info for the algorithm
    const startNode = findNodeByType(grid, NodeType.START);
    const endNode = findNodeByType(grid, NodeType.END);
    if (startNode && endNode) {
      onGridReady(grid, startNode, endNode);
    }
  };

  const findNodeByType = (grid, type) => {
    for (const row of grid) {
      for (const node of row) {
        if (node.type === type) {
          return node;
        }
      }
    }
    return null;
  };

  const toggleWall = (grid, row, col) => {
    const newGrid = [...grid];
    const node = newGrid[row][col];
    
    // Don't toggle start or end nodes
    if (node.type === NodeType.START || node.type === NodeType.END) {
      return newGrid;
    }
    
    const newNode = {
      ...node,
      type: node.type === NodeType.WALL ? NodeType.DEFAULT : NodeType.WALL,
    };
    
    newGrid[row][col] = newNode;
    return newGrid;
  };

  const moveNode = (grid, nodeType, newRow, newCol) => {
    // Don't move to a cell that already has a start or end node
    if (grid[newRow][newCol].type === NodeType.START || grid[newRow][newCol].type === NodeType.END) {
      return grid;
    }
    
    const newGrid = [...grid];
    
    // Find the current node of the given type
    const currentNode = findNodeByType(grid, nodeType);
    if (!currentNode) return grid;
    
    // Reset the current position
    newGrid[currentNode.row][currentNode.col] = {
      ...currentNode,
      type: NodeType.DEFAULT,
    };
    
    // Set the new position
    newGrid[newRow][newCol] = {
      ...newGrid[newRow][newCol],
      type: nodeType,
    };
    
    return newGrid;
  };

  const animateVisitedNodes = () => {
    if (!visitedNodesInOrder || visitedNodesInOrder.length === 0) return;
    
    const newGrid = [...grid];
    
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i];
        if (node.type !== NodeType.START && node.type !== NodeType.END) {
          newGrid[node.row][node.col] = {
            ...newGrid[node.row][node.col],
            isVisited: true,
          };
          setGrid([...newGrid]);
        }
      }, 5 * i); // Reduced from 10ms to 5ms per node
    }
  };

  const animateShortestPath = () => {
    if (!nodesInShortestPathOrder || nodesInShortestPathOrder.length === 0) return;
    
    const newGrid = [...grid];
    
    // Start animation slightly after the last visited node animation
    // Reduced delay to make it start sooner
    const startTime = 5 * visitedNodesInOrder.length + 50; // Reduced from 10ms*length+100 to 5ms*length+50
    
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i];
        if (node.type !== NodeType.START && node.type !== NodeType.END) {
          newGrid[node.row][node.col] = {
            ...newGrid[node.row][node.col],
            isPath: true,
          };
          setGrid([...newGrid]);
        }
      }, startTime + 20 * i); // Reduced from 50ms to 20ms per node in the path
    }
  };

  return (
    <div className="flex flex-col items-center">
      <div className="grid-container">
        {grid.map((row, rowIdx) => (
          <div key={rowIdx} className="flex">
            {row.map((node, nodeIdx) => (
              <Node
                key={nodeIdx}
                node={node}
                onMouseDown={handleMouseDown}
                onMouseEnter={handleMouseEnter}
                onMouseUp={handleMouseUp}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grid;
