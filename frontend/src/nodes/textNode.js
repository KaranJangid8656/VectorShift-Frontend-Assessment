import { useState, useEffect, useRef } from 'react';
import { Position } from 'reactflow';
import { BaseNode } from './BaseNode';

export const TextNode = ({ id, data }) => {
  const [currText, setCurrText] = useState(data?.text || '{{input}}');
  const [handles, setHandles] = useState([]);
  const [dimensions, setDimensions] = useState({ width: 240, height: 'auto' });
  const textareaRef = useRef(null);

  // Auto-resize logic for both width and height
  useEffect(() => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;

      // Calculate width based on text content
      // Create a temporary span to measure text width
      const tempSpan = document.createElement('span');
      tempSpan.style.visibility = 'hidden';
      tempSpan.style.position = 'absolute';
      tempSpan.style.whiteSpace = 'pre';
      tempSpan.style.font = window.getComputedStyle(textareaRef.current).font;
      tempSpan.textContent = currText || 'placeholder';
      document.body.appendChild(tempSpan);

      const textWidth = tempSpan.offsetWidth;
      document.body.removeChild(tempSpan);

      // Set minimum and maximum widths
      const minWidth = 240;
      const maxWidth = 600;
      const padding = 60; // Account for label, padding, etc.
      const calculatedWidth = Math.min(Math.max(textWidth + padding, minWidth), maxWidth);

      setDimensions({
        width: calculatedWidth,
        height: 'auto'
      });
    }
  }, [currText]);

  // UseEffect to parse variables and update handles
  useEffect(() => {
    // Regex to match {{ variableName }}
    const regex = /\{\{\s*([a-zA-Z_$][a-zA-Z0-9_$]*)\s*\}\}/g;
    const matches = [...currText.matchAll(regex)];
    const variableNames = [...new Set(matches.map(match => match[1]))]; // Unique names

    const newHandles = variableNames.map((name, index) => ({
      type: 'target',
      position: Position.Left,
      id: name,
      style: { top: `${(index + 1) * 20}px` } // Simple distribution, might need better logic
    }));

    // Append the output handle
    newHandles.push({ type: 'source', position: Position.Right, id: 'output' });

    setHandles(newHandles);
  }, [currText]);

  const handleTextChange = (e) => {
    setCurrText(e.target.value);
  };

  return (
    <BaseNode
      id={id}
      data={data}
      title="Text"
      handles={handles}
      style={{ width: `${dimensions.width}px` }}
    >
      <div>
        <label style={{ display: 'block' }}>
          Text:
          <textarea
            ref={textareaRef}
            value={currText}
            onChange={handleTextChange}
            style={{
              width: '100%',
              minHeight: '40px',
              resize: 'none',
              overflow: 'hidden',
              boxSizing: 'border-box'
            }}
          />
        </label>
      </div>
    </BaseNode>
  );
}
