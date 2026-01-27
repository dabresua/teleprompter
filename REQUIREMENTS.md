# AI Prompt Engineering Wizard - Requirements

## Overview
Create a single-page HTML application that helps users build well-structured AI prompts following best practices in prompt engineering.

## Technical Specifications
- Single HTML file with embedded CSS and vanilla JavaScript
- No external dependencies (no frameworks, no CDN links)
- Responsive design (mobile, tablet, desktop)
- Clean, professional UI with modern styling
- Semantic HTML5
- Accessible (ARIA labels, keyboard navigation, screen reader friendly)

---

## Form Sections

### Section 1: Persona Definition
**Purpose:** Define the AI's role and expertise

**UI Elements:**
- Dropdown selector with options:
  - "None (no persona)" - default
  - "Senior Software Engineer"
  - "Security Engineer"
  - "Data Scientist"
  - "Product Manager"
  - "Technical Writer"
  - "UX Designer"
  - "DevOps Engineer"
  - "Business Analyst"
  - "Marketing Specialist"
  - "Creative Writer"
  - "Teacher/Educator"
  - "Other (custom)"
- Textarea (shown only when "Other (custom)" is selected)
  - Placeholder: "e.g., You are an experienced Python developer with 10 years of experience..."
  - Hidden by default

**Predefined Persona Templates:**
```
Senior Software Engineer: "You are a senior software engineer with extensive experience in software architecture, design patterns, and best practices. You write clean, maintainable code and prioritize scalability and performance."

Security Engineer: "You are an experienced security engineer specializing in web application vulnerabilities, secure coding practices, and threat modeling. You prioritize security best practices and can identify potential vulnerabilities."

Data Scientist: "You are a data scientist with expertise in statistical analysis, machine learning, and data visualization. You can explain complex analytical concepts clearly and provide actionable insights from data."

Product Manager: "You are an experienced product manager who understands user needs, market dynamics, and product strategy. You can balance technical constraints with business objectives and communicate effectively with both technical and non-technical stakeholders."

Technical Writer: "You are a skilled technical writer who can explain complex technical concepts in clear, accessible language. You create well-structured documentation with appropriate examples and diagrams."

UX Designer: "You are a UX designer with expertise in user research, interaction design, and usability principles. You focus on creating intuitive, accessible, and user-centered designs."

DevOps Engineer: "You are a DevOps engineer experienced in CI/CD pipelines, infrastructure as code, containerization, and cloud platforms. You prioritize automation, reliability, and monitoring."

Business Analyst: "You are a business analyst skilled at understanding business requirements, process optimization, and translating between technical and business stakeholders. You focus on delivering measurable business value."

Marketing Specialist: "You are a marketing specialist with expertise in content strategy, audience segmentation, and digital marketing. You understand how to create compelling messaging that resonates with target audiences."

Creative Writer: "You are a creative writer with a strong command of narrative techniques, character development, and engaging storytelling. You can write in various styles and genres while maintaining voice consistency."

Teacher/Educator: "You are an experienced educator who can break down complex topics into digestible lessons. You use clear explanations, relevant examples, and check for understanding."
```

---

### Section 2: Instructions
**Purpose:** Main task description

**UI Elements:**
- Textarea (REQUIRED field)
- Placeholder: "Describe what you want the AI to do. E.g., 'Analyze the provided code for security vulnerabilities. Focus on...'"
- Helper text: "Be clear and specific about the task"

---

### Section 3: Input Data
**Purpose:** Provide data/content to be processed

**UI Elements:**
- Textarea (optional)
- Placeholder: "Paste your code, data, or content here. Use XML tags to structure:\n<code>your code</code>\n<document>your text</document>"
- Helper text: "Use XML tags like <code>, <document>, <data> to delimit different types of input"

---

### Section 4: Output Format
**Purpose:** Specify desired response structure

**UI Elements:**
- Textarea (optional)
- Placeholder: "Specify how you want the response structured:\n1. Summary\n2. Detailed analysis\n3. Code example\n4. Recommendations"
- Helper text: "Define the structure and format you want"

---

### Section 5: Additional Context
**Purpose:** Provide constraints, requirements, or background

**UI Elements:**
- Textarea (optional)
- Placeholder: "E.g., Using React 18, Performance critical, Must support mobile browsers, Target Python 3.9+..."
- Helper text: "Any constraints, requirements, or background information"

---

