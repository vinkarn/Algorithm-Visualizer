import React from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

const Controls = ({
  onVisualize,
  onReset,
  onClearPath,
  onSpeedChange,
  isRunningAlgorithm,
  visualizationSpeed,
}) => {
  return (
    <div className="p-4 bg-secondary rounded-lg shadow-md mb-4 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <Button
            onClick={onVisualize}
            disabled={isRunningAlgorithm}
            className="bg-primary hover:bg-primary/90"
          >
            Visualize Dijkstra
          </Button>
          <Button
            onClick={onClearPath}
            disabled={isRunningAlgorithm}
            variant="outline"
          >
            Clear Path
          </Button>
          <Button
            onClick={onReset}
            disabled={isRunningAlgorithm}
            variant="outline"
          >
            Reset Grid
          </Button>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-48">
          <span className="text-sm whitespace-nowrap">Speed:</span>
          <Slider
            defaultValue={[visualizationSpeed]}
            max={10}
            min={1}
            step={1}
            onValueChange={(value) => onSpeedChange(value[0])}
            disabled={isRunningAlgorithm}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2 justify-center">
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-transparent border border-gray-700"></div>
          <span className="text-xs">Unvisited</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-node-wall"></div>
          <span className="text-xs">Wall</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-node-start"></div>
          <span className="text-xs">Start</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-node-end"></div>
          <span className="text-xs">End</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-node-visited"></div>
          <span className="text-xs">Visited</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-4 h-4 bg-node-path"></div>
          <span className="text-xs">Shortest Path</span>
        </div>
      </div>

      <div className="mt-4 text-sm">
        <Badge variant="outline">Instructions</Badge>
        <p className="mt-1 text-xs text-muted-foreground">
          Click and drag to draw walls. Drag the start and end nodes to
          reposition them. Click "Visualize Dijkstra" to see the algorithm in
          action.
        </p>
      </div>
    </div>
  );
};

export default Controls;
