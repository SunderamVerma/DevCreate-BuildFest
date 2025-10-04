import React from 'react';

function ChatbotToggle({ onClick, isOpen, hasNewMessage = false }) {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <button
        onClick={onClick}
        className={`
          relative w-14 h-14 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-300
          ${isOpen 
            ? 'bg-gray-500 hover:bg-gray-600' 
            : 'bg-blue-500 hover:bg-blue-600'
          }
        `}
        title={isOpen ? "Close SDLC Assistant" : "Open SDLC Assistant"}
      >
        {/* Icon */}
        <div className="flex items-center justify-center h-full">
          {isOpen ? (
            <i className="fas fa-times text-white text-xl"></i>
          ) : (
            <i className="fas fa-robot text-white text-xl"></i>
          )}
        </div>

        {/* New message indicator */}
        {hasNewMessage && !isOpen && (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white">
            <div className="w-full h-full bg-red-500 rounded-full animate-pulse"></div>
          </div>
        )}

        {/* Pulse animation when closed */}
        {!isOpen && (
          <div className="absolute inset-0 rounded-full bg-blue-500 animate-ping opacity-75"></div>
        )}
      </button>

      {/* Tooltip */}
      <div className={`
        absolute bottom-16 right-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg shadow-lg whitespace-nowrap transition-all duration-300
        ${isOpen ? 'opacity-0 invisible' : 'opacity-0 hover:opacity-100 group-hover:opacity-100'}
      `}>
        SDLC Assistant
        <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
      </div>
    </div>
  );
}

export default ChatbotToggle;