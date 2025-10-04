import React, { useCallback, useState, useRef, useEffect, useMemo } from 'react';
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
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Plus, Edit3, Trash2, Lightbulb, Target, Users, Code, Save, Download, Upload, RefreshCw, Zap, Eye, EyeOff, ChevronDown } from 'lucide-react';

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

// Custom node component for mind map
const MindMapNode = ({ data, isConnectable, id, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(data.label);
  const [showTooltip, setShowTooltip] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  const handleSave = () => {
    if (editText.trim()) {
      data.onUpdateNode(id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSave();
    } else if (e.key === 'Escape') {
      setEditText(data.label);
      setIsEditing(false);
    }
  };

  const getNodeStyle = () => {
    const baseStyle = "relative px-4 py-3 rounded-lg border-2 shadow-md min-w-[140px] text-center transition-all duration-300 hover:shadow-xl transform hover:scale-105";
    const selectedStyle = selected ? "ring-2 ring-blue-400 ring-offset-2" : "";
    
    switch (data.type) {
      case 'root':
        return `${baseStyle} ${selectedStyle} bg-gradient-to-br from-indigo-100 to-indigo-200 border-indigo-500 text-indigo-900 font-bold text-lg`;
      case 'main':
        return `${baseStyle} ${selectedStyle} bg-gradient-to-br from-blue-100 to-blue-200 border-blue-500 text-blue-900 font-semibold`;
      case 'sub':
        return `${baseStyle} ${selectedStyle} bg-gradient-to-br from-green-100 to-green-200 border-green-500 text-green-900`;
      case 'detail':
        return `${baseStyle} ${selectedStyle} bg-gradient-to-br from-yellow-100 to-yellow-200 border-yellow-500 text-yellow-900 text-sm`;
      default:
        return `${baseStyle} ${selectedStyle} bg-gradient-to-br from-gray-100 to-gray-200 border-gray-500 text-gray-900`;
    }
  };

  const getCategoryColor = () => {
    switch (data.category) {
      case 'idea': return 'text-yellow-600';
      case 'goal': return 'text-red-600';
      case 'team': return 'text-blue-600';
      case 'tech': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const getIcon = () => {
    const iconProps = { size: 16, className: `inline mr-2 ${getCategoryColor()}` };
    switch (data.category) {
      case 'idea':
        return <Lightbulb {...iconProps} />;
      case 'goal':
        return <Target {...iconProps} />;
      case 'team':
        return <Users {...iconProps} />;
      case 'tech':
        return <Code {...iconProps} />;
      default:
        return null;
    }
  };

  return (
    <div 
      className={getNodeStyle()}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && !isEditing && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
          {data.type === 'root' ? 'Root Node' : `${data.category} • ${data.type}`}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}

      <div className="flex items-center justify-between">
        {isEditing ? (
          <input
            ref={inputRef}
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSave}
            onKeyDown={handleKeyPress}
            className="bg-transparent border-none outline-none text-center w-full font-inherit"
            placeholder="Enter text..."
          />
        ) : (
          <div 
            className="flex-1 cursor-pointer flex items-center justify-center"
            onDoubleClick={() => setIsEditing(true)}
            title="Double-click to edit"
          >
            {getIcon()}
            <span className="break-words">{data.label}</span>
          </div>
        )}
        
        {!isEditing && (
          <div className="flex gap-1 ml-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsEditing(true);
              }}
              className="text-gray-500 hover:text-blue-500 p-1 rounded hover:bg-white hover:bg-opacity-50 transition-colors"
              title="Edit node"
            >
              <Edit3 size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                data.onAddChild && data.onAddChild(id);
              }}
              className="text-gray-500 hover:text-green-500 p-1 rounded hover:bg-white hover:bg-opacity-50 transition-colors"
              title="Add child node"
            >
              <Plus size={12} />
            </button>
            {data.type !== 'root' && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  data.onDeleteNode && data.onDeleteNode(id);
                }}
                className="text-gray-500 hover:text-red-500 p-1 rounded hover:bg-white hover:bg-opacity-50 transition-colors"
                title="Delete node"
              >
                <Trash2 size={12} />
              </button>
            )}
          </div>
        )}
      </div>
      
      {data.description && (
        <div className="text-xs mt-2 opacity-75 italic">
          {data.description}
        </div>
      )}
      
      {/* Connection indicators */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
        <div className="absolute top-1/2 right-0 w-2 h-2 bg-green-400 rounded-full transform translate-x-1/2 -translate-y-1/2 opacity-50"></div>
      </div>
    </div>
  );
};

