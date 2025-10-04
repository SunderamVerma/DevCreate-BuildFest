import React, { useState } from 'react';
import { Info, X } from 'lucide-react';

const FlowInfoPanel = ({ onClose }) => {
  const flowExplanations = [
    {
      title: "User Request Flow",
      description: "Primary path for user interactions through the system",
      steps: [
        "User initiates request via web browser",
        "CDN serves static content and routes dynamic requests",
        "Load balancer distributes traffic across instances",
        "Frontend application handles user interface",
        "API Gateway routes requests to appropriate services"
      ]
    },
    {
      title: "Authentication & Security",
      description: "How user authentication and authorization works",
      steps: [
        "API Gateway validates incoming requests",
        "Auth Service verifies JWT tokens or OAuth credentials",
        "Security middleware enforces access controls",
        "Session management maintains user state"
      ]
    },
    {
      title: "Data Processing Flow",
      description: "How data moves through the backend systems",
      steps: [
        "API Server processes business logic",
        "Cache layer checks for existing data",
        "Database queries for persistent data",
        "Message Queue handles asynchronous operations",
        "Analytics service tracks user behavior"
      ]
    },
    {
      title: "Microservices Communication",
      description: "Service-to-service communication patterns",
      steps: [
        "API Gateway routes to specific services",
        "Services communicate via REST APIs or message bus",
        "Event-driven architecture for loose coupling",
        "Cross-service transactions managed carefully",
        "Circuit breakers prevent cascade failures"
      ]
    }
  ];

  return (
    <div className="absolute top-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-md z-10">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-blue-500" />
          <h3 className="font-semibold text-gray-800">Control Flow Guide</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600"
        >
          <X size={16} />
        </button>
      </div>
      
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {flowExplanations.map((explanation, index) => (
          <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
            <h4 className="font-medium text-gray-800 mb-2">{explanation.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{explanation.description}</p>
            <ol className="text-xs text-gray-500 space-y-1">
              {explanation.steps.map((step, stepIndex) => (
                <li key={stepIndex} className="flex items-start gap-2">
                  <span className="font-medium min-w-[16px]">{stepIndex + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500">
          💡 <strong>Tip:</strong> Use the category filters to focus on specific layers. 
          Animated connections show high-priority data flows.
        </p>
      </div>
    </div>
  );
};

export default FlowInfoPanel;