import { useState } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateResponse = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/generate", { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to generate response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      generateResponse();
    }
  };

  return (
    <div className="container">
      <h1>Real Time Chat App</h1>
      <textarea
        className="prompt-input"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        onKeyDown={handleKeyDown}
        rows="4"
        placeholder="Enter your message here... (Press Enter to send)"
        disabled={isLoading}
      />
      <button 
        onClick={generateResponse} 
        disabled={isLoading || !prompt.trim()}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
      <div className="response-box">
        <h3>Response:</h3>
        <div className={`res ${isLoading ? 'loading' : ''}`}>
          {response ? (
            response
              .split('*')
              .filter(part => part.trim() !== '')
              .map((part, index) => (
                <p key={index}>• {part.trim()}</p>
              ))
          ) : (
            <p>Your response will appear here...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;