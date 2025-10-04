import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import './App.css';

// Components
import Sidebar from './components/Sidebar';
import ApiInput from './components/ApiInput';
import SdlcStep from './components/SdlcStep';
import CodeGenerationStep from './components/CodeGenerationStep';
import Completion from './components/Completion';
import Toast from './components/Toast';

// Utils
import { WORKFLOW_STEPS, PROMPT_TEMPLATES } from './utils/constants';
import { generateWithGemini, getDownloadFilename, downloadFile } from './utils/api';
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

  useEffect(() => {
    const generateContent = async () => {
      const stepId = currentStep;
      if (stepId === 'api_input' || stepId === 'completion' || isLoading) return;

      // Check if content already exists in session storage or current state
      const hasStoredContent = sessionStorage.hasContentForStep(stepId);
      const hasCurrentContent = generatedContent[stepId] && generatedContent[stepId].trim().length > 0;
      
      // Only generate if we don't have content and no feedback is pending
      const shouldGenerate = (!hasStoredContent && !hasCurrentContent) || feedback[stepId];
      if (!shouldGenerate) return;

      setIsLoading(true);
      const promptTemplate = PROMPT_TEMPLATES[stepId];
      let content = '';
      if (promptTemplate) {
        let prompt = promptTemplate.replace('{prompt}', projectPrompt);
        if (feedback[stepId]) {
          prompt += `\n\nPlease incorporate this feedback: ${feedback[stepId]}`;
          setFeedback(prev => {
            const newFeedback = { ...prev, [stepId]: null };
            sessionStorage.saveFeedbackStates(newFeedback);
            return newFeedback;
          });
        }
        content = await generateWithGemini(prompt, WORKFLOW_STEPS.find(s => s.id === stepId).label, apiKey);
      } else if (stepId === 'code_review') {
        content = `This is a manual review step. Please review the generated code in the previous step and approve when ready.`;
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
    setCurrentStep('roadmap');
    
    // Save to session storage
    sessionStorage.saveApiKey(key);
    sessionStorage.saveProjectPrompt(prompt);
    sessionStorage.saveCurrentStep('roadmap');
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
        />;
      default:
        if (!stepInfo) return null; // Should not happen
        return <SdlcStep
          stepInfo={stepInfo}
          content={generatedContent[currentStep] ? marked.parse(generatedContent[currentStep]) : ''}
          isLoading={isLoading}
          onApprove={() => handleApprove(currentStep)}
          onSubmitFeedback={(feedback) => handleSubmitFeedback(currentStep, feedback)}
          onDownloadStep={() => handleDownloadStep(currentStep)}
        />;
    }
  };

  return (
    <div id="app" className="flex h-screen">
      <Sidebar
        steps={WORKFLOW_STEPS}
        currentStep={currentStep}
        approved={approved}
        generatedContent={generatedContent}
        isLoading={isLoading}
        onDownloadWorkflow={handleDownloadWorkflow}
        onNavigateToStep={handleNavigateToStep}
        onShowMessage={showMessage}
      />
      <main className="w-3/4 ml-[25%] p-8 overflow-y-auto h-full">
        {renderMainContent()}
      </main>
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
