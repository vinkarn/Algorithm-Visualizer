import React, { useState, useEffect } from 'react';
import Grid from '../components/Grid';
import Controls from '../components/Controls';
import { dijkstra } from '../utils/dijkstra';
import { NodeType } from '../components/Node';
import { toast } from "sonner";

const DEFAULT_ROWS = 20;
const DEFAULT_COLS = 35;

const Index = () => {
  const [numRows, setNumRows] = useState(DEFAULT_ROWS);
  const [numCols, setNumCols] = useState(DEFAULT_COLS);
  const [startNodePos, setStartNodePos] = useState({ row: 10, col: 5 });
  const [endNodePos, setEndNodePos] = useState({ row: 10, col: 30 });
  const [isRunningAlgorithm, setIsRunningAlgorithm] = useState(false);
  const [resetGrid, setResetGrid] = useState(false);
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState(null);
  const [endNode, setEndNode] = useState(null);
  const [visitedNodesInOrder, setVisitedNodesInOrder] = useState([]);
  const [nodesInShortestPathOrder, setNodesInShortestPathOrder] = useState([]);
  const [visualizationSpeed, setVisualizationSpeed] = useState(5);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setNumCols(20);
      } else if (window.innerWidth < 1024) {
        setNumCols(30);
      } else {
        setNumCols(DEFAULT_COLS);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleGridReady = (newGrid, newStartNode, newEndNode) => {
    setGrid(newGrid);
    setStartNode(newStartNode);
    setEndNode(newEndNode);
  };

  const handleGridReset = () => {
    setResetGrid(false);
    setVisitedNodesInOrder([]);
    setNodesInShortestPathOrder([]);
  };

  const handleVisualize = () => {
    if (isRunningAlgorithm) return;
    if (!startNode || !endNode) {
      toast.error("Start or end node not found");
      return;
    }

    setIsRunningAlgorithm(true);
    setVisitedNodesInOrder([]);
    setNodesInShortestPathOrder([]);

    // Reset all nodes for a fresh run
    const freshGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        distance: Infinity,
        isPath: false,
        previousNode: null,
      }))
    );

    const freshStartNode = freshGrid[startNode.row][startNode.col];
    const freshEndNode = freshGrid[endNode.row][endNode.col];
    
    const { visitedNodesInOrder, nodesInShortestPathOrder } = dijkstra(
      freshGrid,
      freshStartNode,
      freshEndNode
    );

    setVisitedNodesInOrder(visitedNodesInOrder);
    
    setTimeout(() => {
      setNodesInShortestPathOrder(nodesInShortestPathOrder);
      
      // Wait for animations to complete before allowing new visualizations
      const totalAnimationTime = 
        visitedNodesInOrder.length * 5 + 
        nodesInShortestPathOrder.length * 20 + 
        100;
        
      setTimeout(() => {
        setIsRunningAlgorithm(false);
        
        if (nodesInShortestPathOrder.length <= 1) {
          toast.error("No path found!");
        } else {
          toast.success(`Path found! Length: ${nodesInShortestPathOrder.length - 1} steps`);
        }
      }, totalAnimationTime);
    }, visitedNodesInOrder.length * 5 + 50);
  };

  const handleReset = () => {
    setResetGrid(true);
  };

  const handleClearPath = () => {
    if (isRunningAlgorithm) return;
    
    setVisitedNodesInOrder([]);
    setNodesInShortestPathOrder([]);
    
    const clearedGrid = grid.map(row =>
      row.map(node => ({
        ...node,
        isVisited: false,
        distance: Infinity,
        isPath: false,
        previousNode: null,
      }))
    );
    
    setGrid(clearedGrid);
  };

  const handleSpeedChange = (value) => {
    setVisualizationSpeed(value);
    // The speed is handled in the Grid component animations
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-background/80 p-4">
      <div className="w-full max-w-6xl">
        <h1 className="text-3xl font-bold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-400">
          Dijkstra Algorithm Visualizer
        </h1>
        <p className="text-center mb-6 text-muted-foreground">
          A visual demonstration of Dijkstra's shortest path algorithm
        </p>
        
        <Controls
          onVisualize={handleVisualize}
          onReset={handleReset}
          onClearPath={handleClearPath}
          onSpeedChange={handleSpeedChange}
          isRunningAlgorithm={isRunningAlgorithm}
          visualizationSpeed={visualizationSpeed}
        />
        
        <div className="mt-4 overflow-auto p-1 rounded-lg border border-border bg-secondary/40">
          <Grid
            numRows={numRows}
            numCols={numCols}
            startNodePos={startNodePos}
            endNodePos={endNodePos}
            isRunningAlgorithm={isRunningAlgorithm}
            resetGrid={resetGrid}
            onGridReset={handleGridReset}
            onGridReady={handleGridReady}
            visitedNodesInOrder={visitedNodesInOrder}
            nodesInShortestPathOrder={nodesInShortestPathOrder}
          />
        </div>
        
        <div className="mt-4 text-sm text-center text-muted-foreground">
          <p>
            Dijkstra's algorithm guarantees the shortest path between two points in a weighted graph.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
