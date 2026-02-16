import { useState, useCallback } from 'react';
import './App.css';

function App() {
  const [sharedPrompt, setSharedPrompt] = useState('');
  const [responses, setResponses] = useState({
    ollama: ''
  });
  const [loading, setLoading] = useState({
    ollama: false
  });
  const [responseOrder, setResponseOrder] = useState([]);

  const models = [
    { id: 'ollama', name: 'Ollama (deepseek-r1:1.5b)', color: '#E67E22' }
  ];

  const handlePromptChange = useCallback((value) => {
    setSharedPrompt(value);
  }, []);

  const fetchModelResponse = useCallback(async (model, prompt) => {
    try {
      const encodedPrompt = encodeURIComponent(prompt);
      const response = await fetch(`http://localhost:8080/api/${model}/${encodedPrompt}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.text();
      return data;
    } catch (error) {
      return `Error: ${error.message}`;
    }
  }, []);

  const handleSubmit = useCallback(async () => {
    if (!sharedPrompt.trim()) return;

    setResponseOrder([]);

    setLoading({ ollama: true });
    setResponses({ ollama: 'Loading...' });

    fetchModelResponse('ollama', sharedPrompt)
      .then(response => {
        setResponses({ ollama: response });
        setResponseOrder(['ollama']);
        setLoading({ ollama: false });
      })
      .catch(error => {
        setResponses({ ollama: `Error: ${error.message}` });
        setLoading({ ollama: false });
      });
  }, [sharedPrompt, fetchModelResponse]);

  const isLoading = loading.ollama;

  return (
    <div className="app-container">
      <h1>Exploring Ollama LLM Model</h1>

      <div className="shared-prompt-container">
        <div className="shared-prompt-area">
          <textarea
            placeholder="Enter a prompt to send to the model..."
            value={sharedPrompt}
            onChange={(e) => handlePromptChange(e.target.value)}
            disabled={isLoading}
          />

          <button
            onClick={handleSubmit}
            disabled={isLoading || !sharedPrompt.trim()}
            className="submit-all-btn"
          >
            {isLoading ? 'Sending...' : 'Send to Ollama'}
          </button>
        </div>
      </div>

      

      <div className="model-grid">
        {models.map(model => (
          <div
            key={model.id}
            className="model-box"
            style={{
              borderColor: model.color,
              boxShadow: responseOrder[0] === model.id ? `0 0 15px ${model.color}` : 'none'
            }}
          >
            <h2 style={{ color: model.color }}>
              {model.name}
              {responseOrder.includes(model.id) && (
                <span className="response-badge"></span>
              )}
            </h2>

            <div className="response-area">
              <h3>Response:</h3>
              <div className="response-content">
                {responses.ollama ? (
                  <div className="response-text">{responses.ollama}</div>
                ) : (
                  <div className="placeholder-text">Response will appear here</div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
