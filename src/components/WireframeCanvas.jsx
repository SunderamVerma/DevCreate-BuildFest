import React, { useState, useRef, useEffect } from 'react';
import { Square, Circle, Type, Image, Menu, Smartphone, Monitor, Tablet } from 'lucide-react';

const WireframeCanvas = ({ projectType = 'web', onSave }) => {
  const canvasRef = useRef(null);
  const [selectedTool, setSelectedTool] = useState('rectangle');
  const [elements, setElements] = useState([]);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [deviceType, setDeviceType] = useState('desktop');

  const tools = [
    { id: 'rectangle', icon: Square, label: 'Rectangle' },
    { id: 'circle', icon: Circle, label: 'Circle' },
    { id: 'text', icon: Type, label: 'Text' },
    { id: 'image', icon: Image, label: 'Image' },
    { id: 'navbar', icon: Menu, label: 'Navigation' },
  ];

  const devices = [
    { id: 'desktop', icon: Monitor, label: 'Desktop', width: 800, height: 600 },
    { id: 'tablet', icon: Tablet, label: 'Tablet', width: 600, height: 800 },
    { id: 'mobile', icon: Smartphone, label: 'Mobile', width: 375, height: 667 },
  ];

  const getCurrentDevice = () => devices.find(d => d.id === deviceType);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const device = getCurrentDevice();
    
    // Set canvas size
    canvas.width = device.width;
    canvas.height = device.height;
    
    // Clear and redraw
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw device frame
    ctx.strokeStyle = '#e5e7eb';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, canvas.width, canvas.height);

    // Draw elements
    elements.forEach(element => {
      ctx.save();
      drawElement(ctx, element);
      ctx.restore();
    });
  }, [elements, deviceType]);

  const drawElement = (ctx, element) => {
    ctx.strokeStyle = '#6b7280';
    ctx.fillStyle = '#f3f4f6';
    ctx.lineWidth = 2;

    switch (element.type) {
      case 'rectangle':
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.strokeRect(element.x, element.y, element.width, element.height);
        break;
      case 'circle':
        const radius = Math.min(element.width, element.height) / 2;
        const centerX = element.x + element.width / 2;
        const centerY = element.y + element.height / 2;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.stroke();
        break;
      case 'text':
        ctx.font = '16px Arial';
        ctx.fillStyle = '#374151';
        ctx.fillText(element.text || 'Sample Text', element.x, element.y + 20);
        break;
      case 'image':
        ctx.fillStyle = '#e5e7eb';
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.strokeRect(element.x, element.y, element.width, element.height);
        // Draw X to represent image placeholder
        ctx.strokeStyle = '#9ca3af';
        ctx.beginPath();
        ctx.moveTo(element.x, element.y);
        ctx.lineTo(element.x + element.width, element.y + element.height);
        ctx.moveTo(element.x + element.width, element.y);
        ctx.lineTo(element.x, element.y + element.height);
        ctx.stroke();
        break;
      case 'navbar':
        ctx.fillStyle = '#1f2937';
        ctx.fillRect(element.x, element.y, element.width, element.height || 60);
        // Draw menu items
        ctx.fillStyle = '#ffffff';
        ctx.font = '14px Arial';
        const menuItems = ['Home', 'About', 'Services', 'Contact'];
        menuItems.forEach((item, index) => {
          ctx.fillText(item, element.x + 20 + (index * 100), element.y + 35);
        });
        break;
    }
  };

  const getMousePos = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const handleMouseDown = (e) => {
    const pos = getMousePos(e);
    setStartPos(pos);
    setIsDrawing(true);
  };

  const handleMouseUp = (e) => {
    if (!isDrawing) return;
    
    const pos = getMousePos(e);
    const width = Math.abs(pos.x - startPos.x);
    const height = Math.abs(pos.y - startPos.y);
    const x = Math.min(startPos.x, pos.x);
    const y = Math.min(startPos.y, pos.y);

    if (width > 5 && height > 5) { // Minimum size
      const newElement = {
        id: Date.now(),
        type: selectedTool,
        x,
        y,
        width,
        height,
        text: selectedTool === 'text' ? prompt('Enter text:') || 'Sample Text' : undefined
      };

      // Special handling for navbar
      if (selectedTool === 'navbar') {
        newElement.width = getCurrentDevice().width - x;
        newElement.height = 60;
      }

      setElements(prev => [...prev, newElement]);
    }
    
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    setElements([]);
  };

  const addCommonLayouts = () => {
    const device = getCurrentDevice();
    const commonElements = [
      {
        id: Date.now() + 1,
        type: 'navbar',
        x: 0,
        y: 0,
        width: device.width,
        height: 60
      },
      {
        id: Date.now() + 2,
        type: 'rectangle',
        x: 50,
        y: 100,
        width: device.width - 100,
        height: 200
      },
      {
        id: Date.now() + 3,
        type: 'text',
        x: 50,
        y: 320,
        width: 200,
        height: 30,
        text: 'Main Content Area'
      }
    ];
    setElements(prev => [...prev, ...commonElements]);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Toolbar */}
      <div className="flex flex-col gap-4 min-w-[200px]">
        {/* Device Selection */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-gray-700">Device Type</h3>
          <div className="flex flex-wrap gap-2">
            {devices.map(device => {
              const Icon = device.icon;
              return (
                <button
                  key={device.id}
                  onClick={() => setDeviceType(device.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs rounded-md border ${
                    deviceType === device.id
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  {device.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tools */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm text-gray-700">Tools</h3>
          <div className="grid grid-cols-2 gap-2">
            {tools.map(tool => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => setSelectedTool(tool.id)}
                  className={`flex items-center gap-2 px-3 py-2 text-xs rounded-md border ${
                    selectedTool === tool.id
                      ? 'bg-blue-50 border-blue-300 text-blue-700'
                      : 'bg-gray-50 border-gray-300 text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Icon size={14} />
                  {tool.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <button
            onClick={addCommonLayouts}
            className="w-full px-3 py-2 text-xs bg-green-50 border border-green-300 text-green-700 rounded-md hover:bg-green-100"
          >
            Add Common Layout
          </button>
          <button
            onClick={clearCanvas}
            className="w-full px-3 py-2 text-xs bg-red-50 border border-red-300 text-red-700 rounded-md hover:bg-red-100"
          >
            Clear Canvas
          </button>
          {onSave && (
            <button
              onClick={() => onSave(elements, deviceType)}
              className="w-full px-3 py-2 text-xs bg-blue-50 border border-blue-300 text-blue-700 rounded-md hover:bg-blue-100"
            >
              Save Wireframe
            </button>
          )}
        </div>
      </div>

      {/* Canvas */}
      <div className="flex-1">
        <div className="mb-2 text-sm text-gray-600">
          Selected: {tools.find(t => t.id === selectedTool)?.label} | 
          Device: {getCurrentDevice().label} ({getCurrentDevice().width}x{getCurrentDevice().height})
        </div>
        <div className="border border-gray-300 inline-block bg-white shadow-sm">
          <canvas
            ref={canvasRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            className="cursor-crosshair"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-500">
          Click and drag to create elements. Use different tools to add UI components.
        </div>
      </div>
    </div>
  );
};

export default WireframeCanvas;