### Section 6: Reasoning Method
**Purpose:** Choose how the AI should approach the problem

**UI Elements:**
- Radio buttons with three options:
  - **Zero-shot** (default): Direct prompting without examples
  - **Few-shot**: Provide example input/output pairs
  - **Chain-of-Thought**: Show step-by-step reasoning

**If "Few-shot" is selected:**
- Show dynamic form for adding examples
- Each example has two textareas:
  - "Example Input" textarea
  - "Example Output" textarea
- Start with 2 example slots
- "Add Another Example" button (max 5 examples)
- "Remove Example" button for each (disabled if only 1 example)
- Helper text: "Provide examples that demonstrate the pattern you want"

**If "Chain-of-Thought" is selected:**
- Textarea for reasoning steps
- Placeholder: "List the steps:\n1. Identify the problem requirements\n2. Break down into components\n3. Consider edge cases\n4. Propose solution"
- Checkbox: "Use XML tags for thinking process" (checked by default)
- Helper text: "Define the reasoning steps the AI should follow"

---

### Section 7: Audience
**Purpose:** Define who will read the output

**UI Elements:**
- Dropdown selector with options:
  - "General (not specified)" - default
  - "Technical - Software Developers"
  - "Technical - System Architects"
  - "Technical - Data Engineers"
  - "Technical - DevOps/SRE"
  - "Semi-Technical - Product Managers"
  - "Semi-Technical - Technical Project Managers"
  - "Non-Technical - Business Stakeholders"
  - "Non-Technical - C-Level Executives"
  - "Non-Technical - Marketing/Sales Teams"
  - "Students/Learners - Beginners"
  - "Students/Learners - Intermediate"
  - "Students/Learners - Advanced"
  - "General Public"
  - "Other (custom)"
- Textarea (shown only when "Other (custom)" is selected)
  - Placeholder: "e.g., Medical professionals with basic technical knowledge..."
  - Hidden by default

**Predefined Audience Templates:**
```
General (not specified): [Do not add audience specification to prompt]

Technical - Software Developers: "Target audience: software developers with professional coding experience. Use appropriate technical terminology."

Technical - System Architects: "Target audience: senior system architects familiar with distributed systems and scalability patterns. Focus on architectural decisions and trade-offs."

Technical - Data Engineers: "Target audience: data engineers experienced with data pipelines, ETL processes, and big data technologies."

Technical - DevOps/SRE: "Target audience: DevOps engineers and SREs familiar with infrastructure automation and reliability engineering."

Semi-Technical - Product Managers: "Target audience: product managers with technical awareness but without deep engineering expertise. Balance technical detail with business context."

Semi-Technical - Technical Project Managers: "Target audience: technical project managers who understand development workflows but may not code regularly."

Non-Technical - Business Stakeholders: "Target audience: non-technical business stakeholders. Avoid jargon and use clear, accessible language."

Non-Technical - C-Level Executives: "Target audience: C-level executives who need high-level insights and business impact. Focus on strategic implications rather than technical details."

Non-Technical - Marketing/Sales Teams: "Target audience: marketing and sales professionals who need to understand capabilities without implementation details."

Students/Learners - Beginners: "Target audience: beginners with little to no prior knowledge. Use simple language, provide context, and include educational explanations."

Students/Learners - Intermediate: "Target audience: intermediate learners with foundational knowledge seeking to deepen understanding."

Students/Learners - Advanced: "Target audience: advanced learners or practitioners looking for expert-level insights and nuanced understanding."

General Public: "Target audience: general public with no specialized knowledge. Use everyday language and analogies. Avoid all jargon."
```

---

### Section 8: Quality Controls
**Purpose:** Enable quality assurance features

**UI Elements:**
- Checkbox: "Enable self-reflection" (checked by default)
  - Helper text: "AI will review its own answer for errors and improvements"
- Checkbox: "Include anti-hallucination guidelines" (checked by default)
  - Helper text: "Instructs AI to cite sources, admit uncertainty, and avoid speculation"

---

### Section 9: Generation & Output
**Purpose:** Generate and display the final prompt

**UI Elements:**
- "Load Example" dropdown (above buttons):
  - "-- Select an Example --" (default, disabled)
  - "Code Security Review"
  - "Email Classification"
  - "Research Summary"
  - "API Documentation"
  - "User Story Writing"
