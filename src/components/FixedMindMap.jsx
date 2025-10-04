import React, { useCallback, useState, useRef, useEffect } from 'react';
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
  useReactFlow,
  ReactFlowProvider,
  ConnectionMode,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Edit3, Trash2, Lightbulb, Target, Users, Code, Save, Download, Upload, RefreshCw, Zap, Eye, EyeOff, ChevronDown, Link, Unlink } from 'lucide-react';

// Predefined node templates for each category
const nodeTemplates = {
  idea: [
    { label: 'Brainstorm Ideas', description: 'Generate creative solutions' },
    { label: 'Problem Statement', description: 'Define the core problem' },
    { label: 'Research Topics', description: 'Areas to investigate' },
    { label: 'Innovation Opportunity', description: 'Potential breakthrough areas' },
    { label: 'User Needs', description: 'What users are looking for' },
    { label: 'Market Gap', description: 'Unmet market demands' }
  ],
  goal: [
    { label: 'Project Objective', description: 'Primary goal to achieve' },
    { label: 'Success Metrics', description: 'How to measure success' },
    { label: 'Timeline Goal', description: 'Time-bound objectives' },
    { label: 'Quality Target', description: 'Quality standards to meet' },
    { label: 'Performance Goal', description: 'Performance benchmarks' },
    { label: 'Business Outcome', description: 'Expected business results' }
  ],
  task: [
    { label: 'Development Task', description: 'Code implementation work' },
    { label: 'Testing Task', description: 'Quality assurance activity' },
    { label: 'Research Task', description: 'Investigation and analysis' },
    { label: 'Design Task', description: 'UI/UX design work' },
    { label: 'Documentation Task', description: 'Create technical docs' },
    { label: 'Review Task', description: 'Code or design review' }
  ],
  process: [
    { label: 'Planning Phase', description: 'Initial planning activities' },
    { label: 'Development Process', description: 'Core development workflow' },
    { label: 'Testing Process', description: 'Quality assurance workflow' },
    { label: 'Deployment Process', description: 'Release and deployment' },
    { label: 'Review Process', description: 'Evaluation and feedback' },
    { label: 'Maintenance Process', description: 'Ongoing support activities' }
  ],
  person: [
    { label: 'Project Manager', description: 'Oversees project execution' },
    { label: 'Developer', description: 'Implements technical solutions' },
    { label: 'Designer', description: 'Creates user interface designs' },
    { label: 'Tester', description: 'Ensures quality and functionality' },
    { label: 'Stakeholder', description: 'Project decision maker' },
    { label: 'End User', description: 'Final product user' }
  ],
  resource: [
    { label: 'Technical Resource', description: 'Tools and technologies' },
    { label: 'Human Resource', description: 'Team members and skills' },
    { label: 'Budget Resource', description: 'Financial allocation' },
    { label: 'Time Resource', description: 'Schedule and deadlines' },
    { label: 'Knowledge Resource', description: 'Documentation and expertise' },
    { label: 'External Resource', description: 'Third-party services' }
  ],
  milestone: [
    { label: 'Project Kickoff', description: 'Project initiation milestone' },
    { label: 'Design Complete', description: 'Design phase completion' },
    { label: 'Development Complete', description: 'Code implementation done' },
    { label: 'Testing Complete', description: 'Quality assurance finished' },
    { label: 'Beta Release', description: 'Pre-production release' },
    { label: 'Go Live', description: 'Production deployment' }
  ],
  risk: [
    { label: 'Technical Risk', description: 'Technology-related challenges' },
    { label: 'Schedule Risk', description: 'Timeline-related concerns' },
    { label: 'Resource Risk', description: 'Availability challenges' },
    { label: 'Quality Risk', description: 'Performance or reliability issues' },
    { label: 'External Risk', description: 'Third-party dependencies' },
    { label: 'Business Risk', description: 'Market or financial concerns' }
  ]
};

