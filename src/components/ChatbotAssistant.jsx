import React, { useState, useRef, useEffect } from 'react';

function ChatbotAssistant({ isOpen, onClose, apiKey, onSendMessage, isLoading, projectPrompt, currentStep, generatedContent, workflowSteps }) {
  const getWelcomeMessage = () => {
    if (projectPrompt) {
      return `Hi! I'm your project assistant for "${projectPrompt.substring(0, 50)}${projectPrompt.length > 50 ? '...' : ''}". Ask me anything about your project!`;
    }
    return 'Hi! I\'m your project assistant. Start by describing your project in the Getting Started section, then ask me questions about it!';
  };

  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: getWelcomeMessage(),
      timestamp: new Date().toISOString()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Update welcome message when project changes
  useEffect(() => {
    if (messages.length === 1) {
      setMessages([{
        id: 1,
        type: 'bot',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString()
      }]);
    }
  }, [projectPrompt]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading || !apiKey) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputValue.trim(),
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    try {
      const response = await onSendMessage(userMessage.content);
      
      const botMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: response,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        type: 'bot',
        content: 'I apologize, but I encountered an error while processing your question. Please try again or check your API configuration.',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  const getProjectSpecificQuestions = () => {
    if (!projectPrompt) {
      return [
        'How do I start my project?',
        'What information do I need?'
      ];
    }

    const currentStepInfo = workflowSteps?.find(step => step.id === currentStep);
    const currentStepLabel = currentStepInfo?.label || 'this step';

    return [
      `How can I improve ${currentStepLabel}?`,
      `What's next after ${currentStepLabel}?`,
      `Questions about my project features?`,
      'How to review my generated content?',
      'Tips for my project implementation?'
    ];
  };

  const suggestedQuestions = getProjectSpecificQuestions();

  const handleSuggestedQuestion = (question) => {
    setInputValue(question);
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-20 right-6 z-50">
      <div className="bg-white rounded-lg shadow-2xl w-80 h-96 flex flex-col border border-gray-200">
        {/* Header */}
        <div className="flex items-center justify-between p-3 border-b border-gray-200 bg-blue-50 rounded-t-lg">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <i className="fas fa-robot text-white text-xs"></i>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 text-sm">Project Assistant</h3>
              <p className="text-xs text-gray-500">
                {projectPrompt ? 'Ask about your project' : 'Set up project first'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[85%] p-2 rounded-lg text-xs ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white rounded-br-none'
                    : 'bg-gray-100 text-gray-900 rounded-bl-none'
                }`}
              >
                <div className="whitespace-pre-wrap break-words leading-relaxed">{message.content}</div>
                <div
                  className={`text-xs mt-1 opacity-70 ${
                    message.type === 'user' ? 'text-blue-100' : 'text-gray-500'
                  }`}
                >
                  {new Date(message.timestamp).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </div>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-2 rounded-lg rounded-bl-none max-w-[85%]">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                  <span className="text-xs text-gray-500">Thinking...</span>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Questions */}
        {messages.length === 1 && (
          <div className="px-3 py-2 border-t border-gray-100">
            <p className="text-xs text-gray-600 mb-2">Quick questions:</p>
            <div className="flex flex-col gap-1">
              {suggestedQuestions.slice(0, 2).map((question, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestedQuestion(question)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-2 py-1 rounded text-left transition-colors"
                  disabled={isLoading}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Input Form */}
        <form onSubmit={handleSendMessage} className="p-3 border-t border-gray-200">
          {!apiKey && (
            <div className="mb-2 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-xs text-yellow-800">
                <i className="fas fa-exclamation-triangle mr-1"></i>
                API key required in Getting Started
              </p>
            </div>
          )}
          <div className="flex gap-2">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={apiKey ? (projectPrompt ? "Ask about your project..." : "Describe your project first") : "API key needed"}
              className="flex-1 border border-gray-300 rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
              disabled={isLoading || !apiKey}
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading || !apiKey}
              className="bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white px-3 py-1 rounded text-xs transition-colors flex items-center gap-1"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                <i className="fas fa-paper-plane"></i>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChatbotAssistant;