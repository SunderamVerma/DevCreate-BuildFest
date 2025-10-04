import React, { useState, useEffect } from 'react';

const InteractiveDemo = ({ currentStep, stepData, sdlcData = {} }) => {
  const [demoPhase, setDemoPhase] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);
  const [completedPhases, setCompletedPhases] = useState([]);
  const [demoData, setDemoData] = useState({});

  // Demo scenarios for each step
  const demoScenarios = {
    1: { // Project Overview
      title: "E-Commerce Platform Development",
      phases: [
        { id: 1, title: "Define Business Goals", duration: 2000 },
        { id: 2, title: "Identify Stakeholders", duration: 1500 },
        { id: 3, title: "Set Success Metrics", duration: 1800 },
        { id: 4, title: "Create Project Charter", duration: 2200 }
      ],
      data: {
        projectName: "NextGen E-Commerce Platform",
        businessGoals: ["Increase online sales by 300%", "Reduce cart abandonment by 50%", "Improve user experience"],
        stakeholders: ["Marketing Team", "IT Department", "Customer Service", "Executive Leadership"],
        metrics: ["Conversion Rate: 3.5%", "Page Load Time: <2s", "User Satisfaction: >95%"]
      }
    },
    2: { // Requirements Analysis
      title: "Gathering User Requirements",
      phases: [
        { id: 1, title: "Conduct User Interviews", duration: 2500 },
        { id: 2, title: "Create User Stories", duration: 2000 },
        { id: 3, title: "Define Acceptance Criteria", duration: 1800 },
        { id: 4, title: "Prioritize Features", duration: 2200 }
      ],
      data: {
        userStories: [
          "As a customer, I want to easily search for products",
          "As a user, I want to save items to my wishlist", 
          "As a shopper, I want secure payment options"
        ],
        requirements: ["Product catalog", "Shopping cart", "User authentication", "Payment processing"],
        priorities: ["Must Have: 15 features", "Should Have: 12 features", "Could Have: 8 features"]
      }
    },
    3: { // System Design
      title: "Architecting the Solution",
      phases: [
        { id: 1, title: "Design System Architecture", duration: 2200 },
        { id: 2, title: "Create Database Schema", duration: 2000 },
        { id: 3, title: "Design UI/UX Mockups", duration: 2500 },
        { id: 4, title: "Plan Integration Points", duration: 1800 }
      ],
      data: {
        architecture: ["Frontend: React.js", "Backend: Node.js + Express", "Database: PostgreSQL", "Cache: Redis"],
        components: ["User Management", "Product Catalog", "Shopping Cart", "Payment Gateway"],
        integrations: ["Payment Processors", "Shipping APIs", "Analytics Tools", "Email Service"]
      }
    },
    4: { // Implementation
      title: "Building the Platform",
      phases: [
        { id: 1, title: "Setup Development Environment", duration: 1500 },
        { id: 2, title: "Implement Core Features", duration: 3000 },
        { id: 3, title: "Integrate Third-party Services", duration: 2000 },
        { id: 4, title: "Code Review & Optimization", duration: 1800 }
      ],
      data: {
        progress: ["Backend APIs: 85%", "Frontend Components: 92%", "Database: 78%", "Integrations: 65%"],
        features: ["User Registration ✓", "Product Search ✓", "Shopping Cart ✓", "Payment Flow (In Progress)"],
        metrics: ["Code Coverage: 95%", "Performance Score: 87", "Security Score: 92"]
      }
    },
    5: { // Testing & QA
      title: "Quality Assurance Process",
      phases: [
        { id: 1, title: "Unit Testing", duration: 2000 },
        { id: 2, title: "Integration Testing", duration: 2200 },
        { id: 3, title: "User Acceptance Testing", duration: 2500 },
        { id: 4, title: "Performance Testing", duration: 2000 }
      ],
      data: {
        testResults: ["Unit Tests: 247 passed", "Integration: 156 passed", "UAT: 47 scenarios passed"],
        bugStatus: ["Critical: 0 open", "High: 2 open", "Medium: 8 open", "Resolved: 247"],
        performance: ["Load Time: 2.1s", "Concurrent Users: 1000+", "Uptime: 99.9%"]
      }
    },
    6: { // Deployment & Maintenance
      title: "Going Live",
      phases: [
        { id: 1, title: "Prepare Production Environment", duration: 2000 },
        { id: 2, title: "Deploy Application", duration: 1800 },
        { id: 3, title: "Monitor System Health", duration: 2200 },
        { id: 4, title: "User Training & Support", duration: 2500 }
      ],
      data: {
        deployment: ["Development ✓", "Staging ✓", "Production ✓"],
        monitoring: ["System Health: Good", "Performance: Optimal", "Security: Secure"],
        support: ["Documentation: Complete", "Training: 100% staff", "Support Team: Ready"]
      }
    }
  };

  const currentScenario = demoScenarios[currentStep] || demoScenarios[1];

  useEffect(() => {
    // Reset demo when step changes
    setDemoPhase(1);
    setCompletedPhases([]);
    setDemoData({});
  }, [currentStep]);

  const startDemo = () => {
    setDemoPhase(1);
    setCompletedPhases([]);
    setIsAnimating(true);
    runDemoSequence();
  };

  const runDemoSequence = async () => {
    for (let i = 1; i <= currentScenario.phases.length; i++) {
      setDemoPhase(i);
      await new Promise(resolve => setTimeout(resolve, currentScenario.phases[i - 1].duration));
      setCompletedPhases(prev => [...prev, i]);
    }
    setIsAnimating(false);
  };

  const resetDemo = () => {
    setDemoPhase(1);
    setCompletedPhases([]);
    setIsAnimating(false);
    setDemoData({});
  };

  const renderDemoContent = () => {
    const data = currentScenario.data;
    
    switch (currentStep) {
      case 1: // Project Overview Demo
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transition-all duration-500 ${
                completedPhases.includes(1) ? 'bg-green-600 bg-opacity-20 border border-green-400' : ''
              }`}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-bullseye text-blue-400"></i>
                  Business Goals
                </h3>
                {completedPhases.includes(1) && (
                  <ul className="space-y-2">
                    {data.businessGoals.map((goal, index) => (
                      <li key={index} className="text-white flex items-start gap-2 animate-fadeIn">
                        <i className="fas fa-check-circle text-green-400 mt-1"></i>
                        {goal}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transition-all duration-500 ${
                completedPhases.includes(2) ? 'bg-purple-600 bg-opacity-20 border border-purple-400' : ''
              }`}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-users text-purple-400"></i>
                  Stakeholders
                </h3>
                {completedPhases.includes(2) && (
                  <ul className="space-y-2">
                    {data.stakeholders.map((stakeholder, index) => (
                      <li key={index} className="text-white flex items-center gap-2 animate-fadeIn">
                        <i className="fas fa-user text-purple-400"></i>
                        {stakeholder}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transition-all duration-500 ${
                completedPhases.includes(3) ? 'bg-yellow-600 bg-opacity-20 border border-yellow-400' : ''
              }`}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-chart-line text-yellow-400"></i>
                  Success Metrics
                </h3>
                {completedPhases.includes(3) && (
                  <ul className="space-y-2">
                    {data.metrics.map((metric, index) => (
                      <li key={index} className="text-white flex items-start gap-2 animate-fadeIn">
                        <i className="fas fa-chart-bar text-yellow-400 mt-1"></i>
                        {metric}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );

      case 2: // Requirements Demo
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transition-all duration-500 ${
                completedPhases.includes(2) ? 'bg-blue-600 bg-opacity-20 border border-blue-400' : ''
              }`}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-book text-blue-400"></i>
                  User Stories
                </h3>
                {completedPhases.includes(2) && (
                  <ul className="space-y-3">
                    {data.userStories.map((story, index) => (
                      <li key={index} className="text-white bg-white bg-opacity-10 p-3 rounded animate-fadeIn">
                        "{story}"
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className={`bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 transition-all duration-500 ${
                completedPhases.includes(4) ? 'bg-green-600 bg-opacity-20 border border-green-400' : ''
              }`}>
                <h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                  <i className="fas fa-sort-amount-down text-green-400"></i>
                  Feature Priorities
                </h3>
                {completedPhases.includes(4) && (
                  <ul className="space-y-2">
                    {data.priorities.map((priority, index) => (
                      <li key={index} className="text-white flex items-center gap-2 animate-fadeIn">
                        <i className="fas fa-flag text-green-400"></i>
                        {priority}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🚀</div>
            <h3 className="text-xl font-semibold text-white mb-2">Interactive Demo</h3>
            <p className="text-white text-opacity-70">
              Watch as we simulate the {stepData.title.toLowerCase()} process
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8">
      {/* Demo Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stepData.color} mb-4`}>
          <i className="fas fa-play text-white text-2xl"></i>
        </div>
        <h1 className="text-3xl font-bold text-white mb-2">Interactive Demo</h1>
        <h2 className="text-xl text-white text-opacity-80 mb-4">{currentScenario.title}</h2>
        
        {/* Demo Controls */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={startDemo}
            disabled={isAnimating}
            className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
              isAnimating
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'bg-green-600 text-white hover:bg-green-700'
            }`}
          >
            <i className="fas fa-play mr-2"></i>
            {isAnimating ? 'Running Demo...' : 'Start Demo'}
          </button>
          
          <button
            onClick={resetDemo}
            disabled={isAnimating}
            className="px-6 py-2 rounded-lg font-semibold bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors"
          >
            <i className="fas fa-redo mr-2"></i>
            Reset
          </button>
        </div>
      </div>

      {/* Demo Progress */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-semibold">Demo Progress</h3>
          <span className="text-white text-opacity-70 text-sm">
            Phase {demoPhase} of {currentScenario.phases.length}
          </span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {currentScenario.phases.map((phase, index) => (
            <div
              key={phase.id}
              className={`p-4 rounded-lg border transition-all duration-500 ${
                completedPhases.includes(phase.id)
                  ? 'bg-green-600 bg-opacity-20 border-green-400'
                  : demoPhase === phase.id && isAnimating
                  ? 'bg-blue-600 bg-opacity-20 border-blue-400 animate-pulse'
                  : 'bg-white bg-opacity-10 border-white border-opacity-20'
              }`}
            >
              <div className="flex items-center gap-2 mb-2">
                {completedPhases.includes(phase.id) ? (
                  <i className="fas fa-check-circle text-green-400"></i>
                ) : demoPhase === phase.id && isAnimating ? (
                  <i className="fas fa-spinner fa-spin text-blue-400"></i>
                ) : (
                  <i className="fas fa-circle text-gray-400"></i>
                )}
                <span className="text-white text-sm font-medium">Phase {phase.id}</span>
              </div>
              <div className="text-white text-opacity-90 text-sm">{phase.title}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Demo Content */}
      <div className="flex-1">
        {renderDemoContent()}
      </div>

      {/* Demo Stats */}
      <div className="mt-8 bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <i className="fas fa-chart-bar text-blue-400"></i>
          Demo Statistics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400">{completedPhases.length}</div>
            <div className="text-white text-opacity-70 text-sm">Phases Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              {Math.round((completedPhases.length / currentScenario.phases.length) * 100)}%
            </div>
            <div className="text-white text-opacity-70 text-sm">Progress</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-400">
              {currentScenario.phases.reduce((acc, phase) => acc + phase.duration, 0) / 1000}s
            </div>
            <div className="text-white text-opacity-70 text-sm">Total Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">{currentStep}</div>
            <div className="text-white text-opacity-70 text-sm">Current Step</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractiveDemo;