// submit.js - Pipeline analysis button
// Sends pipeline data to backend for DAG analysis

import { useState } from 'react';
import { useStore } from './store';

export const SubmitButton = () => {
  const { nodes, edges } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [result, setResult] = useState(null);

  const handleSubmit = async () => {
    try {
      console.log('Sending data:', { nodes, edges }); // Debug log

      const response = await fetch('http://127.0.0.1:8000/pipelines/parse', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nodes, edges }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:', data); // Debug log

      setResult(data);
      setShowModal(true);
    } catch (error) {
      console.error('Error:', error);
      setResult({ error: error.message });
      setShowModal(true);
    }
  };

  return (
    <>
      <div className="submit-button-container">
        <button className="submit-button" onClick={handleSubmit}>Submit Pipeline</button>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{result?.error ? '❌ Error' : '✅ Pipeline Analysis'}</h2>
              <button className="modal-close" onClick={() => setShowModal(false)}>×</button>
            </div>
            <div className="modal-body">
              {result?.error ? (
                <div className="error-message">
                  <p><strong>Error:</strong> {result.error}</p>
                  <p>Check console for details.</p>
                </div>
              ) : (
                <div className="analysis-results">
                  <div className="result-item">
                    <span className="result-label">Number of Nodes:</span>
                    <span className="result-value">{result?.num_nodes}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Number of Edges:</span>
                    <span className="result-value">{result?.num_edges}</span>
                  </div>
                  <div className="result-item">
                    <span className="result-label">Is DAG:</span>
                    <span className={`result-value ${result?.is_dag ? 'success' : 'warning'}`}>
                      {result?.is_dag ? '✓ Yes' : '✗ No'}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};