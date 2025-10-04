export const SDLC_KNOWLEDGE_BASE = {
  // SDLC Methodologies
  methodologies: {
    waterfall: {
      name: "Waterfall",
      description: "A linear sequential approach where each phase must be completed before the next begins.",
      phases: ["Requirements", "Design", "Implementation", "Testing", "Deployment", "Maintenance"],
      advantages: ["Clear structure", "Easy to manage", "Well-documented", "Good for fixed requirements"],
      disadvantages: ["Inflexible", "Late testing", "No early feedback", "High risk"],
      bestFor: "Projects with well-defined requirements and minimal changes expected"
    },
    agile: {
      name: "Agile",
      description: "An iterative approach focusing on collaboration, customer feedback, and rapid delivery.",
      principles: ["Individuals over processes", "Working software over documentation", "Customer collaboration", "Responding to change"],
      advantages: ["Flexible", "Early feedback", "Better quality", "Customer satisfaction"],
      disadvantages: ["Less predictable", "Requires skilled team", "Documentation challenges"],
      bestFor: "Projects with evolving requirements and need for rapid delivery"
    },
    scrum: {
      name: "Scrum",
      description: "An agile framework with fixed-length iterations called sprints.",
      roles: ["Product Owner", "Scrum Master", "Development Team"],
      events: ["Sprint Planning", "Daily Standups", "Sprint Review", "Sprint Retrospective"],
      artifacts: ["Product Backlog", "Sprint Backlog", "Increment"]
    },
    devops: {
      name: "DevOps",
      description: "A culture and practice that emphasizes collaboration between development and operations teams.",
      principles: ["Automation", "Continuous Integration", "Continuous Deployment", "Monitoring"],
      benefits: ["Faster delivery", "Better quality", "Improved collaboration", "Quick recovery"]
    }
  },

  // Best Practices by Phase
  bestPractices: {
    requirements: [
      "Use clear, testable acceptance criteria",
      "Involve stakeholders in requirement gathering",
      "Prioritize requirements using MoSCoW method",
      "Create user personas and journey maps",
      "Document both functional and non-functional requirements",
      "Use techniques like story mapping and BDD"
    ],
    design: [
      "Follow SOLID principles",
      "Create detailed wireframes and mockups",
      "Design for scalability and maintainability",
      "Consider security from the beginning",
      "Use design patterns appropriately",
      "Document architectural decisions"
    ],
    development: [
      "Follow coding standards and conventions",
      "Write clean, readable code",
      "Implement proper error handling",
      "Use version control effectively",
      "Write unit tests alongside code",
      "Conduct regular code reviews"
    ],
    testing: [
      "Implement test pyramid (unit, integration, e2e)",
      "Automate regression tests",
      "Test early and often",
      "Use risk-based testing approach",
      "Include performance and security testing",
      "Maintain test documentation"
    ],
    deployment: [
      "Use infrastructure as code",
      "Implement blue-green deployments",
      "Have rollback strategies",
      "Monitor deployments closely",
      "Use feature flags for controlled releases",
      "Document deployment procedures"
    ]
  },

  // Common Questions and Answers
  faq: {
    "What is SDLC?": "Software Development Life Cycle (SDLC) is a systematic process for developing software applications. It includes planning, analysis, design, implementation, testing, deployment, and maintenance phases.",
    
    "What are the main SDLC phases?": "The main phases are: 1) Planning & Analysis, 2) Requirements Gathering, 3) Design, 4) Implementation/Coding, 5) Testing, 6) Deployment, 7) Maintenance and Support.",
    
    "What is the difference between Agile and Waterfall?": "Waterfall is a linear, sequential approach where each phase is completed before moving to the next. Agile is iterative and incremental, allowing for flexibility and continuous feedback throughout development.",
    
    "How do you write effective user stories?": "Use the format: 'As a [user type], I want [functionality] so that [benefit]'. Include clear acceptance criteria, ensure stories are independent, testable, and appropriately sized for a sprint.",
    
    "What should be included in a code review?": "Check for: code quality and standards, security vulnerabilities, performance issues, test coverage, documentation, logic errors, and adherence to requirements.",
    
    "What are common security vulnerabilities?": "OWASP Top 10 includes: Injection attacks, Broken authentication, Sensitive data exposure, XML external entities, Broken access control, Security misconfiguration, Cross-site scripting, Insecure deserialization, Known vulnerabilities, and Insufficient logging.",
    
    "How do you estimate project timelines?": "Use techniques like: Planning poker, Three-point estimation, Historical data analysis, Work breakdown structure, and buffer time for uncertainties. Consider team velocity and complexity factors.",
    
    "What is Definition of Done?": "A shared understanding of what it means for work to be complete. It typically includes: code written, tests passed, code reviewed, documentation updated, and acceptance criteria met.",
    
    "How do you handle changing requirements?": "In Agile: embrace change through iterative development, regular stakeholder feedback, and flexible planning. Prioritize changes based on business value and impact.",
    
    "What metrics should you track in SDLC?": "Key metrics include: Velocity, Lead time, Cycle time, Defect density, Code coverage, Customer satisfaction, Time to market, and Team productivity.",
    
    "What is Continuous Integration/Continuous Deployment?": "CI/CD is a practice where code changes are automatically built, tested, and deployed. CI focuses on integration and testing, while CD automates deployment to production.",
    
    "How do you ensure software quality?": "Through: comprehensive testing strategies, code reviews, static analysis, automated testing, quality gates, performance monitoring, and continuous feedback loops."
  },

  // Tools and Technologies
  tools: {
    projectManagement: ["Jira", "Azure DevOps", "Trello", "Asana", "Monday.com"],
    versionControl: ["Git", "SVN", "Mercurial"],
    cicd: ["Jenkins", "GitLab CI", "GitHub Actions", "Azure Pipelines", "CircleCI"],
    testing: ["Selenium", "Jest", "Cypress", "Postman", "JMeter"],
    monitoring: ["New Relic", "Datadog", "Prometheus", "Grafana", "ELK Stack"],
    collaboration: ["Slack", "Microsoft Teams", "Confluence", "Notion"]
  },

  // Quality Gates
  qualityGates: {
    development: [
      "Code compiles without errors",
      "Unit tests pass with >80% coverage",
      "Code review approved",
      "Static analysis passes",
      "No critical security vulnerabilities"
    ],
    testing: [
      "All test cases executed",
      ">95% pass rate for critical features",
      "Performance benchmarks met",
      "Security scan completed",
      "User acceptance testing approved"
    ],
    deployment: [
      "All environments tested",
      "Rollback plan ready",
      "Monitoring alerts configured",
      "Documentation updated",
      "Stakeholder approval received"
    ]
  }
};

