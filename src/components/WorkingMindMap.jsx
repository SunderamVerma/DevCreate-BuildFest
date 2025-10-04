import React, { useState, useCallback } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  MarkerType,
  Handle,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Link, Unlink, Trash2 } from 'lucide-react';

// Enhanced node component
const BasicNode = ({ data, selected }) => {
  return (
    <div className={`px-4 py-2 shadow-lg rounded-lg bg-blue-500 text-white border-2 ${selected ? 'border-yellow-400 ring-2 ring-yellow-200' : 'border-blue-600'} transition-all`}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-white border-2 border-blue-500" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-white border-2 border-blue-500" />
      <Handle type="target" position={Position.Left} className="w-3 h-3 bg-white border-2 border-blue-500" />
      <Handle type="source" position={Position.Right} className="w-3 h-3 bg-white border-2 border-blue-500" />
      
      <div className="text-sm font-medium">{data.label}</div>
    </div>
  );
};

const nodeTypes = {
  basic: BasicNode,
};

const WorkingMindMap = ({ topic = "Project Planning" }) => {
  const initialNodes = [
    {
      id: '1',
      type: 'basic',
      position: { x: 250, y: 100 },
      data: { label: topic },
    },
    {
      id: '2',
      type: 'basic',
      position: { x: 100, y: 200 },
      data: { label: 'Ideas' },
    },
    {
      id: '3',
      type: 'basic',
      position: { x: 400, y: 200 },
      data: { label: 'Goals' },
    },
  ];

  const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      type: 'smoothstep',
      animated: true,
      style: { strokeWidth: 3, stroke: '#ef4444' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#ef4444',
      },
    },
    {
      id: 'e1-3',
      source: '1',
      target: '3',
      type: 'smoothstep',
      animated: true,
      style: { strokeWidth: 3, stroke: '#10b981' },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: '#10b981',
      },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [connectionMode, setConnectionMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const onConnect = useCallback(
    (params) => {
      const newEdge = {
        ...params,
        type: 'smoothstep',
        animated: true,
        style: { strokeWidth: 3, stroke: '#3b82f6' },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#3b82f6',
        },
      };
      setEdges((eds) => addEdge(newEdge, eds));
    },
    [setEdges]
  );

  // Manual connection mode - click two nodes to connect them
  const handleNodeClick = useCallback((event, node) => {
    if (connectionMode) {
      if (selectedNodes.length === 0) {
        setSelectedNodes([node.id]);
        setIsConnecting(true);
      } else if (selectedNodes.length === 1 && selectedNodes[0] !== node.id) {
        // Create connection between first selected and current node
        const sourceId = selectedNodes[0];
        const targetId = node.id;
        
        onConnect({
          source: sourceId,
          target: targetId,
          sourceHandle: null,
          targetHandle: null,
        });
        
        setSelectedNodes([]);
        setConnectionMode(false);
        setIsConnecting(false);
      }
    }
  }, [connectionMode, selectedNodes, onConnect]);

  const addNode = () => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: 'basic',
      position: { x: Math.random() * 400 + 100, y: Math.random() * 300 + 100 },
      data: { label: `Node ${nodes.length + 1}` },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  // Delete selected edges
  const deleteSelectedEdges = useCallback(() => {
    setEdges((eds) => eds.filter(edge => !edge.selected));
  }, [setEdges]);

  // Clear all connections
  const clearAllConnections = useCallback(() => {
    if (window.confirm('Are you sure you want to remove all connections?')) {
      setEdges([]);
    }
  }, [setEdges]);

  return (
    <div className="w-full h-[600px] border rounded-lg bg-gray-50">
      {/* Enhanced Controls */}
      <div className="p-3 border-b bg-white flex items-center gap-4 flex-wrap">
        <h3 className="text-lg font-semibold">Mind Map: {topic}</h3>
        
        {/* Connection Tools */}
        <div className="flex items-center gap-2 border-r border-gray-300 pr-4">
          <button
            onClick={() => {
              setConnectionMode(!connectionMode);
              setSelectedNodes([]);
              setIsConnecting(false);
            }}
            className={`flex items-center gap-1 px-3 py-1 rounded border transition-all ${
              connectionMode
                ? 'bg-blue-500 text-white border-blue-500'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
            title={connectionMode ? 'Exit connection mode' : 'Enter connection mode - click two nodes to connect them'}
          >
            <Link size={16} />
            {connectionMode ? 'Exit Connect' : 'Connect Nodes'}
          </button>
          
          {edges.length > 0 && (
            <>
              <button
                onClick={deleteSelectedEdges}
                className="flex items-center gap-1 px-3 py-1 rounded border bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100 transition-all"
                title="Delete selected connections (select edges first)"
              >
                <Trash2 size={16} />
                Delete Selected
              </button>
              
              <button
                onClick={clearAllConnections}
                className="flex items-center gap-1 px-3 py-1 rounded border bg-red-50 text-red-600 border-red-300 hover:bg-red-100 transition-all"
                title="Remove all connections"
              >
                <Unlink size={16} />
                Clear All
              </button>
            </>
          )}
        </div>

        {/* Node Tools */}
        <button
          onClick={addNode}
          className="flex items-center gap-1 px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
        >
          <Plus size={16} />
          Add Node
        </button>
        
        {/* Status */}
        <div className="text-sm text-gray-600 ml-auto">
          Nodes: {nodes.length} | Connections: {edges.length}
          {connectionMode && isConnecting && (
            <span className="ml-2 text-blue-600 font-medium">
              Click target node to connect
            </span>
          )}
          {connectionMode && !isConnecting && (
            <span className="ml-2 text-blue-600 font-medium">
              Connection Mode: Click first node
            </span>
          )}
        </div>
      </div>
      
      {/* Mind Map */}
      <div className="h-[calc(100%-60px)]">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          nodesDraggable={!connectionMode}
          nodesConnectable={true}
          elementsSelectable={true}
        >
          <Controls />
          <MiniMap />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
      </div>
    </div>
  );
};

// Wrapper with provider
const WorkingMindMapWrapper = (props) => {
  return (
    <ReactFlowProvider>
      <WorkingMindMap {...props} />
    </ReactFlowProvider>
  );
};

export default WorkingMindMapWrapper;