import React from 'react';

const PresentationStep = ({ stepData, sdlcData = {} }) => {
  const renderStepContent = () => {
    switch (stepData.id) {
      case 1: // Project Overview
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-target text-blue-400"></i>
                  Project Goals
                </h3>
                <ul className="space-y-3 text-white text-opacity-90">
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-400 mt-1"></i>
                    <span>Deliver scalable and maintainable software solution</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-400 mt-1"></i>
                    <span>Improve operational efficiency by 40%</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-400 mt-1"></i>
                    <span>Enhance user experience and satisfaction</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <i className="fas fa-check-circle text-green-400 mt-1"></i>
                    <span>Ensure robust security and compliance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-calendar-alt text-purple-400"></i>
                  Project Timeline
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Duration:</span>
                    <span className="text-white font-semibold">12 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Start Date:</span>
                    <span className="text-white font-semibold">January 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Go-Live:</span>
                    <span className="text-white font-semibold">March 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Team Size:</span>
                    <span className="text-white font-semibold">8 Members</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-chart-line text-yellow-400"></i>
                Success Metrics & KPIs
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">40%</div>
                  <div className="text-white text-opacity-90">Efficiency Improvement</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">95%</div>
                  <div className="text-white text-opacity-90">User Satisfaction</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">99.9%</div>
                  <div className="text-white text-opacity-90">System Uptime</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 2: // Requirements Analysis
        return (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-users text-blue-400"></i>
                  Stakeholder Engagement
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-user-tie text-white"></i>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Business Users</div>
                      <div className="text-white text-opacity-70 text-sm">End-user interviews & workshops</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-cogs text-white"></i>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Technical Teams</div>
                      <div className="text-white text-opacity-70 text-sm">Integration requirements</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                      <i className="fas fa-shield-alt text-white"></i>
                    </div>
                    <div>
                      <div className="text-white font-semibold">Compliance Team</div>
                      <div className="text-white text-opacity-70 text-sm">Security & regulatory needs</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-list-check text-green-400"></i>
                  Requirements Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Functional Requirements:</span>
                    <span className="text-green-400 font-semibold">47 Captured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Non-Functional:</span>
                    <span className="text-blue-400 font-semibold">23 Defined</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">User Stories:</span>
                    <span className="text-purple-400 font-semibold">152 Created</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Acceptance Criteria:</span>
                    <span className="text-yellow-400 font-semibold">298 Points</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-star text-yellow-400"></i>
                Priority Features
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-red-600 bg-opacity-20 border border-red-400 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fas fa-exclamation-circle text-red-400"></i>
                    <span className="text-red-400 font-semibold text-sm">CRITICAL</span>
                  </div>
                  <div className="text-white font-medium">User Authentication</div>
                  <div className="text-white text-opacity-70 text-sm">Secure login & access control</div>
                </div>
                <div className="bg-orange-600 bg-opacity-20 border border-orange-400 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fas fa-exclamation-triangle text-orange-400"></i>
                    <span className="text-orange-400 font-semibold text-sm">HIGH</span>
                  </div>
                  <div className="text-white font-medium">Data Processing</div>
                  <div className="text-white text-opacity-70 text-sm">Core business logic</div>
                </div>
                <div className="bg-yellow-600 bg-opacity-20 border border-yellow-400 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <i className="fas fa-info-circle text-yellow-400"></i>
                    <span className="text-yellow-400 font-semibold text-sm">MEDIUM</span>
                  </div>
                  <div className="text-white font-medium">Reporting Dashboard</div>
                  <div className="text-white text-opacity-70 text-sm">Analytics & insights</div>
                </div>
              </div>
            </div>
          </div>
        );

      case 3: // System Design
        return (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-sitemap text-blue-400"></i>
                System Architecture Overview
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-desktop text-white text-xl"></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Frontend Layer</h4>
                  <p className="text-white text-opacity-70 text-sm">React.js with modern UI components</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-server text-white text-xl"></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Backend Services</h4>
                  <p className="text-white text-opacity-70 text-sm">Node.js API with microservices</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-3">
                    <i className="fas fa-database text-white text-xl"></i>
                  </div>
                  <h4 className="text-white font-semibold mb-2">Data Layer</h4>
                  <p className="text-white text-opacity-70 text-sm">PostgreSQL with Redis cache</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-palette text-purple-400"></i>
                  User Experience Design
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-mobile-alt text-blue-400"></i>
                    <span className="text-white">Responsive design for all devices</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-universal-access text-green-400"></i>
                    <span className="text-white">WCAG 2.1 accessibility compliance</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-tachometer-alt text-yellow-400"></i>
                    <span className="text-white">Sub-3 second load times</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-paint-brush text-purple-400"></i>
                    <span className="text-white">Modern, intuitive interface</span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-link text-green-400"></i>
                  Integration Points
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-id-card text-blue-400"></i>
                    <span className="text-white">Single Sign-On (SSO) integration</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-chart-bar text-green-400"></i>
                    <span className="text-white">Business intelligence tools</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-envelope text-yellow-400"></i>
                    <span className="text-white">Email notification system</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-cloud text-purple-400"></i>
                    <span className="text-white">Cloud storage services</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4: // Implementation
        return (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-tasks text-blue-400"></i>
                Development Progress
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">85%</div>
                  <div className="text-white text-opacity-90 text-sm">Backend APIs</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-green-400 h-2 rounded-full" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">92%</div>
                  <div className="text-white text-opacity-90 text-sm">Frontend UI</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-blue-400 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">78%</div>
                  <div className="text-white text-opacity-90 text-sm">Database</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-purple-400 h-2 rounded-full" style={{width: '78%'}}></div>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">65%</div>
                  <div className="text-white text-opacity-90 text-sm">Integration</div>
                  <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                    <div className="bg-yellow-400 h-2 rounded-full" style={{width: '65%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-code-branch text-green-400"></i>
                  Development Methodology
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-sync-alt text-blue-400"></i>
                    <span className="text-white">Agile/Scrum methodology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-calendar-week text-green-400"></i>
                    <span className="text-white">2-week sprint cycles</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-users text-yellow-400"></i>
                    <span className="text-white">Daily stand-up meetings</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-chart-line text-purple-400"></i>
                    <span className="text-white">Continuous integration/deployment</span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-medal text-yellow-400"></i>
                  Quality Standards
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-check-double text-green-400"></i>
                    <span className="text-white">95% code coverage</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-eye text-blue-400"></i>
                    <span className="text-white">Peer code review process</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-shield-alt text-purple-400"></i>
                    <span className="text-white">Security scanning automated</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-tools text-orange-400"></i>
                    <span className="text-white">Best practices enforcement</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 5: // Testing & QA
        return (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-clipboard-check text-blue-400"></i>
                Testing Strategy Overview
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center p-4 bg-green-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-cogs text-green-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold">Unit Testing</div>
                  <div className="text-green-400 text-2xl font-bold">98%</div>
                  <div className="text-white text-opacity-70 text-sm">Coverage</div>
                </div>
                <div className="text-center p-4 bg-blue-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-puzzle-piece text-blue-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold">Integration</div>
                  <div className="text-blue-400 text-2xl font-bold">156</div>
                  <div className="text-white text-opacity-70 text-sm">Test Cases</div>
                </div>
                <div className="text-center p-4 bg-purple-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-user-check text-purple-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold">User Acceptance</div>
                  <div className="text-purple-400 text-2xl font-bold">47</div>
                  <div className="text-white text-opacity-70 text-sm">Scenarios</div>
                </div>
                <div className="text-center p-4 bg-orange-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-tachometer-alt text-orange-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold">Performance</div>
                  <div className="text-orange-400 text-2xl font-bold">2.1s</div>
                  <div className="text-white text-opacity-70 text-sm">Load Time</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-bug text-red-400"></i>
                  Defect Management
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Critical Issues:</span>
                    <span className="text-red-400 font-semibold">0 Open</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">High Priority:</span>
                    <span className="text-orange-400 font-semibold">2 Open</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Medium Priority:</span>
                    <span className="text-yellow-400 font-semibold">8 Open</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-white text-opacity-90">Total Resolved:</span>
                    <span className="text-green-400 font-semibold">247 Fixed</span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-shield-alt text-green-400"></i>
                  Security & Compliance
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-lock text-green-400"></i>
                    <span className="text-white">Penetration testing passed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-certificate text-blue-400"></i>
                    <span className="text-white">GDPR compliance verified</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-key text-purple-400"></i>
                    <span className="text-white">Authentication security tested</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-database text-yellow-400"></i>
                    <span className="text-white">Data encryption validated</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 6: // Deployment & Maintenance
        return (
          <div className="space-y-8">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-rocket text-blue-400"></i>
                Deployment Strategy
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-flask text-blue-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold mb-2">Development</div>
                  <div className="text-blue-400 text-sm">Continuous Integration</div>
                  <div className="text-white text-opacity-70 text-xs">Auto-deployment on commit</div>
                </div>
                <div className="text-center p-4 bg-yellow-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-vial text-yellow-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold mb-2">Staging</div>
                  <div className="text-yellow-400 text-sm">User Acceptance Testing</div>
                  <div className="text-white text-opacity-70 text-xs">Stakeholder validation</div>
                </div>
                <div className="text-center p-4 bg-green-600 bg-opacity-20 rounded-lg">
                  <i className="fas fa-globe text-green-400 text-2xl mb-2"></i>
                  <div className="text-white font-semibold mb-2">Production</div>
                  <div className="text-green-400 text-sm">Phased Rollout</div>
                  <div className="text-white text-opacity-70 text-xs">Blue-green deployment</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-chart-line text-green-400"></i>
                  Go-Live Readiness
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white flex items-center gap-2">
                      <i className="fas fa-check-circle text-green-400"></i>
                      User Training Completed
                    </span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white flex items-center gap-2">
                      <i className="fas fa-check-circle text-green-400"></i>
                      Documentation Ready
                    </span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white flex items-center gap-2">
                      <i className="fas fa-check-circle text-green-400"></i>
                      Infrastructure Deployed
                    </span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white flex items-center gap-2">
                      <i className="fas fa-check-circle text-green-400"></i>
                      Support Procedures
                    </span>
                    <span className="text-green-400 font-semibold">100%</span>
                  </div>
                </div>
              </div>

              <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <i className="fas fa-headset text-purple-400"></i>
                  Ongoing Support
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <i className="fas fa-clock text-blue-400"></i>
                    <span className="text-white">24/7 monitoring & alerting</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-life-ring text-green-400"></i>
                    <span className="text-white">Tiered support structure</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-sync-alt text-yellow-400"></i>
                    <span className="text-white">Regular updates & patches</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <i className="fas fa-chart-bar text-purple-400"></i>
                    <span className="text-white">Performance monitoring</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <i className="fas fa-trophy text-yellow-400"></i>
                Project Success Celebration
              </h3>
              <div className="text-center py-8">
                <div className="text-6xl mb-4">🎉</div>
                <div className="text-2xl font-bold text-white mb-2">Congratulations!</div>
                <div className="text-white text-opacity-90 mb-4">
                  Your SDLC project has been successfully delivered on time and within budget.
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">On Time</div>
                    <div className="text-white text-opacity-70">Delivered as scheduled</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">On Budget</div>
                    <div className="text-white text-opacity-70">Within allocated resources</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">High Quality</div>
                    <div className="text-white text-opacity-70">Exceeds expectations</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center text-white">
            <div className="text-6xl mb-4">🚀</div>
            <h2 className="text-2xl font-bold mb-2">SDLC Step {stepData.id}</h2>
            <p className="text-white text-opacity-70">Step content loading...</p>
          </div>
        );
    }
  };

  return (
    <div className="flex-1 flex flex-col p-8">
      {/* Step Header */}
      <div className="text-center mb-8">
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r ${stepData.color} mb-4`}>
          <i className={`${stepData.icon} text-white text-2xl`}></i>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">{stepData.title}</h1>
        <h2 className="text-xl text-white text-opacity-80 mb-4">{stepData.subtitle}</h2>
        <p className="text-white text-opacity-70 max-w-2xl mx-auto">{stepData.description}</p>
      </div>

      {/* Step Content */}
      <div className="flex-1">
        {renderStepContent()}
      </div>
    </div>
  );
};

export default PresentationStep;