// Helper function to search knowledge base
export const searchKnowledgeBase = (query) => {
  const searchTerm = query.toLowerCase();
  const results = [];

  // Search FAQ
  Object.entries(SDLC_KNOWLEDGE_BASE.faq).forEach(([question, answer]) => {
    if (question.toLowerCase().includes(searchTerm) || answer.toLowerCase().includes(searchTerm)) {
      results.push({ type: 'FAQ', question, answer });
    }
  });

  // Search methodologies
  Object.entries(SDLC_KNOWLEDGE_BASE.methodologies).forEach(([key, methodology]) => {
    if (methodology.name.toLowerCase().includes(searchTerm) || 
        methodology.description.toLowerCase().includes(searchTerm)) {
      results.push({ type: 'Methodology', name: methodology.name, data: methodology });
    }
  });

  // Search best practices
  Object.entries(SDLC_KNOWLEDGE_BASE.bestPractices).forEach(([phase, practices]) => {
    practices.forEach(practice => {
      if (practice.toLowerCase().includes(searchTerm)) {
        results.push({ type: 'Best Practice', phase, practice });
      }
    });
  });

  return results;
};

// Function to get context-aware prompts for the chatbot
export const getChatbotSystemPrompt = () => {
  return `You are an expert SDLC (Software Development Life Cycle) assistant. You help software developers, project managers, and teams with questions about software development processes, methodologies, best practices, and tools.

Your knowledge includes:
- SDLC methodologies (Waterfall, Agile, Scrum, DevOps, etc.)
- Software development best practices
- Project management techniques
- Quality assurance and testing strategies
- Security considerations
- Deployment and maintenance practices
- Industry tools and technologies

When answering questions:
1. Be concise but comprehensive
2. Provide practical, actionable advice
3. Include relevant examples when helpful
4. Reference industry standards and best practices
5. Consider the context of modern software development
6. Offer multiple perspectives when appropriate

If asked about specific tools or technologies, provide balanced views including pros, cons, and use cases.
If the question is outside SDLC scope, politely redirect to software development topics.

Always maintain a helpful, professional tone and focus on practical guidance that teams can implement.`;
};