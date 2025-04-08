
import React from 'react';
import { ArrowRight, Circle } from 'lucide-react';

export const NodeType = {
  DEFAULT: 'default',
  WALL: 'wall',
  START: 'start',
  END: 'end',
};

const Node = ({ 
  node, 
  onMouseDown, 
  onMouseEnter, 
  onMouseUp 
}) => {
  const { row, col, type, isVisited, isPath } = node;
  
  const getClassName = () => {
    let className = 'node';
    
    if (type === NodeType.WALL) {
      className += ' node-wall';
    } else if (type === NodeType.START) {
      className += ' node-start';
    } else if (type === NodeType.END) {
      className += ' node-end';
    } else if (isPath) {
      className += ' node-shortest-path';
    } else if (isVisited) {
      className += ' node-visited';
    } else {
      className += ' node-default';
    }
    
    return className;
  };

  const renderIcon = () => {
    if (type === NodeType.START) {
      return <Circle size={16} />;
    } else if (type === NodeType.END) {
      return <ArrowRight size={16} />;
    }
    return null;
  };

  return (
    <div
      id={`node-${row}-${col}`}
      className={getClassName()}
      onMouseDown={() => onMouseDown(row, col)}
      onMouseEnter={() => onMouseEnter(row, col)}
      onMouseUp={onMouseUp}
    >
      {renderIcon()}
    </div>
  );
};

export default Node;