const nodeTypes = {
  mindMap: MindMapNode,
};

const MindMap = ({ topic = "Project Planning", onSave }) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCategory, setSelectedCategory] = useState('idea');
  const [filterCategory, setFilterCategory] = useState('all');
  const [nodeCounter, setNodeCounter] = useState(1);
  const [isMinimapVisible, setIsMinimapVisible] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [autoLayout, setAutoLayout] = useState(false);
  const [undoStack, setUndoStack] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [dropdownPosition, setDropdownPosition] = useState({ x: 0, y: 0 });
  
  const { fitView, getNode, getEdges } = useReactFlow();

  // Save state for undo/redo
  const saveState = useCallback(() => {
    setUndoStack(prev => [...prev.slice(-9), { nodes, edges }]); // Keep last 10 states
    setRedoStack([]);
  }, [nodes, edges]);

  // Undo function
  const handleUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const lastState = undoStack[undoStack.length - 1];
      setRedoStack(prev => [{ nodes, edges }, ...prev.slice(0, 9)]);
      setUndoStack(prev => prev.slice(0, -1));
      setNodes(lastState.nodes);
      setEdges(lastState.edges);
    }
  }, [undoStack, nodes, edges, setNodes, setEdges]);

  // Redo function
  const handleRedo = useCallback(() => {
    if (redoStack.length > 0) {
      const nextState = redoStack[0];
      setUndoStack(prev => [...prev, { nodes, edges }]);
      setRedoStack(prev => prev.slice(1));
      setNodes(nextState.nodes);
      setEdges(nextState.edges);
    }
  }, [redoStack, nodes, edges, setNodes, setEdges]);

  // Initialize with root node
  useEffect(() => {
    if (nodes.length === 0) {
      const rootNode = {
        id: 'root',
        type: 'mindMap',
        position: { x: 400, y: 300 },
        data: {
          label: topic,
          type: 'root',
          category: 'goal',
          onUpdateNode: handleUpdateNode,
          onAddChild: handleAddChild,
          onDeleteNode: handleDeleteNode,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };
      setNodes([rootNode]);
      saveState();
    }
  }, [topic]);

  // Auto-save to local storage
  useEffect(() => {
    if (nodes.length > 0) {
      const mindMapData = { nodes, edges, topic };
      localStorage.setItem('mindmap-autosave', JSON.stringify(mindMapData));
    }
  }, [nodes, edges, topic]);

  // Auto-layout functionality
  useEffect(() => {
    if (autoLayout) {
      const layoutTimer = setTimeout(() => {
        arrangeNodesInCircle();
      }, 500);
      return () => clearTimeout(layoutTimer);
    }
  }, [nodes.length, autoLayout]);

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

  const handleUpdateNode = useCallback((nodeId, newLabel) => {
    saveState();
    setNodes((nds) =>
      nds.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, label: newLabel } }
          : node
      )
    );
  }, [setNodes, saveState]);

  const handleAddChild = useCallback((parentId) => {
    const parentNode = nodes.find(n => n.id === parentId);
    if (!parentNode) return;

    saveState();
    const newNodeId = `node-${nodeCounter}`;
    setNodeCounter(prev => prev + 1);

    // Improved positioning algorithm
    const childrenCount = edges.filter(e => e.source === parentId).length;
    const angleStep = parentNode.data.type === 'root' ? 90 : 60;
    const angle = (childrenCount * angleStep) - (angleStep / 2);
    const distance = parentNode.data.type === 'root' ? 250 : 180;
    const radian = (angle * Math.PI) / 180;
    
    // Add some randomness to avoid overlapping
    const randomOffset = (Math.random() - 0.5) * 50;
    const newX = parentNode.position.x + Math.cos(radian) * distance + randomOffset;
    const newY = parentNode.position.y + Math.sin(radian) * distance + randomOffset;

    // Smart node type determination
    let nodeType = 'detail';
    if (parentNode.data.type === 'root') nodeType = 'main';
    else if (parentNode.data.type === 'main') nodeType = 'sub';

    const newNode = {
      id: newNodeId,
      type: 'mindMap',
      position: { x: newX, y: newY },
      data: {
        label: `New ${selectedCategory}`,
        type: nodeType,
        category: selectedCategory,
        onUpdateNode: handleUpdateNode,
        onAddChild: handleAddChild,
        onDeleteNode: handleDeleteNode,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    const newEdge = {
      id: `e-${parentId}-${newNodeId}`,
      source: parentId,
      target: newNodeId,
      type: 'smoothstep',
      animated: true,
      style: { 
        stroke: getEdgeColor(selectedCategory), 
        strokeWidth: 2,
      },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: getEdgeColor(selectedCategory),
      },
    };

    setNodes((nds) => [...nds, newNode]);
    setEdges((eds) => [...eds, newEdge]);
  }, [nodes, edges, nodeCounter, selectedCategory, saveState, setNodes, setEdges]);

  // Add node from template
  const handleAddTemplateNode = useCallback((template, category) => {
    saveState();
    const newNodeId = `node-${nodeCounter}`;
    setNodeCounter(prev => prev + 1);

    // Find a good position for the new node
    const centerX = 400;
    const centerY = 300;
    const radius = 200;
    const existingNodes = nodes.filter(n => n.data.category === category);
    const angle = (existingNodes.length * 60) * (Math.PI / 180);
    const newX = centerX + Math.cos(angle) * radius + (Math.random() - 0.5) * 100;
    const newY = centerY + Math.sin(angle) * radius + (Math.random() - 0.5) * 100;

    const newNode = {
      id: newNodeId,
      type: 'mindMap',
      position: { x: newX, y: newY },
      data: {
        label: template.label,
        description: template.description,
        type: 'main',
        category: category,
        onUpdateNode: handleUpdateNode,
        onAddChild: handleAddChild,
        onDeleteNode: handleDeleteNode,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    setNodes((nds) => [...nds, newNode]);
    setOpenDropdown(null); // Close dropdown after adding
  }, [nodes, nodeCounter, saveState, setNodes, handleUpdateNode, handleAddChild, handleDeleteNode]);

  const handleDeleteNode = useCallback((nodeId) => {
    saveState();
    // Get all descendants to delete them too
    const getAllDescendants = (id, allEdges) => {
      const children = allEdges.filter(e => e.source === id);
      let descendants = children.map(e => e.target);
      children.forEach(child => {
        descendants = [...descendants, ...getAllDescendants(child.target, allEdges)];
      });
      return descendants;
    };

    const descendantIds = getAllDescendants(nodeId, edges);
    const nodesToDelete = [nodeId, ...descendantIds];

    setNodes((nds) => nds.filter((node) => !nodesToDelete.includes(node.id)));
    setEdges((eds) => eds.filter((edge) => 
      !nodesToDelete.includes(edge.source) && !nodesToDelete.includes(edge.target)
    ));
  }, [edges, saveState, setNodes, setEdges]);

  // Helper function to get edge color based on category
  const getEdgeColor = (category) => {
    switch (category) {
      case 'idea': return '#eab308';
      case 'goal': return '#ef4444';
      case 'team': return '#3b82f6';
      case 'tech': return '#22c55e';
      default: return '#94a3b8';
    }
  };

  // Auto-arrange nodes in a circle
  const arrangeNodesInCircle = useCallback(() => {
    const rootNode = nodes.find(n => n.id === 'root');
    if (!rootNode) return;

    const mainNodes = nodes.filter(n => n.data.type === 'main');
    const radius = 300;
    const angleStep = (2 * Math.PI) / mainNodes.length;

    const updatedNodes = nodes.map(node => {
      if (node.data.type === 'main') {
        const index = mainNodes.indexOf(node);
        const angle = index * angleStep;
        return {
          ...node,
          position: {
            x: rootNode.position.x + Math.cos(angle) * radius,
            y: rootNode.position.y + Math.sin(angle) * radius,
          },
        };
      }
      return node;
    });

    setNodes(updatedNodes);
  }, [nodes, setNodes]);

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'smoothstep',
      style: { stroke: '#94a3b8', strokeWidth: 2 },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const categories = [
    { id: 'all', label: 'All', icon: Lightbulb, color: 'bg-gray-500' },
    { id: 'idea', label: 'Ideas', icon: Lightbulb, color: 'bg-yellow-500' },
    { id: 'goal', label: 'Goals', icon: Target, color: 'bg-red-500' },
    { id: 'team', label: 'Team', icon: Users, color: 'bg-blue-500' },
    { id: 'tech', label: 'Technology', icon: Code, color: 'bg-green-500' },
  ];

  // Filter nodes based on selected filter category
  const filteredNodes = React.useMemo(() => {
    if (filterCategory === 'all') return nodes;
    return nodes.filter(node => 
      node.id === 'root' || node.data?.category === filterCategory
    );
  }, [nodes, filterCategory]);

  // Filter edges to only show edges between visible nodes
  const filteredEdges = React.useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map(node => node.id));
    return edges.filter(edge => 
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    );
  }, [edges, filteredNodes]);

  // Handle category button clicks - toggle between filtering and setting category for new nodes
  const handleCategoryClick = (categoryId) => {
    if (categoryId === 'all') {
      setFilterCategory('all');
      setSelectedCategory('idea');
    } else {
      // If clicking the same category, toggle filter
      if (filterCategory === categoryId) {
        setFilterCategory('all');
      } else {
        setFilterCategory(categoryId);
      }
      setSelectedCategory(categoryId);
    }
  };

  // Get category statistics
  const getCategoryStats = () => {
    const stats = {};
    categories.forEach(cat => {
      if (cat.id === 'all') {
        stats[cat.id] = nodes.length - 1; // Exclude root node
      } else {
        stats[cat.id] = nodes.filter(node => node.data?.category === cat.id).length;
      }
    });
    return stats;
  };

  const categoryStats = getCategoryStats();

  // Export mind map data
  const exportMindMap = useCallback(() => {
    const data = {
      nodes,
      edges,
      topic,
      metadata: {
        created: new Date().toISOString(),
        nodeCount: nodes.length,
        categories: getCategoryStats(),
      }
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `mindmap-${topic.replace(/\s+/g, '-').toLowerCase()}-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [nodes, edges, topic]);

  // Import mind map data
  const importMindMap = useCallback((event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (data.nodes && data.edges) {
          saveState();
          setNodes(data.nodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              onUpdateNode: handleUpdateNode,
              onAddChild: handleAddChild,
              onDeleteNode: handleDeleteNode,
            }
          })));
          setEdges(data.edges);
          setNodeCounter(data.nodes.length + 1);
          setTimeout(() => fitView(), 100);
        }
      } catch (error) {
        alert('Invalid mind map file format');
      }
    };
    reader.readAsText(file);
    event.target.value = ''; // Reset input
  }, [saveState, setNodes, setEdges, fitView]);

  // Load from local storage
  const loadAutoSave = useCallback(() => {
    const saved = localStorage.getItem('mindmap-autosave');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.nodes && data.edges) {
          setNodes(data.nodes.map(node => ({
            ...node,
            data: {
              ...node.data,
              onUpdateNode: handleUpdateNode,
              onAddChild: handleAddChild,
              onDeleteNode: handleDeleteNode,
            }
          })));
          setEdges(data.edges);
          setNodeCounter(data.nodes.length + 1);
          setTimeout(() => fitView(), 100);
        }
      } catch (error) {
        console.error('Failed to load autosave:', error);
      }
    }
  }, [setNodes, setEdges, fitView]);

  // Enhanced predefined branches with better positioning
  const addPredefinedBranch = useCallback((branchType) => {
    const rootNode = nodes.find(n => n.id === 'root');
    if (!rootNode) return;

    saveState();
    const branches = {
      features: {
        items: ['User Authentication', 'Dashboard UI', 'Data Analytics', 'API Integration', 'Mobile Support'],
        category: 'idea',
        color: '#3b82f6'
      },
      technologies: {
        items: ['Frontend Framework', 'Backend Technology', 'Database System', 'Cloud Platform', 'Development Tools'],
        category: 'tech',
        color: '#22c55e'
      },
      timeline: {
        items: ['Phase 1: Planning', 'Phase 2: Development', 'Phase 3: Testing', 'Phase 4: Deployment', 'Phase 5: Maintenance'],
        category: 'goal',
        color: '#8b5cf6'
      },
      team: {
        items: ['Project Manager', 'Frontend Developer', 'Backend Developer', 'UI/UX Designer', 'QA Engineer'],
        category: 'team',
        color: '#f59e0b'
      }
    };

    const branch = branches[branchType];
    if (!branch) return;

    const startAngle = Object.keys(branches).indexOf(branchType) * 90;
    
    branch.items.forEach((item, index) => {
      const nodeId = `${branchType}-${Date.now()}-${index}`;
      const angle = startAngle + (index * 15) - ((branch.items.length - 1) * 7.5);
      const radian = (angle * Math.PI) / 180;
      const distance = 280;
      
      const newNode = {
        id: nodeId,
        type: 'mindMap',
        position: {
          x: rootNode.position.x + Math.cos(radian) * distance,
          y: rootNode.position.y + Math.sin(radian) * distance
        },
        data: {
          label: item,
          type: 'main',
          category: branch.category,
          onUpdateNode: handleUpdateNode,
          onAddChild: handleAddChild,
          onDeleteNode: handleDeleteNode,
        },
        sourcePosition: Position.Right,
        targetPosition: Position.Left,
      };

      const newEdge = {
        id: `e-root-${nodeId}`,
        source: 'root',
        target: nodeId,
        type: 'smoothstep',
        animated: true,
        style: { stroke: branch.color, strokeWidth: 3 },
        markerEnd: {
          type: MarkerType.ArrowClosed,
          color: branch.color,
        },
      };

      setNodes((nds) => [...nds, newNode]);
      setEdges((eds) => [...eds, newEdge]);
    });

    setNodeCounter(prev => prev + branch.items.length);
  }, [nodes, saveState, setNodes, setEdges, handleUpdateNode, handleAddChild, handleDeleteNode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case 'z':
            e.preventDefault();
            if (e.shiftKey) {
              handleRedo();
            } else {
              handleUndo();
            }
            break;
          case 'y':
            e.preventDefault();
            handleRedo();
            break;
          case 's':
            e.preventDefault();
            exportMindMap();
            break;
          case 'a':
            e.preventDefault();
            const rootNode = nodes.find(n => n.id === 'root');
            if (rootNode) handleAddChild('root');
            break;
          case 'f':
            e.preventDefault();
            fitView();
            break;
        }
      }
      
      // Delete key for selected nodes
      if (e.key === 'Delete' || e.key === 'Backspace') {
        // This would require implementing node selection state
        // For now, we'll leave this as a placeholder for future enhancement
      }
    };

    document.addEventListener('keydown', handleKeyboard);
    return () => document.removeEventListener('keydown', handleKeyboard);
  }, [handleUndo, handleRedo, exportMindMap, nodes, fitView]);

  const clearMindMap = useCallback(() => {
    if (window.confirm('Are you sure you want to clear all nodes? This action cannot be undone.')) {
      saveState();
      const rootNode = nodes.find(n => n.id === 'root');
      if (rootNode) {
        setNodes([rootNode]);
        setEdges([]);
        setNodeCounter(1);
      }
    }
  }, [nodes, saveState, setNodes, setEdges]);

  return (
    <div className="w-full h-[700px] border rounded-lg bg-gray-50">
      {/* Advanced Controls */}
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white flex flex-wrap gap-4 items-center">
        {/* Category Filters with Node Menus */}
        <div className="flex gap-2 items-center">
          <span className="text-sm font-medium text-gray-700">Categories:</span>
          {categories.map(category => {
            const Icon = category.icon;
            const isActive = filterCategory === category.id;
            const isOpen = openDropdown === category.id;
            const count = categoryStats[category.id] || 0;
            const templates = nodeTemplates[category.id] || [];
            
            return (
              <div key={category.id} className="relative dropdown-container">
                <button
                  onClick={(e) => {
                    setOpenDropdown(isOpen ? null : category.id);
                  }}
                  className={`flex items-center gap-1 text-xs px-3 py-1 rounded-full border transition-all duration-200 ${
                    isActive || isOpen
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
                      isActive || isOpen ? 'bg-white bg-opacity-30' : 'bg-gray-200 text-gray-600'
                    }`}>
                      {count}
                    </span>
                  )}
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                  <div 
                    className="absolute z-50 mt-1 w-72 bg-white rounded-lg shadow-xl border border-gray-200 py-2 left-0"
                  >
                    <div className="px-3 py-2 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{category.label} Templates</span>
                        <button
                          onClick={() => handleCategoryClick(category.id)}
                          className="text-xs text-blue-600 hover:text-blue-800"
                        >
                          {isActive ? 'Clear Filter' : 'Filter View'}
                        </button>
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

        {/* Filter Status */}
        {filterCategory !== 'all' && (
          <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-lg border border-blue-200">
            <span className="text-xs text-blue-700 font-medium">
              Filtered: Showing {filteredNodes.length - 1} of {nodes.length - 1} nodes
            </span>
            <button
              onClick={() => setFilterCategory('all')}
              className="text-blue-600 hover:text-blue-800 text-xs"
              title="Clear filter"
            >
              ✕
            </button>
          </div>
        )}

        {/* Quick Add Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => addPredefinedBranch('features')}
            className="text-xs px-3 py-1 bg-blue-50 border border-blue-300 text-blue-700 rounded hover:bg-blue-100 transition-colors"
            title="Add common feature branches to the mind map"
          >
            <Plus size={10} className="inline mr-1" />
            Features
          </button>
          <button
            onClick={() => addPredefinedBranch('technologies')}
            className="text-xs px-3 py-1 bg-green-50 border border-green-300 text-green-700 rounded hover:bg-green-100 transition-colors"
            title="Add technology stack branches to the mind map"
          >
            <Code size={10} className="inline mr-1" />
            Tech Stack
          </button>
          <button
            onClick={() => addPredefinedBranch('timeline')}
            className="text-xs px-3 py-1 bg-purple-50 border border-purple-300 text-purple-700 rounded hover:bg-purple-100 transition-colors"
            title="Add project timeline phases to the mind map"
          >
            <Target size={10} className="inline mr-1" />
            Timeline
          </button>
          <button
            onClick={() => addPredefinedBranch('team')}
            className="text-xs px-3 py-1 bg-orange-50 border border-orange-300 text-orange-700 rounded hover:bg-orange-100 transition-colors"
            title="Add team role branches to the mind map"
          >
            <Users size={10} className="inline mr-1" />
            Team
          </button>
        </div>

        {/* View Controls */}
        <div className="flex gap-2 items-center border-l pl-4">
          <button
            onClick={() => setIsMinimapVisible(!isMinimapVisible)}
            className={`text-xs px-3 py-1 rounded border transition-colors ${
              isMinimapVisible 
                ? 'bg-blue-50 border-blue-300 text-blue-700' 
                : 'bg-gray-50 border-gray-300 text-gray-600'
            }`}
            title="Toggle minimap"
          >
            {isMinimapVisible ? <Eye size={10} /> : <EyeOff size={10} />}
          </button>
          <button
            onClick={() => setAutoLayout(!autoLayout)}
            className={`text-xs px-3 py-1 rounded border transition-colors ${
              autoLayout 
                ? 'bg-purple-50 border-purple-300 text-purple-700' 
                : 'bg-gray-50 border-gray-300 text-gray-600'
            }`}
            title="Toggle auto-layout"
          >
            <Zap size={10} className="inline mr-1" />
            Auto
          </button>
          <button
            onClick={() => fitView()}
            className="text-xs px-3 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors"
            title="Fit view to all nodes"
          >
            <RefreshCw size={10} className="inline mr-1" />
            Fit
          </button>
        </div>

        {/* File Operations */}
        <div className="flex gap-2 items-center border-l pl-4">
          <button
            onClick={exportMindMap}
            className="text-xs px-3 py-1 bg-green-50 border border-green-300 text-green-700 rounded hover:bg-green-100 transition-colors"
            title="Export mind map as JSON"
          >
            <Download size={10} className="inline mr-1" />
            Export
          </button>
          <label className="text-xs px-3 py-1 bg-blue-50 border border-blue-300 text-blue-700 rounded hover:bg-blue-100 transition-colors cursor-pointer">
            <Upload size={10} className="inline mr-1" />
            Import
            <input
              type="file"
              accept=".json"
              onChange={importMindMap}
              className="hidden"
            />
          </label>
          <button
            onClick={loadAutoSave}
            className="text-xs px-3 py-1 bg-yellow-50 border border-yellow-300 text-yellow-700 rounded hover:bg-yellow-100 transition-colors"
            title="Load auto-saved data"
          >
            <RefreshCw size={10} className="inline mr-1" />
            Load
          </button>
        </div>

        {/* Undo/Redo */}
        <div className="flex gap-1 items-center border-l pl-4">
          <button
            onClick={handleUndo}
            disabled={undoStack.length === 0}
            className="text-xs px-2 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Undo (Ctrl+Z)"
          >
            ↶
          </button>
          <button
            onClick={handleRedo}
            disabled={redoStack.length === 0}
            className="text-xs px-2 py-1 bg-gray-50 border border-gray-300 text-gray-600 rounded hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title="Redo (Ctrl+Y)"
          >
            ↷
          </button>
        </div>

        {/* Advanced Actions */}
        <div className="flex gap-2 ml-auto">
          <button
            onClick={clearMindMap}
            className="text-xs px-3 py-1 bg-red-50 border border-red-300 text-red-700 rounded hover:bg-red-100 transition-colors"
            title="Clear all nodes except root"
          >
            <Trash2 size={10} className="inline mr-1" />
            Clear
          </button>
          {onSave && (
            <button
              onClick={() => onSave(nodes, edges)}
              className="text-xs px-3 py-1 bg-indigo-50 border border-indigo-300 text-indigo-700 rounded hover:bg-indigo-100 transition-colors"
              title="Save mind map"
            >
              <Save size={10} className="inline mr-1" />
              Save
            </button>
          )}
        </div>

        {/* Help Text */}
        <div className="w-full flex items-center gap-2 text-xs text-gray-500 mt-2 pt-2 border-t">
          <span>💡 Tips:</span>
          <span>Double-click nodes to edit • Use + to add children • Drag to move • Click categories for node templates</span>
          <div className="ml-auto flex items-center gap-4">
            <span>Nodes: {nodes.length}</span>
            <span>Connections: {edges.length}</span>
          </div>
        </div>
      </div>

      {/* Enhanced Mind Map */}
      <div className="h-[calc(100%-140px)] relative">
        <ReactFlow
          nodes={filteredNodes}
          edges={filteredEdges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          attributionPosition="bottom-left"
          className={isDarkMode ? 'dark' : ''}
          defaultEdgeOptions={{
            style: { strokeWidth: 2 },
            type: 'smoothstep',
            markerEnd: { type: MarkerType.ArrowClosed },
          }}
          connectionLineStyle={{ strokeWidth: 2 }}
          snapToGrid={true}
          snapGrid={[15, 15]}
          onNodeClick={(event, node) => {
            // Handle node selection for potential future features
          }}
          onNodeDragStop={() => {
            // Auto-save position changes
            saveState();
          }}
          proOptions={{ hideAttribution: true }}
        >
          <Controls 
            showZoom={true}
            showFitView={true}
            showInteractive={true}
            position="top-left"
          />
          
          {isMinimapVisible && (
            <MiniMap 
              nodeColor={(node) => {
                switch (node.data.category) {
                  case 'idea': return '#eab308';
                  case 'goal': return '#ef4444';
                  case 'team': return '#3b82f6';
                  case 'tech': return '#22c55e';
                  default: return '#6b7280';
                }
              }}
              position="top-right"
              style={{
                backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb',
              }}
              maskColor={isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)'}
            />
          )}
          
          <Background 
            variant="dots" 
            gap={20} 
            size={1} 
            color={isDarkMode ? '#374151' : '#e5e7eb'}
          />
        </ReactFlow>
        
        {/* Floating Action Button for Quick Add */}
        <div className="absolute bottom-4 right-4 flex flex-col gap-2">
          <button
            onClick={() => {
              const rootNode = nodes.find(n => n.id === 'root');
              if (rootNode) handleAddChild('root');
            }}
            className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center"
            title="Quick add node to root"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {/* Node Count Indicator */}
        <div className="absolute top-4 left-4 bg-white bg-opacity-90 px-3 py-1 rounded-lg shadow-md">
          <span className="text-sm font-medium text-gray-700">
            {nodes.length - 1} nodes • {edges.length} connections
          </span>
        </div>
      </div>
    </div>
  );
};

// Wrapper component with ReactFlowProvider
const MindMapWrapper = (props) => {
  return (
    <ReactFlowProvider>
      <MindMap {...props} />
    </ReactFlowProvider>
  );
};

export default MindMapWrapper;