// Simple node component
const SimpleNode = ({ data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data.label);

  const handleSave = () => {
    if (editText.trim()) {
      data.onUpdateNode && data.onUpdateNode(data.id, editText.trim());
      setIsEditing(false);
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      idea: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      goal: 'bg-gradient-to-r from-blue-500 to-indigo-600',
      task: 'bg-gradient-to-r from-green-500 to-emerald-600',
      process: 'bg-gradient-to-r from-purple-500 to-violet-600',
      person: 'bg-gradient-to-r from-pink-500 to-rose-600',
      resource: 'bg-gradient-to-r from-cyan-500 to-blue-600',
      milestone: 'bg-gradient-to-r from-amber-500 to-yellow-600',
      risk: 'bg-gradient-to-r from-red-500 to-pink-600'
    };
    return colors[category] || 'bg-gradient-to-r from-gray-400 to-gray-600';
  };

  return (
    <div className={`relative px-4 py-3 rounded-lg border-2 shadow-md min-w-[140px] text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105 ${getCategoryColor(data.category)} text-white ${selected ? 'ring-4 ring-blue-300 ring-opacity-75' : 'border-white'}`}>
      {/* ReactFlow Handles for connections */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#ffffff',
          border: '2px solid #374151',
          width: '10px',
          height: '10px',
          left: '-5px',
        }}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#ffffff',
          border: '2px solid #374151',
          width: '10px',
          height: '10px',
          right: '-5px',
        }}
      />
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: '#ffffff',
          border: '2px solid #374151',
          width: '10px',
          height: '10px',
          top: '-5px',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: '#ffffff',
          border: '2px solid #374151',
          width: '10px',
          height: '10px',
          bottom: '-5px',
        }}
      />
      
      {isEditing ? (
        <input
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSave();
            if (e.key === 'Escape') { setEditText(data.label); setIsEditing(false); }
          }}
          className="bg-transparent border-none outline-none text-center w-full text-white placeholder-white placeholder-opacity-70"
          autoFocus
        />
      ) : (
        <div onDoubleClick={() => setIsEditing(true)} className="cursor-pointer relative z-10">
          <div className="font-medium">{data.label}</div>
          {data.description && (
            <div className="text-xs mt-1 opacity-80">{data.description}</div>
          )}
        </div>
      )}
    </div>
  );
};

const nodeTypes = {
  custom: SimpleNode,
};

