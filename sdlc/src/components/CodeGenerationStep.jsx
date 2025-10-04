import React, { useState } from 'react';
import Loader from './Loader';
import Controls from './Controls';

function CodeGenerationStep({ stepInfo, content, isLoading, onApprove, onSubmitFeedback, onDownloadStep }) {
  const [showFullPreview, setShowFullPreview] = useState(false);

  const handleFullPagePreview = () => {
    if (!content) return;
    
    // Create a new window for full-page preview
    const previewWindow = window.open('', '_blank', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    
    if (previewWindow) {
      // Write the generated HTML content to the new window
      previewWindow.document.write(content);
      previewWindow.document.close();
      
      // Set window title
      previewWindow.document.title = 'Live Preview - Full Page';
      
      // Focus the new window
      previewWindow.focus();
    } else {
      // Fallback: Show modal overlay if popup was blocked
      setShowFullPreview(true);
    }
  };

  const closeFullPreview = () => {
    setShowFullPreview(false);
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{stepInfo.label}</h1>
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
        {/* Left Panel: Code Display */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <h2 className="text-2xl font-semibold text-gray-700 mb-3 flex-shrink-0">Generated Code</h2>
          <div className="bg-gray-800 text-white p-4 rounded-xl shadow-md flex-grow overflow-auto">
            {isLoading ? (
              <Loader message="Gemini is generating code..." />
            ) : (
              <pre className="whitespace-pre-wrap break-words"><code>{content}</code></pre>
            )}
          </div>
        </div>
        {/* Right Panel: Live Preview Canvas */}
        <div className="w-full lg:w-1/2 flex flex-col">
          <div className="flex justify-between items-center mb-3 flex-shrink-0">
            <h2 className="text-2xl font-semibold text-gray-700">Live Preview</h2>
            {!isLoading && content && (
              <button
                onClick={handleFullPagePreview}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center gap-2"
                title="Open preview in full page"
              >
                <i className="fas fa-external-link-alt"></i>
                View Full Page
              </button>
            )}
          </div>
          <div className="bg-white rounded-xl shadow-md flex-grow">
            <iframe 
              srcDoc={content || ''} 
              className="w-full h-full border-0 rounded-xl" 
              title="Live Code Preview"
            ></iframe>
          </div>
        </div>
      </div>
      
      {!isLoading && content && (
         <Controls 
          onApprove={onApprove}
          onSubmitFeedback={onSubmitFeedback}
          onDownloadStep={onDownloadStep}
        />
      )}

      {/* Full-page preview modal overlay (fallback for blocked popups) */}
      {showFullPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg w-full h-full max-w-7xl max-h-[95vh] flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="text-lg font-semibold">Full Page Preview</h3>
              <button
                onClick={closeFullPreview}
                className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                title="Close preview"
              >
                ×
              </button>
            </div>
            <div className="flex-1 p-4">
              <iframe 
                srcDoc={content || ''} 
                className="w-full h-full border border-gray-300 rounded" 
                title="Full Page Live Preview"
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodeGenerationStep;