// BaseNode.js
import { Handle, Position } from 'reactflow';

export const BaseNode = ({ id, data, title, children, handles = [], style = {} }) => {
  return (
    <div className="custom-node" style={style}>
      {/* Handles */}
      {handles.map((handle, index) => (
        <Handle
          key={index}
          type={handle.type}
          position={handle.position}
          id={`${id}-${handle.id}`}
          style={{ ...handle.style }}
          className="custom-handle"
        />
      ))}

      {/* Header/Title */}
      <div className="node-header">
        <span>{title}</span>
      </div>

      {/* Content */}
      <div className="node-content">
        {children}
      </div>
    </div>
  );
};
