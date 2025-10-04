export const WORKFLOW_STEPS = [
  { id: "api_input", label: "Getting Started", icon: "fa-key", color: "#6c757d" },
  { id: "roadmap", label: "Road Map", icon: "fa-map-marked-alt", color: "#FF6B35" },
  { id: "user_stories", label: "User Stories", icon: "fa-clipboard-list", color: "#4CAF50" },
  { id: "design_docs", label: "Design Docs", icon: "fa-drafting-compass", color: "#FF9800" },
  { id: "code_generation", label: "Code Generation", icon: "fa-code", color: "#9C27B0" },
  { id: "code_review", label: "Code Review", icon: "fa-search-plus", color: "#00BCD4" },
  { id: "security_review", label: "Security Review", icon: "fa-shield-alt", color: "#F44336" },
  { id: "test_cases", label: "Test Cases", icon: "fa-vial", color: "#8BC34A" },
  { id: "qa_testing", label: "QA Testing", icon: "fa-check-double", color: "#3F51B5" },
  { id: "deployment", label: "Deployment Plan", icon: "fa-rocket", color: "#E91E63" },
  { id: "monitoring", label: "Monitoring Plan", icon: "fa-chart-line", color: "#009688" }
];

export const PROMPT_TEMPLATES = {
  "roadmap": "Create a comprehensive project roadmap for: '{prompt}'. Include the following sections: 1) **Project Overview** - Brief summary and objectives, 2) **Development Phases** - Break down the project into logical phases with detailed tasks and milestones, 3) **Timeline Estimate** - Provide realistic time estimates for each phase and overall project duration (in weeks/months), 4) **Budget Estimation** - Detailed cost breakdown in Indian Rupees (INR) including development costs, infrastructure, tools, testing, deployment, and contingency (assume standard Indian software development rates), 5) **Resource Requirements** - Team size, skill sets needed, and role definitions, 6) **Risk Assessment** - Potential risks and mitigation strategies, 7) **Success Metrics** - Key performance indicators and deliverables for each phase. Provide specific numbers and be realistic about Indian market costs.",
  "user_stories": "Generate a comprehensive and detailed set of user stories for a project described as: '{prompt}'. For each user story, include a title, user role, goal, and detailed acceptance criteria following the 'Given-When-Then' format. Group stories by epic or feature where applicable.",
  "design_docs": "Create a functional and technical design document for: '{prompt}'. The functional section should include user flows and detailed feature specifications. The technical section should propose a system architecture, recommend a technology stack, and define the data models with fields and relationships.",
  "code_generation": "Generate a complete, single-file HTML document for the core feature of: '{prompt}'. The file must include all necessary HTML, CSS (using Tailwind CSS classes loaded from a CDN), and JavaScript to create a visually appealing and functional frontend. The code should be self-contained and ready to be rendered directly. Provide only the raw HTML code, ensuring it is a complete and valid document.",
  "code_review": "Act as a senior software engineer and perform a thorough code review on the generated code for '{prompt}'. Check for code quality, potential bugs, security vulnerabilities, performance issues, and adherence to best practices. Provide the feedback in a structured list with clear explanations and suggestions for improvement.",
  "security_review": "Perform a security review for the application described as '{prompt}'. Identify potential vulnerabilities such as injection attacks, cross-site scripting (XSS), insecure authentication, and data exposure. Suggest specific mitigation strategies for each identified risk.",
  "test_cases": "Create a detailed set of test cases for the project: '{prompt}'. Include a mix of unit tests, integration tests, and end-to-end tests. For each test case, provide a test ID, a description, steps to reproduce, expected results, and define if it's a positive or negative test.",
  "qa_testing": "Develop a comprehensive QA (Quality Assurance) testing plan for the project: '{prompt}'. The plan should outline the testing scope, objectives, methodologies (manual and automated), required resources, and a timeline. Define the entry and exit criteria for the QA phase.",
  "deployment": "Create a detailed, step-by-step deployment plan for the application: '{prompt}'. The plan should cover pre-deployment checks, environment setup, deployment strategy (e.g., blue-green), the deployment process itself, and a comprehensive rollback strategy in case of failure.",
  "monitoring": "Design a monitoring and observability plan for the application: '{prompt}'. Specify key metrics to monitor (e.g., latency, error rate, CPU utilization), recommend monitoring tools (like Prometheus, Grafana), and describe a logging strategy. Outline an alerting system for critical issues."
};