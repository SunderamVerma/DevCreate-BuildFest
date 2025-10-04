import React, { useState } from 'react';
import Loader from './Loader';
import Controls from './Controls';
import WireframeCanvas from './WireframeCanvas';
import ArchitectureDiagram from './ArchitectureDiagram';
import WorkingMindMap from './WorkingMindMap';
import SimpleMindMap from './SimpleMindMap';
import TestMindMap from './TestMindMap';
import { BarChart3, Layers, Lightbulb, FileText } from 'lucide-react';

function EnhancedSdlcStep({ 
  stepInfo, 
  content, 
  isLoading, 
  onApprove, 
  onSubmitFeedback, 
  onDownloadStep,
  currentStep,
  approvedSteps = []
}) {
  const [activeView, setActiveView] = useState('content');

  // Determine which diagrams are available for each step
  const getAvailableViews = () => {
    const views = [
      { id: 'content', label: 'Content', icon: FileText }
    ];

    switch (stepInfo.id) {
      case 'roadmap':
        views.push(
          { id: 'mindmap', label: 'Brainstorming', icon: Lightbulb }
        );
        break;
      case 'user_stories':
        views.push(
          { id: 'mindmap', label: 'User Journey Map', icon: Lightbulb }
        );
        break;
      case 'design_docs':
        views.push(
          { id: 'wireframe', label: 'Wireframes', icon: Layers },
          { id: 'architecture', label: 'System Architecture', icon: BarChart3 },
          { id: 'mindmap', label: 'Design Thinking', icon: Lightbulb }
        );
        break;
      case 'code_generation':
        views.push(
          { id: 'architecture', label: 'Code Architecture', icon: BarChart3 }
        );
        break;
      case 'deployment':
        views.push(
          { id: 'architecture', label: 'Deployment Architecture', icon: BarChart3 }
        );
        break;
      case 'monitoring':
        views.push(
          { id: 'architecture', label: 'Monitoring Architecture', icon: BarChart3 }
        );
        break;
      default:
        // For other steps, only show content
        break;
    }

    return views;
  };

  const renderDiagramView = () => {
    switch (activeView) {
      case 'wireframe':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Interactive Wireframe Designer</h3>
            <WireframeCanvas 
              projectType="web"
              onSave={(elements, deviceType) => {
                console.log('Wireframe saved:', { elements, deviceType });
                // Here you could integrate with your save functionality
              }}
            />
          </div>
        );

      case 'architecture':
        const getArchitectureType = () => {
          if (stepInfo.id === 'design_docs') return 'web_app';
          if (stepInfo.id === 'code_generation') return 'microservices';
          if (stepInfo.id === 'deployment') return 'web_app';
          if (stepInfo.id === 'monitoring') return 'web_app';
          return 'web_app';
        };

        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {stepInfo.id === 'design_docs' && 'System Architecture Design'}
              {stepInfo.id === 'code_generation' && 'Code Architecture Overview'}
              {stepInfo.id === 'deployment' && 'Deployment Infrastructure'}
              {stepInfo.id === 'monitoring' && 'Monitoring & Observability Architecture'}
            </h3>
            <ArchitectureDiagram 
              architectureType={getArchitectureType()}
              onNodeClick={(event, node) => {
                console.log('Architecture node clicked:', node.data);
                // Here you could show detailed information about the component
              }}
            />
          </div>
        );

      case 'mindmap':
        const getMindMapTopic = () => {
          if (stepInfo.id === 'roadmap') return 'Project Planning & Strategy';
          if (stepInfo.id === 'user_stories') return 'User Journey & Requirements';
          if (stepInfo.id === 'design_docs') return 'Design Considerations';
          return 'Project Brainstorming';
        };

        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              {stepInfo.id === 'roadmap' && 'Project Planning Mind Map'}
              {stepInfo.id === 'user_stories' && 'User Journey Mapping'}
              {stepInfo.id === 'design_docs' && 'Design Thinking Map'}
            </h3>
            <WorkingMindMap 
              topic={getMindMapTopic()}
            />
          </div>
        );

      case 'content':
      default:
        return (
          <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: content }} />
        );
    }
  };

  const availableViews = getAvailableViews();

  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-800 mb-6">{stepInfo.label}</h1>
      
      {/* View Tabs */}
      {availableViews.length > 1 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 p-1 bg-gray-100 rounded-lg">
            {availableViews.map(view => {
              const Icon = view.icon;
              return (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeView === view.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  {view.label}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Content Area */}
      <div className="bg-white p-8 rounded-xl shadow-md min-h-[400px]">
        {isLoading ? (
          <Loader message="AI is generating content..." />
        ) : (
          <div>
            {activeView === 'content' && availableViews.length > 1 && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-blue-800 text-sm">
                  <strong>💡 Interactive Features Available!</strong> This step now includes interactive diagrams. 
                  Use the tabs above to switch between textual content and visual tools like flowcharts, wireframes, 
                  architecture diagrams, and mind maps.
                </p>
              </div>
            )}
            {renderDiagramView()}
          </div>
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

export default EnhancedSdlcStep;