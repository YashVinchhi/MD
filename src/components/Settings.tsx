"use client";

// Add imports for LLM configuration
import { useState } from 'react';

// Add a new section for LLM configuration in the settings interface
const Settings = () => {
  const [selectedLLM, setSelectedLLM] = useState('Ollama'); // Default to Ollama
  const [apiKey, setApiKey] = useState('');

  // Fix implicit 'any' type errors by adding proper type annotations
  const handleLLMChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedLLM(event.target.value);
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };

  return (
    <div>
      <h2>Settings</h2>
      <div>
        <label htmlFor="llm">Select LLM:</label>
        <select id="llm" value={selectedLLM} onChange={handleLLMChange}>
          <option value="Ollama">Ollama</option>
          <option value="Qwen-2">Qwen-2: 0.5B</option>
        </select>
      </div>
      <div>
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={handleApiKeyChange}
          placeholder="Enter API Key"
        />
      </div>
    </div>
  );
};

export default Settings;