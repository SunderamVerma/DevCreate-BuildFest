import React, { useState } from 'react';

function ApiInput({ onStartWorkflow, initialApiKey, initialProjectPrompt }) {
  const [key, setKey] = useState(initialApiKey || '');
  const [prompt, setPrompt] = useState(initialProjectPrompt || '');
  const [warning, setWarning] = useState('');

  const handleSubmit = () => {
    if (!key) {
      setWarning('Please enter your Google AI API key.');
      return;
    }
    if (!prompt) {
      setWarning('Please enter a project description.');
      return;
    }
    setWarning('');
    onStartWorkflow(key, prompt);
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-md">
      <h1 className="text-4xl font-bold text-gray-800">Welcome to the AI-Powered SDLC Assistant</h1>
      <p className="mt-2 text-gray-600">Automate your software development lifecycle from idea to deployment with Google Gemini.</p>
      
      <div className="mt-8 p-6 border rounded-lg">
        <h2 className="text-2xl font-semibold text-gray-700">1. Enter the key</h2>
        <input 
          type="password" 
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-2" 
          placeholder="Enter your API key here"
        />
        
        <h2 className="text-2xl font-semibold text-gray-700 mt-6">2. Describe Your Project</h2>
        <textarea 
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md mt-2 h-32" 
          placeholder="e.g., 'An e-commerce platform for selling custom-designed t-shirts with a real-time 3D preview feature.'"
        ></textarea>
        
        <button onClick={handleSubmit} className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors text-lg">
          🚀 Start SDLC Workflow
        </button>
        {warning && <p className="text-red-500 text-sm mt-2 text-center">{warning}</p>}
      </div>
    </div>
  );
}

export default ApiInput;