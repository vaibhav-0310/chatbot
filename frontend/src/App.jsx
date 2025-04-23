import { useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const generateResponse = async () => {
    try {
      const res = await axios.post("http://localhost:5000/generate", { prompt });
      setResponse(res.data.response);
    } catch (error) {
      console.error("Error:", error);
      setResponse("Failed to generate response.");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Real Time Chat App</h1>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows="1"
        cols="50"
        placeholder="Enter your prompt..."
        style={{padding:"10px"}}
      />
      <br /><br/>
      <button onClick={generateResponse}>Send</button>
      <h3>Response:</h3>
      <p>{response}</p>
    </div>
  );
}

export default App;