- "Generate Prompt" button (large, primary color)
- "Clear All" button (secondary color, with confirmation dialog)
- Large read-only textarea displaying generated prompt
  - Monospace font
  - Good contrast
  - Adequate height (20-30 lines)
- "Copy to Clipboard" button
  - Shows "Copied!" confirmation for 2 seconds after clicking
- Character count display for generated prompt

---

## Prompt Generation Logic

When "Generate Prompt" is clicked, validate that Instructions field is not empty. If empty, show error message and highlight the field.

Then construct the final prompt following this exact structure:
```
[If persona is selected and not "None"]
{Insert persona template text or custom text}

[blank line]

[If Chain-of-Thought is selected]
Think through this step-by-step:
{Insert chain-of-thought steps}
[If XML checkbox is checked, add on new line: "Show your reasoning in <thinking> tags before providing the final answer."]

[blank line]

[Always include - this is required]
{Insert instructions text}

[blank line]

[If input data is provided]
{Insert input data}

[blank line]

[If Few-shot is selected]
Here are examples of the desired output:

Example 1:
Input: {example 1 input}
Output: {example 1 output}

Example 2:
Input: {example 2 input}
Output: {example 2 output}

[Repeat for all examples]

Now, apply the same pattern to the following:

[blank line]

[If output format is provided]
Output format:
{Insert output format text}

[blank line]

[If additional context is provided]
Additional context:
{Insert additional context text}

[blank line]

[If audience is selected and not "General"]
{Insert audience template text or custom text}

[blank line]

[If self-reflection is enabled]
After providing your solution, perform a self-review:
1. Check for logical errors
2. Verify all requirements are met
3. Identify any assumptions made
4. Rate your confidence (1-10)

[blank line]

[If anti-hallucination is enabled]
Important guidelines:
- If you don't know something, explicitly say "I don't know"
- Cite specific sources when making factual claims
- Distinguish between facts and opinions
- State assumptions explicitly
- Only use well-documented, standard approaches
```

**Important:** Remove any extra blank lines. Each section should be separated by exactly one blank line. Trim whitespace from all inputs.

---

## Load Example Scenarios

### Example 1: Code Security Review
```
Persona: Security Engineer
Instructions: Review the following Python Flask endpoint for security issues. Prioritize critical vulnerabilities and provide specific recommendations.
Input Data: 
<code>
@app.route('/user/<id>')
def get_user(id):
    query = f"SELECT * FROM users WHERE id = {id}"
    user = db.execute(query)
    return jsonify(user)
</code>
Output Format: 
1. Vulnerability Summary (with severity levels)
2. Detailed Explanation of each issue
3. Secure Code Example
4. Additional Security Recommendations
Additional Context: This endpoint handles authentication-related user data. The application uses PostgreSQL database. Performance is critical (10k requests/minute).
Reasoning Method: Chain-of-Thought
CoT Steps:
1. Identify potential SQL injection vectors
2. Check for authentication and authorization issues
3. Evaluate data exposure risks
4. Consider input validation and sanitization
5. Review error handling
XML Tags: Checked
Audience: Technical - Software Developers
Self-reflection: Enabled
Anti-hallucination: Enabled
```

### Example 2: Email Classification
```
Persona: Data Scientist
Instructions: Classify the following email into one of these categories: Sales, Support, Billing, HR, General. Provide a confidence score and brief reasoning.
Input Data: [Email content will be inserted here]
Output Format: Category: [category name], Confidence: [percentage], Reasoning: [one sentence explanation]
Reasoning Method: Few-shot
Examples:
  Example 1:
    Input: Hi, I'd like to upgrade my subscription to the premium plan. What are my options?
    Output: Category: Billing, Confidence: 95%, Reasoning: Direct mention of subscription upgrade indicates billing inquiry
  Example 2:
    Input: My account isn't loading properly. I keep getting error 404 when I try to access the dashboard.
    Output: Category: Support, Confidence: 98%, Reasoning: Technical issue requiring troubleshooting assistance
  Example 3:
    Input: I'm interested in your enterprise solution for our team of 50 people. Can we schedule a demo?
    Output: Category: Sales, Confidence: 97%, Reasoning: New business opportunity with demo request
Audience: Semi-Technical - Product Managers
Self-reflection: Disabled
Anti-hallucination: Enabled
```

