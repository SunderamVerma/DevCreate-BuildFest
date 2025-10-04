import React, { useState, useEffect } from 'react';
import PresentationStep from './PresentationStep';
import PresentationControls from './PresentationControls';
import InteractiveDemo from './InteractiveDemo';

const PresentationMode = ({ 
  currentStep = 1, 
  onStepChange,
  onExitPresentation,
  sdlcData = {},
  demoMode = false,
  onToggleDemo 
}) => {
  const [presentationStep, setPresentationStep] = useState(currentStep);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [presentationTimer, setPresentationTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  // Presentation steps configuration
  const presentationSteps = [
    {
      id: 1,
      title: "Project Overview",
      subtitle: "Understanding the Vision",
      icon: "fas fa-lightbulb",
      color: "from-purple-600 to-blue-600",
      description: "Defining project goals, scope, and success criteria",
      keyPoints: [
        "Business objectives and requirements",
        "Project scope and deliverables", 
        "Success metrics and KPIs",
        "Timeline and milestones"
      ]
    },
    {
      id: 2,
      title: "Requirements Analysis",
      subtitle: "Capturing Stakeholder Needs",
      icon: "fas fa-clipboard-list",
      color: "from-blue-600 to-indigo-600",
      description: "Gathering and analyzing functional and non-functional requirements",
      keyPoints: [
        "Stakeholder interviews and workshops",
        "Functional requirements documentation",
        "Non-functional requirements (performance, security)",
        "User stories and acceptance criteria"
      ]
    },
    {
      id: 3,
      title: "System Design",
      subtitle: "Architecting the Solution",
      icon: "fas fa-drafting-compass",
      color: "from-indigo-600 to-purple-600",
      description: "Creating the technical blueprint for implementation",
      keyPoints: [
        "System architecture and technology stack",
        "Database design and data flow",
        "User interface mockups and wireframes",
        "Integration points and APIs"
      ]
    },
    {
      id: 4,
      title: "Implementation",
      subtitle: "Building the Solution",
      icon: "fas fa-code",
      color: "from-green-600 to-teal-600",
      description: "Developing and coding the application",
      keyPoints: [
        "Agile development methodology",
        "Code quality and best practices",
        "Version control and collaboration",
        "Regular progress reviews"
      ]
    },
    {
      id: 5,
      title: "Testing & Quality Assurance",
      subtitle: "Ensuring Excellence",
      icon: "fas fa-check-circle",
      color: "from-orange-600 to-red-600",
      description: "Comprehensive testing to ensure quality and reliability",
      keyPoints: [
        "Unit and integration testing",
        "User acceptance testing",
        "Performance and security testing",
        "Bug tracking and resolution"
      ]
    },
    {
      id: 6,
      title: "Deployment & Maintenance",
      subtitle: "Delivering Value",
      icon: "fas fa-rocket",
      color: "from-red-600 to-pink-600",
      description: "Launching the solution and ensuring ongoing success",
      keyPoints: [
        "Production deployment strategy",
        "User training and documentation",
        "Monitoring and support procedures",
        "Continuous improvement and updates"
      ]
    }
  ];

  // Timer effect
  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setPresentationTimer(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        previousStep();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        if (isFullscreen) {
          exitFullscreen();
        } else {
          onExitPresentation();
        }
      } else if (e.key === 'F11') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'n' || e.key === 'N') {
        e.preventDefault();
        setShowNotes(!showNotes);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [presentationStep, isFullscreen, showNotes]);

  const nextStep = () => {
    if (presentationStep < presentationSteps.length) {
      const newStep = presentationStep + 1;
      setPresentationStep(newStep);
      onStepChange && onStepChange(newStep);
    }
  };

  const previousStep = () => {
    if (presentationStep > 1) {
      const newStep = presentationStep - 1;
      setPresentationStep(newStep);
      onStepChange && onStepChange(newStep);
    }
  };

  const goToStep = (stepId) => {
    setPresentationStep(stepId);
    onStepChange && onStepChange(stepId);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const exitFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    }
    setIsFullscreen(false);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
  };

  const resetTimer = () => {
    setPresentationTimer(0);
    setIsTimerRunning(false);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentStepData = presentationSteps[presentationStep - 1];

  return (
    <div className="presentation-mode h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-grid-pattern"></div>
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-4 bg-black bg-opacity-20 backdrop-blur-sm border-b border-white border-opacity-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <i className="fas fa-presentation-screen text-white text-xl"></i>
            <h1 className="text-white font-bold text-lg">SDLC Presentation</h1>
          </div>
          <div className="text-white text-opacity-70 text-sm">
            Step {presentationStep} of {presentationSteps.length}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Timer */}
          <div className="flex items-center gap-2 text-white">
            <button
              onClick={toggleTimer}
              className="text-sm hover:text-blue-300 transition-colors"
            >
              <i className={`fas ${isTimerRunning ? 'fa-pause' : 'fa-play'}`}></i>
            </button>
            <span className="font-mono text-sm">{formatTime(presentationTimer)}</span>
            <button
              onClick={resetTimer}
              className="text-sm hover:text-blue-300 transition-colors"
            >
              <i className="fas fa-redo"></i>
            </button>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotes(!showNotes)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                showNotes 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <i className="fas fa-sticky-note mr-1"></i>
              Notes
            </button>
            
            <button
              onClick={onToggleDemo}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                demoMode 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
              }`}
            >
              <i className="fas fa-play-circle mr-1"></i>
              Demo
            </button>

            <button
              onClick={toggleFullscreen}
              className="px-3 py-1 rounded text-sm bg-white bg-opacity-20 text-white hover:bg-opacity-30 transition-colors"
            >
              <i className="fas fa-expand mr-1"></i>
              Fullscreen
            </button>

            <button
              onClick={onExitPresentation}
              className="px-3 py-1 rounded text-sm bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              <i className="fas fa-times mr-1"></i>
              Exit
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex relative">
        {/* Presentation Step */}
        <div className="flex-1 flex flex-col">
          {demoMode ? (
            <InteractiveDemo 
              currentStep={presentationStep}
              stepData={currentStepData}
              sdlcData={sdlcData}
            />
          ) : (
            <PresentationStep 
              stepData={currentStepData}
              sdlcData={sdlcData}
            />
          )}
        </div>

        {/* Notes Panel */}
        {showNotes && (
          <div className="w-80 bg-black bg-opacity-30 backdrop-blur-sm border-l border-white border-opacity-10 p-4">
            <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
              <i className="fas fa-sticky-note"></i>
              Presenter Notes
            </h3>
            <div className="text-white text-opacity-80 text-sm space-y-2">
              <div className="bg-white bg-opacity-10 rounded p-3">
                <h4 className="font-medium mb-2">Key Talking Points:</h4>
                <ul className="space-y-1 text-xs">
                  {currentStepData.keyPoints.map((point, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <span className="text-blue-300">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="bg-white bg-opacity-10 rounded p-3">
                <h4 className="font-medium mb-2">Timing Guide:</h4>
                <p className="text-xs">Suggested duration: 3-5 minutes per step</p>
              </div>

              <div className="bg-white bg-opacity-10 rounded p-3">
                <h4 className="font-medium mb-2">Keyboard Shortcuts:</h4>
                <div className="text-xs space-y-1">
                  <div>→ / Space: Next step</div>
                  <div>← : Previous step</div>
                  <div>N: Toggle notes</div>
                  <div>F11: Fullscreen</div>
                  <div>Esc: Exit</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Navigation Controls */}
      <PresentationControls
        currentStep={presentationStep}
        totalSteps={presentationSteps.length}
        onPrevious={previousStep}
        onNext={nextStep}
        onGoToStep={goToStep}
        steps={presentationSteps}
      />

      {/* Progress Indicator */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white bg-opacity-20">
        <div 
          className="h-full bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-500"
          style={{ width: `${(presentationStep / presentationSteps.length) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default PresentationMode;