const MindMapFixed = ({ topic = "Project Planning", onSave }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [nodeCounter, setNodeCounter] = useState(1);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [connectionMode, setConnectionMode] = useState(false);
  const [selectedNodes, setSelectedNodes] = useState([]);
  const [isConnecting, setIsConnecting] = useState(false);

  const { fitView } = useReactFlow();

  // Categories definition
  const categories = [
    { id: 'idea', label: 'Ideas', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'goal', label: 'Goals', icon: Target, color: 'bg-blue-500' },
    { id: 'task', label: 'Tasks', icon: Code, color: 'bg-green-500' },
    { id: 'process', label: 'Process', icon: RefreshCw, color: 'bg-purple-500' },
    { id: 'person', label: 'People', icon: Users, color: 'bg-pink-500' },
    { id: 'resource', label: 'Resources', icon: Save, color: 'bg-cyan-500' },
    { id: 'milestone', label: 'Milestones', icon: Zap, color: 'bg-amber-500' },
    { id: 'risk', label: 'Risks', icon: Eye, color: 'bg-red-500' }
  ];

  // Initialize with root node
  useEffect(() => {
    if (nodes.length === 0) {
      const rootNode = {
        id: 'root',
        type: 'custom',
        position: { x: 400, y: 300 },
        data: {
          id: 'root',
          label: topic,
          category: 'goal',
          onUpdateNode: handleUpdateNode,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
      
      // Add a test node to demonstrate connections
      const testNode = {
        id: 'test-1',
        type: 'custom',
        position: { x: 600, y: 200 },
        data: {
          id: 'test-1',
          label: 'Test Connection',
          category: 'idea',
          onUpdateNode: handleUpdateNode,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
      
      setNodes([rootNode, testNode]);
      
      // Add a test edge to demonstrate connections
      const testEdge = {
        id: 'test-edge',
        source: 'root',
        target: 'test-1',
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: '#ef4444',
          strokeWidth: 4,
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: '#ef4444',
          width: 20,
          height: 20,
        },
        label: 'Test Connection',
        labelStyle: { 
          fontSize: 12, 
          fontWeight: 'bold',
          fill: '#ef4444',
        },
        labelBgStyle: { 
          fill: 'white', 
          fillOpacity: 0.9,
        },
      };
      
      setEdges([testEdge]);
    }
  }, [topic, handleUpdateNode, setNodes, setEdges]);

  const handleUpdateNode = useCallback((nodeId, newLabel) => {
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  }, [setNodes]);

  // Add node from template
  const handleAddTemplateNode = useCallback((template, category) => {
    const newNodeId = `node-${nodeCounter}`;
    setNodeCounter(prev => prev + 1);

    // Position new nodes in a circle around center
    const centerX = 400;
    const centerY = 300;
    const radius = 200;
    const existingNodes = nodes.filter(n => n.data.category === category);
    const angle = (existingNodes.length * 60) * (Math.PI / 180);
    const newX = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
    const newY = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100;

    const newNode = {
      id: newNodeId,
      type: 'custom',
      position: { x: newX, y: newY },
      data: {
        id: newNodeId,
        label: template.label,
        description: template.description,
        category: category,
        onUpdateNode: handleUpdateNode,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    setNodes((nds) => [...nds, newNode]);
    setOpenDropdown(null);
  }, [nodes, nodeCounter, handleUpdateNode, setNodes]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest('.dropdown-container')) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDropdown]);

  const onConnect = useCallback(
    (params) => {
      const sourceNode = nodes.find(n => n.id === params.source);
      const targetNode = nodes.find(n => n.id === params.target);
      
      // Create styled edge based on categories
      const newEdge = {
        ...params,
        id: `edge-${params.source}-${params.target}`,
        type: 'smoothstep',
        animated: true,
        style: {
          stroke: getEdgeColor(sourceNode?.data.category, targetNode?.data.category),
          strokeWidth: 3,
          strokeDasharray: '0',
        },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: getEdgeColor(sourceNode?.data.category, targetNode?.data.category),
          width: 20,
          height: 20,
        },
        label: getConnectionLabel(sourceNode?.data.category, targetNode?.data.category),
        labelStyle: { 
          fontSize: 10, 
          fontWeight: 'bold',
          fill: '#374151',
        },
        labelBgStyle: { 
          fill: 'white', 
          fillOpacity: 0.9,
          rx: 3,
          ry: 3,
        },
      };
      
      console.log('Creating edge:', newEdge); // Debug log
      setEdges((eds) => addEdge(newEdge, eds));
      setIsConnecting(false);
    },
    [setEdges, nodes]
  );

  // Get edge color based on node categories
  const getEdgeColor = (sourceCategory, targetCategory) => {
    const categoryColors = {
      idea: '#f59e0b',
      goal: '#3b82f6',
      task: '#10b981',
      process: '#8b5cf6',
      person: '#ec4899',
      resource: '#06b6d4',
      milestone: '#f59e0b',
      risk: '#ef4444'
    };
    
    // Return source category color, or default if not found
    return categoryColors[sourceCategory] || '#6b7280';
  };

  // Get connection label based on relationship
  const getConnectionLabel = (sourceCategory, targetCategory) => {
    const relationships = {
      'idea-goal': 'supports',
      'goal-task': 'requires',
      'task-person': 'assigned to',
      'task-resource': 'uses',
      'process-milestone': 'leads to',
      'risk-task': 'affects',
      'person-resource': 'manages',
      'goal-milestone': 'achieves'
    };
    
    const key = `${sourceCategory}-${targetCategory}`;
    return relationships[key] || '';
  };

  // Manual connection mode
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
      }
    }
  }, [connectionMode, selectedNodes, onConnect]);

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

  // Get node count per category
  const getCategoryStats = () => {
    const stats = {};
    categories.forEach(cat => {
      stats[cat.id] = nodes.filter(n => n.data.category === cat.id).length;
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  return (
    <div className="w-full h-[700px] border rounded-lg bg-gray-50">
      {/* Controls */}
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white flex flex-wrap gap-4 items-center">
        {/* Connection Tools */}
        <div className="flex gap-2 items-center border-r border-gray-300 pr-4">
          <span className="text-sm font-medium text-gray-700">Connections:</span>
          <button
            onClick={() => {
              setConnectionMode(!connectionMode);
              setSelectedNodes([]);
              setIsConnecting(false);
            }}
            className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
              connectionMode
                ? 'bg-blue-500 text-white border-transparent shadow-md'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
            title={connectionMode ? 'Exit connection mode' : 'Enter connection mode - click two nodes to connect them'}
          >
            <Link size={12} />
            {connectionMode ? 'Exit Connect' : 'Connect Nodes'}
          </button>
          
          {edges.length > 0 && (
            <>
              <button
                onClick={deleteSelectedEdges}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border bg-orange-50 text-orange-600 border-orange-300 hover:bg-orange-100 transition-all duration-200"
                title="Delete selected connections (select edges first)"
              >
                <Trash2 size={12} />
                Delete Selected
              </button>
              
              <button
                onClick={clearAllConnections}
                className="flex items-center gap-1 text-xs px-3 py-1 rounded-full border bg-red-50 text-red-600 border-red-300 hover:bg-red-100 transition-all duration-200"
                title="Remove all connections"
              >
                <Unlink size={12} />
                Clear All
              </button>
            </>
          )}
          
          {connectionMode && isConnecting && (
            <div className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
              Click target node to connect
            </div>
          )}
        </div>

        {/* Category Filters with Node Menus */}
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Categories:</span>
          {categories.map(category => {
            const Icon = category.icon;
            const isOpen = openDropdown === category.id;
            const count = categoryStats[category.id] || 0;
            const templates = nodeTemplates[category.id] || [];
            
            return (
              <div key={category.id} className="relative dropdown-container">
                <button
                  onClick={() => setOpenDropdown(isOpen ? null : category.id)}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
                    isOpen
                      ? `${category.color} text-white border-transparent shadow-md scale-105`
                      : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50 hover:border-gray-400'
                  }`}
                  title={`Click to see ${category.label} node templates (${count} in map)`}
                >
                  <Icon size={12} />
                  {category.label}
                  <ChevronDown size={10} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  {count > 0 && (
                    <span className={`ml-1 px-1.5 py-0.5 rounded-full text-[10px] font-medium ${
                      isOpen ? 'bg-white bg-opacity-30' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute z-50 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 left-0">
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{category.label} Templates</span>
                      </div>
                      <span className="text-xs text-gray-500">Click any template to add to mind map</span>
                    </div>
                    
                    <div className="max-h-64 overflow-y-auto">
                      {templates.map((template, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddTemplateNode(template, category.id)}
                          className="w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0"
                        >
                          <div className="flex items-start gap-2">
                            <Icon size={14} className="mt-1 text-gray-400" />
                            <div className="flex-1">
                              <div className="text-sm font-medium text-gray-800">{template.label}</div>
                              <div className="text-xs text-gray-500 mt-1">{template.description}</div>
                            </div>
                            <Plus size={12} className="text-green-500 mt-1" />
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Mind Map Canvas */}
      <div className="h-[calc(100%-80px)] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          connectionMode={ConnectionMode.Loose}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          defaultEdgeOptions={{
            type: 'smoothstep',
            animated: true,
            style: { 
              strokeWidth: 3,
              stroke: '#3b82f6',
            },
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: '#3b82f6',
              width: 20,
              height: 20,
            },
          }}
          nodesDraggable={!connectionMode}
          nodesConnectable={true}
          elementsSelectable={true}
          selectNodesOnDrag={false}
        >
          <Controls />
          <MiniMap />
          <Background color="#aaa" gap={16} />
        </ReactFlow>
        
        {/* Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 border-t px-4 py-2 flex justify-between items-center text-xs">
          <div className="flex items-center gap-4">
            <span>💡 Tips: {connectionMode ? 'Click two nodes to connect them' : 'Double-click nodes to edit • Drag to connect • Use connection tools above'}</span>
          </div>
          <div className="flex items-center gap-4">
            <span>Nodes: {nodes.length}</span>
            <span>Connections: {edges.length}</span>
            {connectionMode && (
              <span className="text-blue-600 font-medium">Connection Mode Active</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with ReactFlowProvider
const MindMapWrapper = (props) => {
  return (
    <ReactFlowProvider>
      <MindMapFixed {...props} />
    </ReactFlowProvider>
  );
};

export default MindMapWrapper;