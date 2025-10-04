// Session Storage utilities for SDLC workflow persistence

const SESSION_KEYS = {
  GENERATED_CONTENT: 'sdlc_generated_content',
  APPROVED_STATES: 'sdlc_approved_states',
  FEEDBACK_STATES: 'sdlc_feedback_states',
  PROJECT_PROMPT: 'sdlc_project_prompt',
  API_KEY: 'sdlc_api_key',
  CURRENT_STEP: 'sdlc_current_step'
};

export const sessionStorage = {
  // Save generated content for a specific step
  saveGeneratedContent: (stepId, content) => {
    try {
      const existingContent = sessionStorage.getGeneratedContent();
      const updatedContent = { ...existingContent, [stepId]: content };
      window.sessionStorage.setItem(SESSION_KEYS.GENERATED_CONTENT, JSON.stringify(updatedContent));
    } catch (error) {
      console.warn('Failed to save generated content to session storage:', error);
    }
  },

  // Get all generated content
  getGeneratedContent: () => {
    try {
      const content = window.sessionStorage.getItem(SESSION_KEYS.GENERATED_CONTENT);
      return content ? JSON.parse(content) : {};
    } catch (error) {
      console.warn('Failed to load generated content from session storage:', error);
      return {};
    }
  },

  // Save approved states
  saveApprovedStates: (approvedStates) => {
    try {
      window.sessionStorage.setItem(SESSION_KEYS.APPROVED_STATES, JSON.stringify(approvedStates));
    } catch (error) {
      console.warn('Failed to save approved states to session storage:', error);
    }
  },

  // Get approved states
  getApprovedStates: () => {
    try {
      const states = window.sessionStorage.getItem(SESSION_KEYS.APPROVED_STATES);
      return states ? JSON.parse(states) : {};
    } catch (error) {
      console.warn('Failed to load approved states from session storage:', error);
      return {};
    }
  },

  // Save feedback states
  saveFeedbackStates: (feedbackStates) => {
    try {
      window.sessionStorage.setItem(SESSION_KEYS.FEEDBACK_STATES, JSON.stringify(feedbackStates));
    } catch (error) {
      console.warn('Failed to save feedback states to session storage:', error);
    }
  },

  // Get feedback states
  getFeedbackStates: () => {
    try {
      const states = window.sessionStorage.getItem(SESSION_KEYS.FEEDBACK_STATES);
      return states ? JSON.parse(states) : {};
    } catch (error) {
      console.warn('Failed to load feedback states from session storage:', error);
      return {};
    }
  },

  // Save project prompt
  saveProjectPrompt: (prompt) => {
    try {
      window.sessionStorage.setItem(SESSION_KEYS.PROJECT_PROMPT, prompt);
    } catch (error) {
      console.warn('Failed to save project prompt to session storage:', error);
    }
  },

  // Get project prompt
  getProjectPrompt: () => {
    try {
      return window.sessionStorage.getItem(SESSION_KEYS.PROJECT_PROMPT) || '';
    } catch (error) {
      console.warn('Failed to load project prompt from session storage:', error);
      return '';
    }
  },

  // Save API key (Note: Consider security implications in production)
  saveApiKey: (apiKey) => {
    try {
      window.sessionStorage.setItem(SESSION_KEYS.API_KEY, apiKey);
    } catch (error) {
      console.warn('Failed to save API key to session storage:', error);
    }
  },

  // Get API key
  getApiKey: () => {
    try {
      return window.sessionStorage.getItem(SESSION_KEYS.API_KEY) || '';
    } catch (error) {
      console.warn('Failed to load API key from session storage:', error);
      return '';
    }
  },

  // Save current step
  saveCurrentStep: (step) => {
    try {
      window.sessionStorage.setItem(SESSION_KEYS.CURRENT_STEP, step);
    } catch (error) {
      console.warn('Failed to save current step to session storage:', error);
    }
  },

  // Get current step
  getCurrentStep: () => {
    try {
      return window.sessionStorage.getItem(SESSION_KEYS.CURRENT_STEP) || 'api_input';
    } catch (error) {
      console.warn('Failed to load current step from session storage:', error);
      return 'api_input';
    }
  },

  // Clear all SDLC data from session storage
  clearAll: () => {
    try {
      Object.values(SESSION_KEYS).forEach(key => {
        window.sessionStorage.removeItem(key);
      });
    } catch (error) {
      console.warn('Failed to clear session storage:', error);
    }
  },

  // Check if content exists for a specific step
  hasContentForStep: (stepId) => {
    const content = sessionStorage.getGeneratedContent();
    return content[stepId] && content[stepId].trim().length > 0;
  }
};