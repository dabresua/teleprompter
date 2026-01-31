/**
 * Example scenarios data
 * Pure data - no dependencies
 */
(function() {
    'use strict';

    window.exampleScenarios = {
        'code-security': {
            persona: 'Security Engineer',
            instructions: 'Review the following Python Flask endpoint for security issues. Prioritize critical vulnerabilities and provide specific recommendations.',
            inputData: '<code>\n@app.route(\'/user/<id>\')\ndef get_user(id):\n    query = f"SELECT * FROM users WHERE id = {id}"\n    user = db.execute(query)\n    return jsonify(user)\n</code>',
            outputFormat: '1. Vulnerability Summary (with severity levels)\n2. Detailed Explanation of each issue\n3. Secure Code Example\n4. Additional Security Recommendations',
            additionalContext: 'This endpoint handles authentication-related user data. The application uses PostgreSQL database. Performance is critical (10k requests/minute).',
            reasoning: 'chain-of-thought',
            cotSteps: [
                'Identify potential SQL injection vectors',
                'Check for authentication and authorization issues',
                'Evaluate data exposure risks',
                'Consider input validation and sanitization',
                'Review error handling'
            ],
            cotXmlTags: true,
            audience: 'Technical - Software Developers',
            selfReflection: true,
            antiHallucination: true
        },

        'email-classification': {
            persona: 'Data Scientist',
            instructions: 'Classify the following email into one of these categories: Sales, Support, Billing, HR, General. Provide a confidence score and brief reasoning.',
            inputData: '[Email content will be inserted here]',
            outputFormat: 'Category: [category name], Confidence: [percentage], Reasoning: [one sentence explanation]',
            reasoning: 'few-shot',
            examples: [
                {
                    input: "Hi, I'd like to upgrade my subscription to the premium plan. What are my options?",
                    output: "Category: Billing, Confidence: 95%, Reasoning: Direct mention of subscription upgrade indicates billing inquiry"
                },
                {
                    input: "My account isn't loading properly. I keep getting error 404 when I try to access the dashboard.",
                    output: "Category: Support, Confidence: 98%, Reasoning: Technical issue requiring troubleshooting assistance"
                },
                {
                    input: "I'm interested in your enterprise solution for our team of 50 people. Can we schedule a demo?",
                    output: "Category: Sales, Confidence: 97%, Reasoning: New business opportunity with demo request"
                }
            ],
            audience: 'Semi-Technical - Product Managers',
            selfReflection: false,
            antiHallucination: true
        },

        'research-summary': {
            persona: 'Business Analyst',
            instructions: 'Summarize the current state of solid-state battery technology, focusing on commercial viability and recent breakthroughs.',
            outputFormat: '## Executive Summary (3-4 sentences)\n## Key Technologies\n## Recent Breakthroughs (2023-2025)\n## Commercial Readiness Assessment\n## Major Players and Investments\n## Timeline to Market',
            additionalContext: 'Focus on automotive applications. Include specific companies and their announced timelines. Data should be from credible sources.',
            reasoning: 'zero-shot',
            audience: 'Non-Technical - C-Level Executives',
            selfReflection: true,
            antiHallucination: true
        },

        'api-documentation': {
            persona: 'Technical Writer',
            instructions: 'Create comprehensive API documentation for the following endpoint. Include all necessary details for developers to successfully integrate this API.',
            inputData: '<code>\nPOST /api/v1/users\nCreates a new user account\nParameters: email (string, required), name (string, required), role (string, optional)\nReturns: user object with id, created_at timestamp\nAuthentication: Bearer token required\nRate limit: 100 requests per hour\n</code>',
            outputFormat: '# Endpoint Overview\n## HTTP Method and URL\n## Description\n## Authentication\n## Request Parameters (table format)\n## Request Example (curl and JavaScript)\n## Response Format\n## Response Example (JSON)\n## Error Codes\n## Rate Limits',
            additionalContext: 'REST API following OpenAPI 3.0 specification. Target framework: Node.js with Express. Must include examples in both curl and JavaScript fetch.',
            reasoning: 'zero-shot',
            audience: 'Technical - Software Developers',
            selfReflection: true,
            antiHallucination: true
        },

        'user-story': {
            persona: 'Product Manager',
            instructions: 'Write a detailed user story with acceptance criteria for the described feature. Follow standard Agile format.',
            inputData: 'Feature request: Allow users to export their data in CSV format from the dashboard. Users should be able to select date ranges and specific data fields to include.',
            outputFormat: '**User Story:**\nAs a [user type]\nI want [goal]\nSo that [benefit]\n\n**Acceptance Criteria:**\n- [ ] Criterion 1\n- [ ] Criterion 2\n[etc.]\n\n**Technical Notes:**\n[Any technical considerations]',
            additionalContext: 'B2B SaaS product. GDPR compliance required (data export is a regulatory requirement). Target implementation: Q2 2025. Current tech stack: React frontend, Python Django backend.',
            reasoning: 'few-shot',
            examples: [
                {
                    input: 'Feature: Dark mode toggle',
                    output: '**User Story:**\nAs a user who works late hours\nI want to switch the interface to dark mode\nSo that I can reduce eye strain and work more comfortably\n\n**Acceptance Criteria:**\n- [ ] Toggle switch appears in user settings menu\n- [ ] Dark mode preference persists across sessions\n- [ ] Mode change applies immediately without page reload\n- [ ] All UI components render properly in dark mode\n\n**Technical Notes:**\nUse CSS custom properties for theming. Store preference in localStorage.'
                },
                {
                    input: 'Feature: Password reset via email',
                    output: '**User Story:**\nAs a user who forgot my password\nI want to reset it using my email address\nSo that I can regain access to my account securely\n\n**Acceptance Criteria:**\n- [ ] Reset link sent to registered email within 1 minute\n- [ ] Link expires after 24 hours\n- [ ] User must create a new password (cannot reuse old one)\n- [ ] Confirmation email sent after successful reset\n\n**Technical Notes:**\nUse secure token generation. Implement rate limiting to prevent abuse.'
                }
            ],
            audience: 'Semi-Technical - Technical Project Managers',
            selfReflection: true,
            antiHallucination: false
        },

        'feature-request': {
            persona: 'Product Manager',
            instructions: 'Analyze the following feature request and create a comprehensive specification. Include technical feasibility, user impact, and implementation recommendations.',
            inputData: 'Feature Request: Add real-time collaboration features to our document editor, similar to Google Docs. Multiple users should be able to edit simultaneously with cursor positions visible and changes synced instantly.',
            outputFormat: '## Feature Overview\n## User Stories\n## Technical Requirements\n- Frontend changes\n- Backend changes\n- Infrastructure needs\n## Implementation Approach\n## Challenges and Risks\n## Success Metrics\n## Timeline Estimate',
            additionalContext: 'Current stack: React frontend, Node.js backend, MongoDB database. Target users: teams of 5-50 people. Performance requirement: <100ms latency for edits.',
            reasoning: 'chain-of-thought',
            cotSteps: [
                'Analyze user needs and use cases',
                'Identify technical requirements and dependencies',
                'Evaluate existing solutions and technologies',
                'Consider scalability and performance implications',
                'Assess implementation complexity and timeline'
            ],
            cotXmlTags: true,
            audience: 'Semi-Technical - Product Managers',
            selfReflection: true,
            antiHallucination: true
        },

        'bug-analysis': {
            persona: 'Senior Software Engineer',
            instructions: 'Analyze the following bug report, identify root cause, and provide a detailed fix with testing approach.',
            inputData: '<bug_report>\nTitle: Application crashes when uploading files larger than 10MB\nEnvironment: Production, Chrome 120, Windows 11\nSteps to reproduce:\n1. Navigate to /upload page\n2. Select a file larger than 10MB\n3. Click "Upload" button\n4. Browser tab becomes unresponsive\n\nError log:\nUncaught RangeError: Maximum call stack size exceeded\n  at FileReader.onload (upload.js:45)\n  at convertToBase64 (utils.js:123)\n</bug_report>',
            outputFormat: '## Root Cause Analysis\n## Impact Assessment\n## Proposed Solution\n- Code changes\n- Configuration changes\n## Testing Strategy\n## Prevention Measures',
            additionalContext: 'File upload uses Base64 encoding. Current implementation loads entire file into memory. Production handles 1000+ uploads daily. Quick fix needed but should be production-ready.',
            reasoning: 'chain-of-thought',
            cotSteps: [
                'Analyze error message and stack trace',
                'Identify code location and logic flow',
                'Determine why the issue occurs',
                'Evaluate potential solutions',
                'Recommend fix with minimal risk'
            ],
            cotXmlTags: true,
            audience: 'Technical - Software Developers',
            selfReflection: true,
            antiHallucination: true
        },

        'project-familiarization': {
            persona: 'Senior Software Engineer',
            instructions: 'You are working as an AI agent inside this codebase. Familiarize yourself with the project structure, architecture, and key components. Prepare to answer questions and assist with development tasks.',
            inputData: '<project_context>\nRepository: teleprompter\nPurpose: AI Prompt Engineering Wizard - a single-page application for building structured AI prompts\nTechnology: Vanilla HTML/CSS/JavaScript (no frameworks)\nFile structure:\n- index.html (main application file)\n- README.md (project documentation)\n- REQUIREMENTS.md (detailed specifications)\n</project_context>',
            outputFormat: '## Project Summary\nBrief overview of what this project does\n\n## Architecture Overview\nKey technical decisions and structure\n\n## Main Components\nList and describe major parts of the codebase\n\n## How to Work with This Project\nDevelopment workflow and guidelines\n\n## Questions I Can Help With\nTypes of tasks I\'m ready to assist with',
            additionalContext: 'Focus on understanding the codebase well enough to make contributions, fix bugs, or add features. Be ready to explain any part of the code or suggest improvements.',
            reasoning: 'zero-shot',
            audience: 'Technical - Software Developers',
            selfReflection: true,
            antiHallucination: true
        }
    };

})();
