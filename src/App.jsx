import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import ApiInput from './components/ApiInput';
import SdlcStep from './components/SdlcStep';
import EnhancedSdlcStep from './components/EnhancedSdlcStep';
import CodeGenerationStep from './components/CodeGenerationStep';
import Completion from './components/Completion';
import Toast from './components/Toast';
import ChatbotAssistant from './components/ChatbotAssistant';
import ChatbotToggle from './components/ChatbotToggle';
import PresentationMode from './components/PresentationMode';
import DiagramShowcase from './components/DiagramShowcase';

// Utils
import { WORKFLOW_STEPS, PROMPT_TEMPLATES } from './utils/constants';
import { generateWithGemini, generateChatResponse, getDownloadFilename, downloadFile } from './utils/api';
import { sessionStorage } from './utils/sessionStorage';

function App() {
  const [apiKey, setApiKey] = useState(() => sessionStorage.getApiKey());
  const [projectPrompt, setProjectPrompt] = useState(() => sessionStorage.getProjectPrompt());
  const [currentStep, setCurrentStep] = useState(() => sessionStorage.getCurrentStep());
  const [approved, setApproved] = useState(() => sessionStorage.getApprovedStates());
  const [feedback, setFeedback] = useState(() => sessionStorage.getFeedbackStates());
  const [generatedContent, setGeneratedContent] = useState(() => sessionStorage.getGeneratedContent());
  const [isLoading, setIsLoading] = useState(false);
  const [toast, setToast] = useState(null);
  
  // Chatbot state
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Presentation mode state
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [presentationStep, setPresentationStep] = useState(1);
  const [isDemoMode, setIsDemoMode] = useState(false);

  // Diagram showcase state
  const [showDiagramShowcase, setShowDiagramShowcase] = useState(false);

  useEffect(() => {
    const generateContent = async () => {
      const stepId = currentStep;
      if (stepId === 'api_input' || stepId === 'completion' || isLoading) return;

      // Check if content already exists in session storage or current state
      const hasStoredContent = sessionStorage.hasContentForStep(stepId);
      const hasCurrentContent = generatedContent[stepId] && generatedContent[stepId].trim().length > 0;
      
      // Special case for code review: generate if we have code to review and no existing review
      const isCodeReviewWithCode = stepId === 'code_review' && 
                                   generatedContent['code_generation'] && 
                                   (!hasStoredContent && !hasCurrentContent);
      
      // Only generate if we don't have content and no feedback is pending, or if it's a review with code
      const shouldGenerate = (!hasStoredContent && !hasCurrentContent) || feedback[stepId] || 
                             isCodeReviewWithCode;
      if (!shouldGenerate) return;

      setIsLoading(true);
      const promptTemplate = PROMPT_TEMPLATES[stepId];
      let content = '';
      if (promptTemplate) {
        let prompt = promptTemplate.replace('{prompt}', projectPrompt);
        
        // Special handling for code review - inject the actual generated code
        if (stepId === 'code_review' && generatedContent['code_generation']) {
          prompt = prompt.replace('{generatedCode}', generatedContent['code_generation']);
        }
        
        if (feedback[stepId]) {
          prompt += `\n\nPlease incorporate this feedback: ${feedback[stepId]}`;
          setFeedback(prev => {
            const newFeedback = { ...prev, [stepId]: null };
            sessionStorage.saveFeedbackStates(newFeedback);
            return newFeedback;
          });
        }
        content = await generateWithGemini(prompt, WORKFLOW_STEPS.find(s => s.id === stepId).label, apiKey);
      } else if (stepId === 'code_review' && !generatedContent['code_generation']) {
        // If no code has been generated yet, show a message
        content = `⚠️ **Code Review Not Available**\n\nPlease complete the Code Generation step first. The code review will automatically analyze the generated code once it's available.`;
      }
      
      // Save to both local state and session storage
      setGeneratedContent(prev => {
        const newContent = { ...prev, [stepId]: content };
        sessionStorage.saveGeneratedContent(stepId, content);
        return newContent;
      });
      setIsLoading(false);
    };

    generateContent();
  }, [currentStep, projectPrompt, feedback, generatedContent, apiKey, isLoading]);

  const handleStartWorkflow = (key, prompt) => {
    setApiKey(key);
    setProjectPrompt(prompt);
    setCurrentStep('user_stories');
    
    // Save to session storage
    sessionStorage.saveApiKey(key);
    sessionStorage.saveProjectPrompt(prompt);
    sessionStorage.saveCurrentStep('user_stories');
  };

  const handleApprove = (stepId) => {
    const newApproved = { ...approved, [stepId]: true };
    setApproved(newApproved);
    sessionStorage.saveApprovedStates(newApproved);
    
    const currentIndex = WORKFLOW_STEPS.findIndex(s => s.id === stepId);
    let nextStep;
    if (currentIndex < WORKFLOW_STEPS.length - 1) {
      nextStep = WORKFLOW_STEPS[currentIndex + 1].id;
    } else {
      nextStep = 'completion';
    }
    
    setCurrentStep(nextStep);
    sessionStorage.saveCurrentStep(nextStep);
  };

  const handleSubmitFeedback = (stepId, feedbackText) => {
    const newFeedback = { ...feedback, [stepId]: feedbackText };
    const newApproved = { ...approved, [stepId]: false };
    const newGeneratedContent = { ...generatedContent, [stepId]: null };
    
    setFeedback(newFeedback);
    setApproved(newApproved);
    setGeneratedContent(newGeneratedContent);
    
    // Save to session storage
    sessionStorage.saveFeedbackStates(newFeedback);
    sessionStorage.saveApprovedStates(newApproved);
    // Remove the content from session storage as it will be regenerated
    window.sessionStorage.removeItem('sdlc_generated_content');
    const allContent = sessionStorage.getGeneratedContent();
    delete allContent[stepId];
    window.sessionStorage.setItem('sdlc_generated_content', JSON.stringify(allContent));
  };

  const handleNewProject = () => {
    setProjectPrompt('');
    setCurrentStep('api_input');
    setApproved({});
    setFeedback({});
    setGeneratedContent({});
    
    // Clear all session storage data
    sessionStorage.clearAll();
  };

  const handleNavigateToStep = (stepId) => {
    // Allow navigation to any step that has content or is the starting step
    if (stepId === 'api_input' || generatedContent[stepId] || approved[stepId]) {
      setCurrentStep(stepId);
      sessionStorage.saveCurrentStep(stepId);
      
      // Show success message when navigating to a step with content
      if (stepId !== 'api_input' && generatedContent[stepId]) {
        const stepInfo = WORKFLOW_STEPS.find(s => s.id === stepId);
        showMessage(`Navigated to ${stepInfo?.label || stepId}`, 'success');
      }
    }
  };

  const showMessage = (message, type = 'error') => {
    setToast({ message, type });
  };

  const closeToast = () => {
    setToast(null);
  };

  const handleDownloadStep = (stepId) => {
    const content = generatedContent[stepId];
    const isCode = stepId === 'code_generation';
    const mimeType = isCode ? 'text/html' : 'text/markdown';
    const fileExtension = isCode ? '.html' : '.md';
    downloadFile(content, mimeType, `${getDownloadFilename(stepId, projectPrompt)}${fileExtension}`);
  };

  const handleDownloadWorkflow = (isFinal = false) => {
    const workflowData = {
      project: projectPrompt,
      download_date: new Date().toISOString(),
      steps: {}
    };
    WORKFLOW_STEPS.forEach(step => {
      if (generatedContent[step.id]) {
        workflowData.steps[step.id] = {
          label: step.label,
          content: generatedContent[step.id],
          is_approved: approved[step.id] || false
        };
      }
    });
    const content = JSON.stringify(workflowData, null, 2);
    downloadFile(content, 'application/json', `${getDownloadFilename(isFinal ? 'final_workflow' : 'full_workflow', projectPrompt)}.json`);
  };

  // Presentation mode handlers
  const handleEnterPresentationMode = () => {
    setIsPresentationMode(true);
    setPresentationStep(1);
    setIsDemoMode(false);
    showMessage('Entered presentation mode', 'success');
  };

  const handleExitPresentationMode = () => {
    setIsPresentationMode(false);
    setIsDemoMode(false);
    showMessage('Exited presentation mode', 'success');
  };

  const handlePresentationStepChange = (stepNumber) => {
    setPresentationStep(stepNumber);
  };

  const handleToggleDemo = () => {
    setIsDemoMode(!isDemoMode);
    showMessage(`Demo mode ${!isDemoMode ? 'enabled' : 'disabled'}`, 'success');
  };

  const renderMainContent = () => {
    const stepInfo = WORKFLOW_STEPS.find(s => s.id === currentStep);
    
    switch (currentStep) {
      case 'api_input':
        return <ApiInput onStartWorkflow={handleStartWorkflow} initialApiKey={apiKey} initialProjectPrompt={projectPrompt} />;
      case 'completion':
        return <Completion onNewProject={handleNewProject} onDownloadWorkflow={handleDownloadWorkflow} />;
      case 'code_generation':
        return <CodeGenerationStep
          stepInfo={stepInfo}
          content={generatedContent[currentStep]}
          isLoading={isLoading}
          onApprove={() => handleApprove(currentStep)}
          onSubmitFeedback={(feedback) => handleSubmitFeedback(currentStep, feedback)}
          onDownloadStep={() => handleDownloadStep(currentStep)}
          onUpdateContent={(newCode) => {
            setGeneratedContent(prev => {
              const updated = { ...prev, [currentStep]: newCode };
              sessionStorage.saveGeneratedContent(updated);
              return updated;
            });
          }}
        />;
      default:
        if (!stepInfo) return null; // Should not happen
        return <EnhancedSdlcStep
          stepInfo={stepInfo}
          content={generatedContent[currentStep] ? marked.parse(generatedContent[currentStep]) : ''}
          isLoading={isLoading}
          onApprove={() => handleApprove(currentStep)}
          onSubmitFeedback={(feedback) => handleSubmitFeedback(currentStep, feedback)}
          onDownloadStep={() => handleDownloadStep(currentStep)}
          currentStep={currentStep}
          approvedSteps={Object.keys(approved).filter(key => approved[key])}
        />;
    }
  };

  // Chatbot functions
  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  const handleChatMessage = async (message) => {
    if (!apiKey) {
      throw new Error('API key is required to use the chatbot');
    }

    setIsChatLoading(true);
    try {
      const projectContext = {
        projectPrompt,
        currentStep,
        generatedContent,
        workflowSteps: WORKFLOW_STEPS
      };
      const response = await generateChatResponse(message, apiKey, projectContext);
      return response;
    } catch (error) {
      console.error('Chat error:', error);
      throw error;
    } finally {
      setIsChatLoading(false);
    }
  };

  return (
    <div id="app" className="flex h-screen">
      {/* Conditional rendering based on presentation mode */}
      {isPresentationMode ? (
        <PresentationMode
          currentStep={presentationStep}
          onStepChange={handlePresentationStepChange}
          onExitPresentation={handleExitPresentationMode}
          sdlcData={{
            projectPrompt,
            generatedContent,
            approved,
            workflowSteps: WORKFLOW_STEPS
          }}
          demoMode={isDemoMode}
          onToggleDemo={handleToggleDemo}
        />
      ) : (
        <>
          <Sidebar
            steps={WORKFLOW_STEPS}
            currentStep={currentStep}
            approved={approved}
            generatedContent={generatedContent}
            isLoading={isLoading}
            onDownloadWorkflow={handleDownloadWorkflow}
            onNavigateToStep={handleNavigateToStep}
            onShowMessage={showMessage}
            onEnterPresentationMode={handleEnterPresentationMode}
          />
          <main className="w-3/4 ml-[25%] p-8 overflow-y-auto h-full">
            {renderMainContent()}
          </main>
          
          {/* Floating Action Button for Diagram Showcase */}
          {currentStep !== 'api_input' && (
            <button
              onClick={() => setShowDiagramShowcase(true)}
              className="fixed bottom-6 left-6 bg-gradient-to-r from-green-500 to-teal-600 hover:from-green-600 hover:to-teal-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl z-40"
              title="View Interactive Diagram Features"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
          )}
          
          {/* Chatbot Toggle Button */}
          <ChatbotToggle 
            onClick={toggleChatbot} 
            isOpen={isChatbotOpen}
          />
          
          {/* Chatbot Assistant */}
          <ChatbotAssistant 
            isOpen={isChatbotOpen}
            onClose={() => setIsChatbotOpen(false)}
            apiKey={apiKey}
            onSendMessage={handleChatMessage}
            isLoading={isChatLoading}
            projectPrompt={projectPrompt}
            currentStep={currentStep}
            generatedContent={generatedContent}
            workflowSteps={WORKFLOW_STEPS}
          />
        </>
      )}
      
      {/* Diagram Showcase Modal */}
      {showDiagramShowcase && (
        <DiagramShowcase onClose={() => setShowDiagramShowcase(false)} />
      )}
      
      {toast && (
        <Toast 
          message={toast.message} 
          type={toast.type} 
          onClose={closeToast} 
        />
      )}
    </div>
  );
}

export default App;
