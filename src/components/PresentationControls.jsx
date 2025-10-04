import React from 'react';

const PresentationControls = ({ 
  currentStep, 
  totalSteps, 
  onPrevious, 
  onNext, 
  onGoToStep, 
  steps = [] 
}) => {
  return (
    <div className="bg-black bg-opacity-20 backdrop-blur-sm border-t border-white border-opacity-10 p-4">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <button
          onClick={onPrevious}
          disabled={currentStep === 1}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentStep === 1
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
          }`}
        >
          <i className="fas fa-chevron-left"></i>
          Previous
        </button>

        {/* Step Navigation */}
        <div className="flex items-center gap-2">
          {steps.map((step) => (
            <button
              key={step.id}
              onClick={() => onGoToStep(step.id)}
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                currentStep === step.id
                  ? `bg-gradient-to-r ${step.color} text-white scale-110 shadow-lg`
                  : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 hover:scale-105'
              }`}
              title={step.title}
            >
              {step.id}
            </button>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          disabled={currentStep === totalSteps}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
            currentStep === totalSteps
              ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
              : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
          }`}
        >
          Next
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Step Info */}
      <div className="flex items-center justify-center mt-3 gap-4 text-white text-opacity-70 text-sm">
        <span>Step {currentStep} of {totalSteps}</span>
        <span>•</span>
        <span>Use arrow keys or click to navigate</span>
        <span>•</span>
        <span>Press N for notes, F11 for fullscreen</span>
      </div>
    </div>
  );
};

export default PresentationControls;