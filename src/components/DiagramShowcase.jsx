import React, { useState } from 'react';
import WireframeCanvas from './WireframeCanvas';
import ArchitectureDiagram from './ArchitectureDiagram';
import SimpleArchitectureTest from './SimpleArchitectureTest';
import MindMap from './MindMap';
import { BarChart3, Layers, Lightbulb, Layout, Shuffle, Network } from 'lucide-react';

const DiagramShowcase = ({ onClose }) => {
  const [activeDemo, setActiveDemo] = useState('wireframe');

  const demos = [
    {
      id: 'wireframe',
      label: 'Wireframe Designer',
      icon: Layers,
      description: 'Create interactive wireframes and mockups for different device types',
      component: <WireframeCanvas projectType="web" />
    },
    {
      id: 'architecture',
      label: 'System Architecture',
      icon: BarChart3,
      description: 'Visualize system architecture with interactive components and filtering',
      component: <ArchitectureDiagram architectureType="web_app" />
    },
    {
      id: 'mindmap',
      label: 'Mind Mapping',
      icon: Lightbulb,
      description: 'Interactive brainstorming tool for project planning and idea organization',
      component: <MindMap topic="Interactive SDLC Project" />
    }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Interactive Diagram Components</h2>
              <p className="text-blue-100 mt-1">Enhanced visual tools to replace textual content in SDLC steps</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Navigation */}
        <div className="p-4 border-b bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {demos.map(demo => {
              const Icon = demo.icon;
              return (
                <button
                  key={demo.id}
                  onClick={() => setActiveDemo(demo.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    activeDemo === demo.id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={16} />
                  {demo.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-auto" style={{ maxHeight: 'calc(90vh - 200px)' }}>
          {demos.map(demo => {
            if (demo.id !== activeDemo) return null;
            
            return (
              <div key={demo.id}>
                <div className="mb-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{demo.label}</h3>
                  <p className="text-gray-600">{demo.description}</p>
                </div>
                
                <div className="border rounded-lg overflow-hidden">
                  {demo.component}
                </div>

                {/* Features list */}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {demo.id === 'flowchart' && (
                    <>
                      <div className="bg-green-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-green-800 mb-2">Real-time Status</h4>
                        <p className="text-green-700 text-sm">Shows current step progress and completed phases</p>
                      </div>
                      <div className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-blue-800 mb-2">Interactive Navigation</h4>
                        <p className="text-blue-700 text-sm">Click nodes to navigate between SDLC steps</p>
                      </div>
                      <div className="bg-purple-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-purple-800 mb-2">Visual Feedback</h4>
                        <p className="text-purple-700 text-sm">Animated connections and status indicators</p>
                      </div>
                    </>
                  )}

                  {demo.id === 'wireframe' && (
                    <>
                      <div className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-orange-800 mb-2">Multi-Device Support</h4>
                        <p className="text-orange-700 text-sm">Design for desktop, tablet, and mobile</p>
                      </div>
                      <div className="bg-teal-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-teal-800 mb-2">Interactive Tools</h4>
                        <p className="text-teal-700 text-sm">Drag and drop UI elements and components</p>
                      </div>
                      <div className="bg-indigo-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-indigo-800 mb-2">Export Capability</h4>
                        <p className="text-indigo-700 text-sm">Save and share wireframe designs</p>
                      </div>
                    </>
                  )}

                  {demo.id === 'architecture' && (
                    <>
                      <div className="bg-red-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-red-800 mb-2">Component Filtering</h4>
                        <p className="text-red-700 text-sm">Filter by frontend, backend, database layers</p>
                      </div>
                      <div className="bg-yellow-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-yellow-800 mb-2">Technology Stack</h4>
                        <p className="text-yellow-700 text-sm">Visual representation of tech choices</p>
                      </div>
                      <div className="bg-pink-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-pink-800 mb-2">Multiple Templates</h4>
                        <p className="text-pink-700 text-sm">Pre-built architectures for different project types</p>
                      </div>
                    </>
                  )}

                  {demo.id === 'mindmap' && (
                    <>
                      <div className="bg-emerald-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-emerald-800 mb-2">Dynamic Editing</h4>
                        <p className="text-emerald-700 text-sm">Double-click to edit, drag to rearrange</p>
                      </div>
                      <div className="bg-cyan-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-cyan-800 mb-2">Categorized Ideas</h4>
                        <p className="text-cyan-700 text-sm">Organize by goals, features, team, technology</p>
                      </div>
                      <div className="bg-violet-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-violet-800 mb-2">Quick Templates</h4>
                        <p className="text-violet-700 text-sm">Pre-built branches for common project aspects</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t bg-gray-50 text-center">
          <p className="text-gray-600 text-sm">
            These interactive diagrams replace lengthy textual descriptions with engaging visual tools, 
            making the SDLC process more intuitive and collaborative.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiagramShowcase;