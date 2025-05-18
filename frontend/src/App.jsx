import { useState, useEffect, useRef } from "react";
import axios from "axios";
import './App.css';

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const contentRef = useRef(null);

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
  
  // Scroll to bottom when response changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [response]);

  return (
    <div className="container">
      <h1>Real Time Chat App</h1>
      
      <div className="content-area" ref={contentRef}>
        <div className="response-box">
          <div className={`res ${isLoading ? 'loading' : ''}`}>
            {response ? (
              response
                .split('*')
                .filter(part => part.trim() !== '')
                .map((part, index) => (
                  <p key={index}>{part.trim()}</p>
                ))
            ) : (
              <p>Send a message to start the conversation...</p>
            )}
          </div>
        </div>
      </div>
      
      <div className="prompt-area">
        <textarea
          className="prompt-input"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={handleKeyDown}
          rows="2"
          placeholder="Type your message here... (Press Enter to send)"
          disabled={isLoading}
        />
        <button 
          onClick={generateResponse} 
          disabled={isLoading || !prompt.trim()}
        >
          {isLoading ? "Sending..." : "Send"}
        </button>
      </div>
    </div>
  );
}

export default App;