### Example 3: Research Summary
```
Persona: Business Analyst
Instructions: Summarize the current state of solid-state battery technology, focusing on commercial viability and recent breakthroughs.
Output Format:
## Executive Summary (3-4 sentences)
## Key Technologies
## Recent Breakthroughs (2023-2025)
## Commercial Readiness Assessment
## Major Players and Investments
## Timeline to Market
Additional Context: Focus on automotive applications. Include specific companies and their announced timelines. Data should be from credible sources.
Reasoning Method: Zero-shot
Audience: Non-Technical - C-Level Executives
Self-reflection: Enabled
Anti-hallucination: Enabled
```

### Example 4: API Documentation
```
Persona: Technical Writer
Instructions: Create comprehensive API documentation for the following endpoint. Include all necessary details for developers to successfully integrate this API.
Input Data:
<code>
POST /api/v1/users
Creates a new user account
Parameters: email (string, required), name (string, required), role (string, optional)
Returns: user object with id, created_at timestamp
Authentication: Bearer token required
Rate limit: 100 requests per hour
</code>
Output Format:
# Endpoint Overview
## HTTP Method and URL
## Description
## Authentication
## Request Parameters (table format)
## Request Example (curl and JavaScript)
## Response Format
## Response Example (JSON)
## Error Codes
## Rate Limits
Additional Context: REST API following OpenAPI 3.0 specification. Target framework: Node.js with Express. Must include examples in both curl and JavaScript fetch.
Reasoning Method: Zero-shot
Audience: Technical - Software Developers
Self-reflection: Enabled
Anti-hallucination: Enabled
```

### Example 5: User Story Writing
```
Persona: Product Manager
Instructions: Write a detailed user story with acceptance criteria for the described feature. Follow standard Agile format.
Input Data: Feature request: Allow users to export their data in CSV format from the dashboard. Users should be able to select date ranges and specific data fields to include.
Output Format:
**User Story:**
As a [user type]
I want [goal]
So that [benefit]

**Acceptance Criteria:**
- [ ] Criterion 1
- [ ] Criterion 2
[etc.]

**Technical Notes:**
[Any technical considerations]
Additional Context: B2B SaaS product. GDPR compliance required (data export is a regulatory requirement). Target implementation: Q2 2025. Current tech stack: React frontend, Python Django backend.
Reasoning Method: Few-shot
Examples:
  Example 1:
    Input: Feature: Dark mode toggle
    Output: 
    **User Story:**
    As a user who works late hours
    I want to switch the interface to dark mode
    So that I can reduce eye strain and work more comfortably
    
    **Acceptance Criteria:**
    - [ ] Toggle switch appears in user settings menu
    - [ ] Dark mode preference persists across sessions
    - [ ] Mode change applies immediately without page reload
    - [ ] All UI components render properly in dark mode
    
    **Technical Notes:**
    Use CSS custom properties for theming. Store preference in localStorage.
  Example 2:
    Input: Feature: Password reset via email
    Output:
    **User Story:**
    As a user who forgot my password
    I want to reset it using my email address
    So that I can regain access to my account securely
    
    **Acceptance Criteria:**
    - [ ] Reset link sent to registered email within 1 minute
    - [ ] Link expires after 24 hours
    - [ ] User must create a new password (cannot reuse old one)
    - [ ] Confirmation email sent after successful reset
    
    **Technical Notes:**
    Use secure token generation. Implement rate limiting to prevent abuse.
Audience: Semi-Technical - Technical Project Managers
Self-reflection: Enabled
Anti-hallucination: Disabled
```

---

## Styling Requirements

