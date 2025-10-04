import React, { useState } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const SimpleMindMap = ({ topic = "Project Planning" }) => {
  const initialNodes = [
    {
      id: '1',
      position: { x: 250, y: 250 },
      data: { label: topic },
      style: {
        background: '#f1f5f9',
        border: '2px solid #3b82f6',
        borderRadius: '8px',
        padding: '10px',
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  return (
    <div className="w-full h-[700px] border rounded-lg bg-gray-50">
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
        <h3 className="text-lg font-semibold text-gray-800">Mind Map: {topic}</h3>
        <p className="text-sm text-gray-600">Simple mind map view</p>
      </div>
      
      <div className="h-[calc(100%-80px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        />
      </div>
    </div>
  );
};

// Wrapper component with ReactFlowProvider
const SimpleMindMapWrapper = (props) => {
  return (
    <ReactFlowProvider>
      <SimpleMindMap {...props} />
    </ReactFlowProvider>
  );
};

export default SimpleMindMapWrapper;