import React from 'react';
import Loader from './Loader';
import Controls from './Controls';

function SdlcStep({ stepInfo, content, isLoading, onApprove, onSubmitFeedback, onDownloadStep }) {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{stepInfo.label}</h1>
      <div className="bg-white p-8 rounded-xl shadow-md min-h-[400px]">
        {isLoading ? (
          <Loader message="AI is generating content..." />
        ) : (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        )}
      </div>
      {!isLoading && content && (
         <Controls 
          onApprove={onApprove}
          onSubmitFeedback={onSubmitFeedback}
          onDownloadStep={onDownloadStep}
        />
      )}
    </div>
  );
}

export default SdlcStep;