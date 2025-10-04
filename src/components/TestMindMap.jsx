import React from 'react';
import { ReactFlow, ReactFlowProvider } from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const TestMindMap = () => {
  const initialNodes = [
    {
      id: '1',
      position: { x: 100, y: 100 },
      data: { label: 'Test Node' },
    },
  ];

  return (
    <div className="w-full h-[500px] border">
      <ReactFlowProvider>
        <ReactFlow
          nodes={initialNodes}
          fitView
        />
      </ReactFlowProvider>
    </div>
  );
};

export default TestMindMap;