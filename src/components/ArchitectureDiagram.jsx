import React, { useCallback, useState, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { 
  Database, 
  Server, 
  Globe, 
  Shield, 
  Cloud, 
  Smartphone, 
  Monitor,
  Code,
  Package,
  GitBranch,
  BarChart3,
  Settings
} from 'lucide-react';
import FlowInfoPanel from './FlowInfoPanel';

// Custom node component for architecture elements
const ArchitectureNode = ({ data, isConnectable }) => {
  const getIcon = () => {
    const iconProps = { size: 24, className: "text-white" };
    switch (data.type) {
      case 'frontend':
        return <Monitor {...iconProps} />;
      case 'mobile':
        return <Smartphone {...iconProps} />;
      case 'api':
        return <Server {...iconProps} />;
      case 'database':
        return <Database {...iconProps} />;
      case 'cache':
        return <Package {...iconProps} />;
      case 'auth':
        return <Shield {...iconProps} />;
      case 'cdn':
        return <Globe {...iconProps} />;
      case 'cloud':
        return <Cloud {...iconProps} />;
      case 'analytics':
        return <BarChart3 {...iconProps} />;
      case 'service':
        return <Code {...iconProps} />;
      case 'load_balancer':
        return <GitBranch {...iconProps} />;
      default:
        return <Settings {...iconProps} />;
    }
  };

  const getNodeColor = () => {
    switch (data.category) {
      case 'frontend':
        return 'bg-blue-500';
      case 'backend':
        return 'bg-green-500';
      case 'database':
        return 'bg-purple-500';
      case 'infrastructure':
        return 'bg-orange-500';
      case 'security':
        return 'bg-red-500';
      case 'external':
        return 'bg-gray-500';
      default:
        return 'bg-indigo-500';
    }
  };

  return (
    <div>
      <Handle type="target" position={Position.Left} />
      <div className={`${getNodeColor()} rounded-lg p-4 shadow-lg min-w-[140px] border-2 border-white`}>
        <div className="flex flex-col items-center text-center">
          <div className="mb-2">
            {getIcon()}
          </div>
          <div className="text-white font-semibold text-sm mb-1">
            {data.label}
          </div>
          {data.description && (
            <div className="text-white text-xs opacity-90">
              {data.description}
            </div>
          )}
          {data.tech && (
            <div className="text-white text-xs mt-1 bg-black bg-opacity-20 px-2 py-1 rounded">
              {data.tech}
            </div>
          )}
        </div>
      </div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
};

const nodeTypes = {
  architecture: ArchitectureNode,
};

const ArchitectureDiagram = ({ 
  architectureType = 'web_app', 
  customNodes = null, 
  customEdges = null,
  onNodeClick = null 
}) => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showLabels, setShowLabels] = useState(true);
  const [showInfoPanel, setShowInfoPanel] = useState(false);

  // Predefined architecture templates
  const architectureTemplates = {
    web_app: {
      nodes: [
        {
          id: 'user',
          type: 'architecture',
          position: { x: 50, y: 50 },
          data: { label: 'User', type: 'frontend', category: 'frontend', description: 'Web Browser' }
        },
        {
          id: 'cdn',
          type: 'architecture',
          position: { x: 300, y: 50 },
          data: { label: 'CDN', type: 'cdn', category: 'infrastructure', description: 'Content Delivery', tech: 'CloudFlare' }
        },
        {
          id: 'load_balancer',
          type: 'architecture',
          position: { x: 550, y: 50 },
          data: { label: 'Load Balancer', type: 'load_balancer', category: 'infrastructure', description: 'Traffic Distribution', tech: 'NGINX' }
        },
        {
          id: 'frontend',
          type: 'architecture',
          position: { x: 300, y: 200 },
          data: { label: 'Frontend', type: 'frontend', category: 'frontend', description: 'React App', tech: 'React/Vite' }
        },
        {
          id: 'api_gateway',
          type: 'architecture',
          position: { x: 550, y: 200 },
          data: { label: 'API Gateway', type: 'api', category: 'backend', description: 'Request Router', tech: 'Express.js' }
        },
        {
          id: 'auth_service',
          type: 'architecture',
          position: { x: 800, y: 150 },
          data: { label: 'Auth Service', type: 'auth', category: 'security', description: 'Authentication', tech: 'JWT/OAuth' }
        },
        {
          id: 'api_server',
          type: 'architecture',
          position: { x: 550, y: 350 },
          data: { label: 'API Server', type: 'service', category: 'backend', description: 'Business Logic', tech: 'Node.js' }
        },
        {
          id: 'cache',
          type: 'architecture',
          position: { x: 300, y: 350 },
          data: { label: 'Cache', type: 'cache', category: 'database', description: 'Fast Storage', tech: 'Redis' }
        },
        {
          id: 'database',
          type: 'architecture',
          position: { x: 800, y: 350 },
          data: { label: 'Database', type: 'database', category: 'database', description: 'Data Storage', tech: 'PostgreSQL' }
        },
        {
          id: 'analytics',
          type: 'architecture',
          position: { x: 1050, y: 250 },
          data: { label: 'Analytics', type: 'analytics', category: 'external', description: 'User Tracking', tech: 'Google Analytics' }
        },
        {
          id: 'message_queue',
          type: 'architecture',
          position: { x: 800, y: 500 },
          data: { label: 'Message Queue', type: 'service', category: 'infrastructure', description: 'Async Processing', tech: 'RabbitMQ' }
        },
        {
          id: 'file_storage',
          type: 'architecture',
          position: { x: 1050, y: 400 },
          data: { label: 'File Storage', type: 'cloud', category: 'infrastructure', description: 'Object Storage', tech: 'AWS S3' }
        }
      ],
      edges: [
        { 
          id: 'e1', 
          source: 'user', 
          target: 'cdn', 
          type: 'smoothstep', 
          animated: true,
          label: 'HTTP Request',
          style: { stroke: '#3b82f6', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e2', 
          source: 'cdn', 
          target: 'load_balancer', 
          type: 'smoothstep',
          label: 'Route Traffic',
          style: { stroke: '#10b981', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e3', 
          source: 'load_balancer', 
          target: 'frontend', 
          type: 'smoothstep',
          label: 'Serve Static',
          style: { stroke: '#8b5cf6', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e4', 
          source: 'frontend', 
          target: 'api_gateway', 
          type: 'smoothstep', 
          animated: true,
          label: 'API Calls',
          style: { stroke: '#ef4444', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e5', 
          source: 'api_gateway', 
          target: 'auth_service', 
          type: 'smoothstep',
          label: 'Validate Token',
          style: { stroke: '#f59e0b', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e6', 
          source: 'api_gateway', 
          target: 'api_server', 
          type: 'smoothstep', 
          animated: true,
          label: 'Business Logic',
          style: { stroke: '#06b6d4', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e7', 
          source: 'api_server', 
          target: 'cache', 
          type: 'smoothstep',
          label: 'Cache Check',
          style: { stroke: '#84cc16', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e8', 
          source: 'api_server', 
          target: 'database', 
          type: 'smoothstep', 
          animated: true,
          label: 'Data Query',
          style: { stroke: '#ec4899', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e9', 
          source: 'api_server', 
          target: 'analytics', 
          type: 'smoothstep',
          label: 'Track Events',
          style: { stroke: '#6366f1', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e10', 
          source: 'api_server', 
          target: 'message_queue', 
          type: 'smoothstep',
          label: 'Async Tasks',
          style: { stroke: '#f97316', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e11', 
          source: 'message_queue', 
          target: 'file_storage', 
          type: 'smoothstep',
          label: 'File Processing',
          style: { stroke: '#14b8a6', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e12', 
          source: 'cache', 
          target: 'database', 
          type: 'smoothstep',
          label: 'Cache Miss',
          style: { stroke: '#64748b', strokeWidth: 1, strokeDasharray: '5,5' },
          markerEnd: { type: 'arrowclosed' }
        }
      ]
    },
    microservices: {
      nodes: [
        {
          id: 'client',
          type: 'architecture',
          position: { x: 400, y: 20 },
          data: { label: 'Client App', type: 'frontend', category: 'frontend', description: 'Web/Mobile Client' }
        },
        {
          id: 'gateway',
          type: 'architecture',
          position: { x: 400, y: 120 },
          data: { label: 'API Gateway', type: 'api', category: 'infrastructure', description: 'Service Router', tech: 'Kong/Zuul' }
        },
        {
          id: 'user_service',
          type: 'architecture',
          position: { x: 200, y: 250 },
          data: { label: 'User Service', type: 'service', category: 'backend', description: 'User Management', tech: 'Node.js' }
        },
        {
          id: 'order_service',
          type: 'architecture',
          position: { x: 400, y: 250 },
          data: { label: 'Order Service', type: 'service', category: 'backend', description: 'Order Processing', tech: 'Java' }
        },
        {
          id: 'payment_service',
          type: 'architecture',
          position: { x: 600, y: 250 },
          data: { label: 'Payment Service', type: 'service', category: 'backend', description: 'Payment Processing', tech: 'Python' }
        },
        {
          id: 'notification_service',
          type: 'architecture',
          position: { x: 800, y: 250 },
          data: { label: 'Notification Service', type: 'service', category: 'backend', description: 'Messaging', tech: 'Node.js' }
        },
        {
          id: 'user_db',
          type: 'architecture',
          position: { x: 200, y: 380 },
          data: { label: 'User DB', type: 'database', category: 'database', description: 'User Data', tech: 'PostgreSQL' }
        },
        {
          id: 'order_db',
          type: 'architecture',
          position: { x: 400, y: 380 },
          data: { label: 'Order DB', type: 'database', category: 'database', description: 'Order Data', tech: 'MongoDB' }
        },
        {
          id: 'payment_db',
          type: 'architecture',
          position: { x: 600, y: 380 },
          data: { label: 'Payment DB', type: 'database', category: 'database', description: 'Payment Data', tech: 'PostgreSQL' }
        },
        {
          id: 'message_bus',
          type: 'architecture',
          position: { x: 500, y: 320 },
          data: { label: 'Message Bus', type: 'service', category: 'infrastructure', description: 'Event Streaming', tech: 'Kafka' }
        }
      ],
      edges: [
        { 
          id: 'e1', 
          source: 'client', 
          target: 'gateway', 
          type: 'smoothstep',
          animated: true,
          label: 'API Requests',
          style: { stroke: '#3b82f6', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e2', 
          source: 'gateway', 
          target: 'user_service', 
          type: 'smoothstep',
          label: 'User Ops',
          style: { stroke: '#10b981', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e3', 
          source: 'gateway', 
          target: 'order_service', 
          type: 'smoothstep',
          animated: true,
          label: 'Order Ops',
          style: { stroke: '#ef4444', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e4', 
          source: 'gateway', 
          target: 'payment_service', 
          type: 'smoothstep',
          label: 'Payment Ops',
          style: { stroke: '#f59e0b', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e5', 
          source: 'user_service', 
          target: 'user_db', 
          type: 'smoothstep',
          label: 'User Data',
          style: { stroke: '#8b5cf6', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e6', 
          source: 'order_service', 
          target: 'order_db', 
          type: 'smoothstep',
          animated: true,
          label: 'Order Data',
          style: { stroke: '#06b6d4', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e7', 
          source: 'payment_service', 
          target: 'payment_db', 
          type: 'smoothstep',
          label: 'Payment Data',
          style: { stroke: '#84cc16', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e8', 
          source: 'order_service', 
          target: 'payment_service', 
          type: 'smoothstep',
          animated: true,
          label: 'Process Payment',
          style: { stroke: '#ec4899', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e9', 
          source: 'order_service', 
          target: 'message_bus', 
          type: 'smoothstep',
          label: 'Order Events',
          style: { stroke: '#6366f1', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e10', 
          source: 'payment_service', 
          target: 'message_bus', 
          type: 'smoothstep',
          label: 'Payment Events',
          style: { stroke: '#f97316', strokeWidth: 2 },
          markerEnd: { type: 'arrowclosed' }
        },
        { 
          id: 'e11', 
          source: 'message_bus', 
          target: 'notification_service', 
          type: 'smoothstep',
          animated: true,
          label: 'Notify Users',
          style: { stroke: '#14b8a6', strokeWidth: 3 },
          markerEnd: { type: 'arrowclosed' }
        }
      ]
    }
  };

  // Use custom nodes/edges if provided, otherwise use template
  const { initialNodes, initialEdges } = useMemo(() => {
    if (customNodes && customEdges) {
      return { initialNodes: customNodes, initialEdges: customEdges };
    }
    
    const template = architectureTemplates[architectureType] || architectureTemplates.web_app;
    return { initialNodes: template.nodes, initialEdges: template.edges };
  }, [architectureType, customNodes, customEdges]);

  // Filter nodes by category
  const filteredNodes = useMemo(() => {
    if (selectedCategory === 'all') {
      return initialNodes;
    }
    return initialNodes.filter(node => node.data.category === selectedCategory);
  }, [initialNodes, selectedCategory]);

  // Filter edges to only show connections between visible nodes
  const filteredEdges = useMemo(() => {
    const visibleNodeIds = new Set(filteredNodes.map(node => node.id));
    return initialEdges.filter(edge => 
      visibleNodeIds.has(edge.source) && visibleNodeIds.has(edge.target)
    ).map(edge => ({
      ...edge,
      label: showLabels ? edge.label : undefined,
      labelStyle: showLabels ? { fontSize: 10, fontWeight: 500 } : undefined,
      labelBgStyle: showLabels ? { fill: '#ffffff', fillOpacity: 0.9 } : undefined,
      labelBgPadding: showLabels ? [4, 2] : undefined,
      labelBgBorderRadius: showLabels ? 3 : undefined
    }));
  }, [initialEdges, filteredNodes, showLabels]);

  React.useEffect(() => {
    setNodes(filteredNodes);
    setEdges(filteredEdges);
  }, [filteredNodes, filteredEdges, setNodes, setEdges]);

  const onConnect = useCallback((params) => {
    const newEdge = {
      ...params,
      type: 'smoothstep',
      style: { stroke: '#94a3b8', strokeWidth: 2 },
      markerEnd: { type: 'arrowclosed' },
      label: 'Custom Connection'
    };
    setEdges((eds) => addEdge(newEdge, eds));
  }, [setEdges]);

  const flowLegend = [
    { color: '#3b82f6', label: 'Primary User Flow', animated: true, width: 3 },
    { color: '#ef4444', label: 'Critical Operations', animated: true, width: 3 },
    { color: '#06b6d4', label: 'Business Logic', animated: true, width: 3 },
    { color: '#10b981', label: 'Standard Requests', animated: false, width: 2 },
    { color: '#f59e0b', label: 'Authentication/Security', animated: false, width: 2 },
    { color: '#64748b', label: 'Fallback/Optional', animated: false, width: 1, dashed: true }
  ];

  const categories = [
    { id: 'all', label: 'All Components', color: 'bg-gray-500' },
    { id: 'frontend', label: 'Frontend', color: 'bg-blue-500' },
    { id: 'backend', label: 'Backend', color: 'bg-green-500' },
    { id: 'database', label: 'Database', color: 'bg-purple-500' },
    { id: 'infrastructure', label: 'Infrastructure', color: 'bg-orange-500' },
    { id: 'security', label: 'Security', color: 'bg-red-500' },
    { id: 'external', label: 'External', color: 'bg-gray-500' }
  ];

  const architectureTypes = [
    { id: 'web_app', label: 'Web Application' },
    { id: 'microservices', label: 'Microservices' }
  ];

  return (
    <div className="w-full h-[700px] border rounded-lg bg-gray-50">
      {/* Controls */}
      <div className="p-4 border-b bg-white">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Architecture:</span>
            <select 
              value={architectureType} 
              onChange={(e) => window.location.reload()} // Simple reload for demo
              className="text-sm border border-gray-300 rounded px-2 py-1"
            >
              {architectureTypes.map(type => (
                <option key={type.id} value={type.id}>{type.label}</option>
              ))}
            </select>
          </div>
          
          <div className="flex gap-2 items-center">
            <span className="text-sm font-medium text-gray-700">Filter:</span>
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`text-xs px-3 py-1 rounded-full border ${
                  selectedCategory === category.id
                    ? `${category.color} text-white border-transparent`
                    : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Flow Legend */}
        <div className="border-t pt-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Control Flow Legend:</span>
              <div className="flex flex-wrap gap-4">
                {flowLegend.map((flow, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex items-center">
                      <div 
                        className="h-0.5 w-6 relative"
                        style={{ 
                          backgroundColor: flow.color,
                          height: `${flow.width}px`,
                          borderStyle: flow.dashed ? 'dashed' : 'solid',
                          borderWidth: flow.dashed ? '1px' : '0'
                        }}
                      >
                        {flow.animated && (
                          <div 
                            className="absolute right-0 top-1/2 transform -translate-y-1/2"
                            style={{ 
                              width: 0, 
                              height: 0, 
                              borderLeft: `4px solid ${flow.color}`,
                              borderTop: '2px solid transparent',
                              borderBottom: '2px solid transparent'
                            }}
                          />
                        )}
                      </div>
                    </div>
                    <span className="text-xs text-gray-600">{flow.label}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">Labels:</span>
              <button
                onClick={() => setShowLabels(!showLabels)}
                className={`text-xs px-3 py-1 rounded border ${
                  showLabels
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-gray-50 border-gray-300 text-gray-600'
                }`}
              >
                {showLabels ? 'Hide' : 'Show'}
              </button>
              <button
                onClick={() => setShowInfoPanel(!showInfoPanel)}
                className="text-xs px-3 py-1 rounded border bg-green-50 border-green-300 text-green-700 hover:bg-green-100"
              >
                Flow Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagram */}
      <div className="h-[calc(100%-140px)] relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          nodeTypes={nodeTypes}
          onNodeClick={onNodeClick}
          fitView
          attributionPosition="bottom-left"
        >
          <Controls />
          <MiniMap 
            nodeColor={(node) => {
              switch (node.data.category) {
                case 'frontend': return '#3b82f6';
                case 'backend': return '#10b981';
                case 'database': return '#8b5cf6';
                case 'infrastructure': return '#f97316';
                case 'security': return '#ef4444';
                default: return '#6b7280';
              }
            }}
          />
          <Background variant="dots" gap={12} size={1} />
        </ReactFlow>
        
        {/* Flow Info Panel */}
        {showInfoPanel && (
          <FlowInfoPanel onClose={() => setShowInfoPanel(false)} />
        )}
      </div>
    </div>
  );
};

export default ArchitectureDiagram;