### Color Scheme
- Primary color: Professional blue (#2563eb or similar)
- Secondary color: Gray (#6b7280 or similar)
- Background: Light gray (#f9fafb)
- Section backgrounds: White with subtle borders
- Success: Green (#10b981)
- Error: Red (#ef4444)

### Layout
- Maximum width: 1200px, centered
- Padding: 20-40px
- Section spacing: 20-30px between sections
- Responsive breakpoints:
  - Mobile: < 768px (stack everything)
  - Tablet: 768px - 1024px
  - Desktop: > 1024px

### Typography
- Headers: Sans-serif, bold, good hierarchy (h1, h2, h3)
- Body text: Sans-serif, readable size (16px base)
- Generated prompt output: Monospace font (Courier New, Monaco, or similar)
- Line height: 1.5-1.6 for readability

### Interactive Elements
- Buttons: Clear hover states, cursor pointer
- Inputs/textareas: Clear focus states with outline
- Disabled elements: Reduced opacity
- Transitions: 0.2-0.3s ease for smooth interactions

### Accessibility
- Color contrast ratio > 4.5:1
- Proper ARIA labels for screen readers
- Keyboard navigation support (tab order)
- Focus indicators visible
- Semantic HTML (section, article, header, main)

---

## JavaScript Functionality

### Dynamic Show/Hide
- Persona custom textarea: Show only when "Other (custom)" selected
- Few-shot examples: Show only when "Few-shot" selected
- Chain-of-thought fields: Show only when "Chain-of-Thought" selected
- Audience custom textarea: Show only when "Other (custom)" selected

### Few-Shot Examples Management
- Start with 2 example slots
- Add button creates new example slot (max 5 total)
- Remove button deletes an example (disabled when only 1 remains)
- Each example numbered automatically
- Smooth animation on add/remove

### Form Validation
- Check Instructions field is not empty before generating
- Show error message if validation fails
- Highlight invalid fields with red border

### Copy to Clipboard
- Use modern Clipboard API: `navigator.clipboard.writeText()`
- Show "Copied!" success message for 2 seconds
- Fallback for older browsers if needed

### Clear All
- Show confirmation dialog: "Are you sure you want to clear all fields?"
- If confirmed, reset entire form to defaults
- Scroll to top after clearing

### Load Example
- Populate all fields with the selected example data
- Show brief notification: "Loaded: [Example Name]"
- Clear any existing data before loading

### Character Count
- Display character count below generated prompt
- Update in real-time as prompt is generated
- Format: "X characters"

### Auto-scroll
- After generating prompt, smoothly scroll to the output textarea
- Use `scrollIntoView({ behavior: 'smooth' })`

---

## Code Quality Requirements

### HTML
- Valid HTML5
- Semantic tags (header, main, section, footer)
- Proper form structure (fieldset, legend where appropriate)
- Accessible labels (label elements or aria-label)

### CSS
- Embedded in `<style>` tag in `<head>`
- Well-organized sections with comments
- Use CSS custom properties for colors/spacing (optional but nice)
- Mobile-first or desktop-first approach (be consistent)
- No external stylesheets

### JavaScript
- Embedded in `<script>` tag before `</body>`
- Well-commented code
- Use const/let (no var)
- Named functions for clarity
- Event listeners properly attached
- No external scripts

### Comments
- Section headers in code (HTML, CSS, JS)
- Complex logic explained
- Clear function documentation
- Note any browser compatibility considerations

---

## Page Structure
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Prompt Engineering Wizard</title>
    <style>
        /* CSS here */
    </style>
</head>
<body>
    <header>
        <h1>AI Prompt Engineering Wizard</h1>
        <p>Build well-structured prompts following best practices</p>
    </header>

    <main>
        <form id="promptForm">
            <!-- Section 1: Persona -->
            <!-- Section 2: Instructions -->
            <!-- Section 3: Input Data -->
            <!-- Section 4: Output Format -->
            <!-- Section 5: Additional Context -->
            <!-- Section 6: Reasoning Method -->
            <!-- Section 7: Audience -->
            <!-- Section 8: Quality Controls -->
            <!-- Section 9: Generation -->
        </form>

        <section id="output">
            <!-- Generated prompt display -->
        </section>
    </main>

    <footer>
        <p>Built with vanilla HTML/CSS/JS • No frameworks required</p>
    </footer>

    <script>
        /* JavaScript here */
    </script>
</body>
</html>
```

---

## Implementation Notes

1. Start with the basic HTML structure and form sections
2. Add CSS styling for professional appearance
3. Implement JavaScript for:
   - Dynamic show/hide functionality
   - Prompt generation logic
   - Form validation
   - Copy to clipboard
   - Load examples
   - Clear form
4. Test on different screen sizes
5. Test keyboard navigation
6. Verify all examples load correctly

---

## Success Criteria

- ✅ All form sections render correctly
- ✅ Dropdowns show/hide custom textareas properly
- ✅ Few-shot examples can be added/removed dynamically
- ✅ Generate button creates properly formatted prompt
- ✅ All load examples populate fields correctly
- ✅ Copy to clipboard works and shows confirmation
- ✅ Clear all resets the form after confirmation
- ✅ Responsive on mobile, tablet, and desktop
- ✅ Accessible via keyboard
- ✅ Professional, clean appearance
- ✅ No console errors
- ✅ Works in modern browsers (Chrome, Firefox, Safari, Edge)
```
