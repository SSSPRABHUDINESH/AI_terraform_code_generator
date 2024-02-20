import React, { useState } from 'react';
import axios from 'axios';

const ChatGPTComponent = () => {
  const [input, setInput] = useState('');
  const [instruction, setInstruction] = useState('');
  const [response, setResponse] = useState('');

  const handleGenerateResponse = async () => {
    try {
      const result = await axios.post('http://localhost:3001/generate-response', {
        input: input || null,
        instruction: instruction || null,
      });

      setResponse(result.data);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  return (
    <div>
      <div>
        <label>Input:</label>
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />
      </div>
      <div>
        <label>Instruction:</label>
        <input type="text" value={instruction} onChange={(e) => setInstruction(e.target.value)} />
      </div>
      <div>
        <button onClick={handleGenerateResponse}>Generate Response</button>
      </div>
      {response && (
        <div>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      )}
    </div>
  );
};

export default ChatGPTComponent;
