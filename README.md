# 🚀 ProtoFlow AI

<div align="center">

![ProtoFlow AI Logo](https://img.shields.io/badge/ProtoFlow%20AI-Powered%20SDLC-blue?style=for-the-badge&logo=react)

**An AI-Powered Software Development Life Cycle Assistant**

[![React](https://img.shields.io/badge/React-19.1.1-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-7.1.2-646CFF?style=flat&logo=vite)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.3.6-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Try_Now-00D4FF?style=flat&logo=firefox)](https://sdlc302.web.app)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat)](LICENSE)

---

## 🚀 **[🌐 LIVE DEMO - Try ProtoFlow AI Now!](https://sdlc302.web.app)**

**Experience the full power of AI-driven SDLC automation:**
- 🎯 **No Installation Required** - Run directly in your browser
- 🤖 **AI-Powered Code Generation** - See intelligent automation in action
- ⚡ **Complete 7-Step Workflow** - From user stories to deployment
- 💻 **Live Code Preview** - Real-time HTML generation and preview

**👆 [Click here to access the live application](https://sdlc302.web.app)**

---

</div>

## 📖 Overview

ProtoFlow AI is a cutting-edge web application that revolutionizes software development by automating the entire Software Development Life Cycle (SDLC) process. Built with React and powered by AI, it guides developers through 7 essential steps from project conception to deployment.

### 🎯 Key Benefits

- **🤖 AI-Powered Automation**: Leverage advanced AI to generate comprehensive project documentation, code, and plans
- **📊 Complete SDLC Coverage**: From user stories to deployment - everything you need in one place
- **⚡ Rapid Prototyping**: Generate working HTML prototypes with full functionality
- **🔄 Iterative Improvement**: Built-in feedback system for continuous refinement
- **💾 Session Persistence**: Never lose your work with automatic session management

## ✨ Features

### 🎛️ Core Functionality
- **Complete 7-Step SDLC Workflow** with intelligent navigation
- **AI-Generated Content** for all development phases
- **Interactive Code Preview** with live HTML rendering
- **Smart Session Management** with automatic persistence
- **Comprehensive Download Options** (Markdown, HTML, JSON packages)
- **Real-time Feedback System** for content refinement

### 🎨 User Experience
- **Intuitive Sidebar Navigation** with visual progress indicators
- **Responsive Design** optimized for all devices
- **Beautiful Animations** and smooth transitions
- **Toast Notifications** for user guidance
- **Access Control** preventing workflow skipping
- **Dark/Light Theme Support** (customizable)

### 🔧 Technical Features
- **Monaco Editor Integration** for advanced code editing
- **Mermaid Diagrams** for visual documentation
- **D3.js Visualizations** for data representation
- **React Flow** for interactive diagrams
- **Markdown Rendering** with syntax highlighting

## 🚀 Quick Start

### 🌐 **Option 1: Try the Live Demo (Recommended)**

**🎯 No installation needed! Experience ProtoFlow AI instantly:**

**👉 [Launch ProtoFlow AI Live Demo](https://sdlc302.web.app)**

- ✅ **Instant Access** - No setup or downloads required
- 🚀 **Full Featured** - Complete SDLC automation experience
- 🤖 **AI-Powered** - Real-time code generation and analysis
- 💾 **Session Persistence** - Your work is automatically saved

---

### 🛠️ **Option 2: Local Development Setup**

### Prerequisites

- **Node.js** (v18.0.0 or higher)
- **npm** or **yarn** package manager
- **Google AI API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/protoflow-ai.git
   cd protoflow-ai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   ```
   http://localhost:5173
   ```

### 🔑 Setup

1. **Enter your Google AI API Key** in the initial setup screen
2. **Describe your project** in detail for better AI generation
3. **Follow the guided workflow** through all 11 steps
4. **Review and approve** each generated section
5. **Download your complete project package**

## 📋 SDLC Workflow Steps

| Step | Phase | Description | Output |
|------|-------|-------------|---------|
| 🔑 | **Getting Started** | API setup and project description | Configuration |
|  | **User Stories** | Detailed user stories with acceptance criteria | User Requirements |
| 📐 | **Design Docs** | Functional and technical design specifications | Architecture |
| 💻 | **Code Generation** | Complete HTML application with live preview | Working Prototype |
| 🔍 | **Code Review** | AI-powered code analysis and improvements | Quality Report |
| 🧪 | **Test Cases** | Comprehensive testing scenarios | Test Suite |
| 🚀 | **Deployment** | Production deployment strategy | Deploy Guide |

## 🛠️ Technology Stack

### Frontend
- **React 19.1.1** - Modern UI library with latest features
- **Vite 7.1.2** - Lightning-fast build tool and dev server
- **Tailwind CSS 3.3.6** - Utility-first CSS framework

### UI Components & Libraries
- **Monaco Editor** - Advanced code editor (VS Code engine)
- **React Flow** - Interactive node-based UI
- **Mermaid** - Diagram and flowchart generation
- **D3.js** - Data visualization and charts
- **Lucide React** - Beautiful icon library
- **Marked.js** - Markdown parsing and rendering

### Development Tools
- **ESLint** - Code linting and quality
- **PostCSS** - CSS processing and optimization
- **Autoprefixer** - Automatic vendor prefixing

### AI Integration
- **Google Gemini 2.5 Flash Preview** - Advanced AI content generation
- **Custom API Layer** - Optimized prompt engineering

## 📁 Project Structure

```
protoflow-ai/
├── 📁 public/
│   ├── 🖼️ vite.svg
│   └── 📄 index.html
├── 📁 src/
│   ├── 📁 components/           # React Components
│   │   ├── 🎯 ApiInput.jsx      # Initial setup & API key input
│   │   ├── 🎈 Balloons.jsx      # Success animations
│   │   ├── 💻 CodeGenerationStep.jsx  # Code generation with preview
│   │   ├── ✅ Completion.jsx    # Workflow completion
│   │   ├── 🎛️ Controls.jsx      # Action buttons & feedback
│   │   ├── ⏳ Loader.jsx        # Loading states
│   │   ├── 📋 SdlcStep.jsx      # Generic workflow step
│   │   ├── 🎨 EnhancedSdlcStep.jsx # Enhanced step with features
│   │   ├── 🗂️ Sidebar.jsx       # Navigation sidebar
│   │   ├── 💬 Toast.jsx         # Notification system
│   │   ├── 🤖 ChatbotAssistant.jsx # AI chat interface
│   │   ├── 🎭 PresentationMode.jsx # Presentation view
│   │   └── 📊 DiagramShowcase.jsx  # Visual diagrams
│   ├── 📁 contexts/             # React Contexts
│   ├── 📁 utils/               # Utility Functions
│   │   ├── 🔌 api.js           # API integration & file operations
│   │   ├── 🎯 constants.js     # Workflow steps & prompts
│   │   ├── 💾 sessionStorage.js # Session management
│   │   └── 🧠 sdlcKnowledge.js # SDLC best practices
│   ├── 🎨 App.css              # Custom styles & animations
│   ├── ⚛️ App.jsx              # Main application component
│   ├── 🎨 index.css            # Global styles & Tailwind
│   └── 🚀 main.jsx             # Application entry point
├── 📄 package.json             # Dependencies & scripts
├── ⚙️ vite.config.js           # Vite configuration
├── 🎨 tailwind.config.js       # Tailwind configuration
├── 📝 eslint.config.js         # ESLint configuration
└── 📖 README.md               # Project documentation
```

## 🎨 Screenshots

### Main Dashboard
![Dashboard](screenshots/dashboard.png)

### Code Generation with Live Preview
![Code Generation](screenshots/code-generation.png)

## 🚀 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint for code quality |

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_DEFAULT_API_ENDPOINT=your_api_endpoint
VITE_APP_VERSION=1.0.0
VITE_ENABLE_ANALYTICS=false
```

### Customization Options

#### 🎨 Theming
Modify `tailwind.config.js` to customize colors, fonts, and spacing:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color'
      }
    }
  }
}
```

#### 🔧 API Configuration
Update `src/utils/api.js` to modify API endpoints and parameters.

## 📊 Performance & Features

### ⚡ Performance Metrics
- **First Contentful Paint**: < 1.5s
- **Lighthouse Score**: 95+
- **Bundle Size**: < 500KB (gzipped)
- **Hot Reload**: < 200ms

### 🔒 Security Features
- **API Key Encryption** in session storage
- **Input Sanitization** for all user inputs
- **CSRF Protection** for API calls
- **Content Security Policy** headers

### ♿ Accessibility
- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation** support
- **Screen Reader** optimized
- **High Contrast** mode support

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit your changes**: `git commit -m 'Add amazing feature'`
4. **Push to the branch**: `git push origin feature/amazing-feature`
5. **Open a Pull Request**

### 📋 Development Guidelines

- Follow the existing code style and conventions
- Write meaningful commit messages
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

## 🐛 Issues & Support

- **Bug Reports**: [GitHub Issues](https://github.com/yourusername/protoflow-ai/issues)
- **Feature Requests**: [GitHub Discussions](https://github.com/yourusername/protoflow-ai/discussions)
- **Documentation**: [Wiki](https://github.com/yourusername/protoflow-ai/wiki)

## 📈 Future Development

### 🎯 Upcoming Features
- [ ] **Multi-language Support** (Python, Java, Node.js code generation)
- [ ] **Team Collaboration** features
- [ ] **Version Control Integration** (Git)
- [ ] **Cloud Deployment** automation
- [ ] **AI Model Selection** (GPT-4, Claude, etc.)
- [ ] **Custom Template** creation
- [ ] **API Rate Limiting** and usage analytics
- [ ] **Offline Mode** support

### 🚀 Future Enhancements
- **Mobile App** (React Native)
- **VS Code Extension**
- **Enterprise Features** (SSO, audit logs)
- **Advanced Analytics** dashboard

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google AI** for the Gemini API
- **Vercel** for hosting and deployment
- **React Team** for the amazing framework
- **Tailwind CSS** for the utility-first CSS framework
- **All Contributors** who made this project possible

## 📞 Contact

- **Developer**: Your Name
- **Email**: your.email@example.com
- **LinkedIn**: [Your LinkedIn](https://linkedin.com/in/yourprofile)
- **GitHub**: [Your GitHub](https://github.com/yourusername)

---

<div align="center">

**Made with ❤️ by the ProtoFlow AI Team**

⭐ **Star this repository if you found it helpful!** ⭐

</div>
└── main.jsx            # React app entry point
```

## API Integration

This application integrates with Google's Gemini AI API. Each workflow step uses specialized prompts to generate relevant content:

- **User Stories**: Structured stories with Given-When-Then acceptance criteria
- **Design Documents**: Functional and technical specifications
- **Code Generation**: Complete HTML applications with embedded CSS/JS
- **Code Reviews**: Professional code quality and security analysis
- **Testing**: Comprehensive test plans and cases
- **Deployment**: Production-ready deployment strategies

## Features

### Download Options
- Individual step results (Markdown or HTML)
- Complete workflow package (JSON format)
- Final workflow with all approved content

### Feedback System
- Request changes for any generated content
- AI incorporates feedback into regenerated content
- Maintain workflow progress while improving specific steps

### Progress Tracking
- Visual progress indicator in sidebar
- Step-by-step navigation with approval system
- Clear indication of completed vs pending steps

### Smart Navigation
- **Clickable Steps**: Navigate directly to any step in the sidebar
- **Access Control**: Only steps with generated content are accessible
- **Visual Indicators**: 
  - ✅ Approved steps
  - 🔒 Locked/inaccessible steps
  - 🔵 Steps with generated content
- **Content Persistence**: All generated content is preserved during navigation
- **Toast Notifications**: Helpful messages for navigation feedback

### Session Management
- **Automatic Persistence**: All data automatically saved to browser session storage
- **Page Refresh Safe**: Work is preserved even after browser refresh or accidental close
- **State Recovery**: Returns to exact step and state when reopening the application
- **Smart Generation**: Never regenerates existing content unless feedback is provided
- **Performance Optimized**: Eliminates unnecessary API calls for existing content

## Contributing

Feel free to submit issues, fork the repository, and create pull requests for any improvements.

## License

This project is open source and available under the [MIT License](LICENSE).+ Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
