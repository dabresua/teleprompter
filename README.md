# AI Prompt Engineering Wizard

A single-page HTML application for building well-structured AI prompts following prompt engineering best practices. No frameworks, no dependencies — just open `index.html` in your browser and start crafting better prompts.

![AI Prompt Engineering Wizard](https://github.com/user-attachments/assets/6ddeb95c-1e61-4b62-8d55-cfe41c5e3cbc)

## 🚀 Quick Start

1. **Download**: Clone this repository or download `index.html`
2. **Open**: Open `index.html` in any modern web browser
3. **Use**: Select an example or start building your prompt from scratch

No installation, no build process, no server required!

## ✨ Features

### 📋 9 Comprehensive Form Sections

1. **Persona Definition** - Define the AI's role and expertise
   - 11 predefined personas (Software Engineer, Security Engineer, Data Scientist, etc.)
   - Custom persona option

2. **Instructions** (Required) - Describe the main task
   - Clear task description
   - Validation ensures this is always provided

3. **Input Data** - Provide content to be processed
   - Support for XML-tagged data (`<code>`, `<document>`, `<data>`)
   - Optional field

4. **Output Format** - Specify desired response structure
   - Define exactly how you want the output formatted
   - Optional field

5. **Additional Context** - Constraints and requirements
   - Technical constraints
   - Requirements and background information
   - Optional field

6. **Reasoning Method** - Choose AI's approach
   - **Zero-shot**: Direct prompting without examples (default)
   - **Few-shot**: Provide example input/output pairs (up to 5 examples)
   - **Chain-of-Thought**: Step-by-step reasoning with optional XML tags

7. **Audience** - Define who will read the output
   - 13 predefined audience types
   - Technical, semi-technical, and non-technical options
   - Custom audience option

8. **Quality Controls** - Enable quality features
   - Self-reflection (AI reviews its own answer)
   - Anti-hallucination guidelines (cite sources, admit uncertainty)

9. **Generate & Output** - Create your prompt
   - Generate button with validation
   - Copy to clipboard
   - Character count
   - Clear all with confirmation

### 🎯 8 Pre-configured Example Scenarios

Load complete examples with one click to see best practices in action:

#### 1. Code Security Review
**Use for**: Security analysis of code
- **Persona**: Security Engineer
- **Method**: Chain-of-Thought
- **Includes**: SQL injection example, security checklist
- **Audience**: Software Developers

![Security Review Example](https://github.com/user-attachments/assets/f4a7270f-b1f5-4019-a104-16de7a77eba3)

#### 2. Email Classification
**Use for**: Categorizing text or data
- **Persona**: Data Scientist
- **Method**: Few-shot (3 examples)
- **Includes**: Email classification examples with confidence scores
- **Audience**: Product Managers

#### 3. Research Summary
**Use for**: Summarizing complex topics
- **Persona**: Business Analyst
- **Method**: Zero-shot
- **Focus**: Executive-level summaries
- **Audience**: C-Level Executives

#### 4. API Documentation
**Use for**: Creating technical documentation
- **Persona**: Technical Writer
- **Method**: Zero-shot
- **Includes**: REST API endpoint documentation template
- **Audience**: Software Developers

#### 5. User Story Writing
**Use for**: Agile user stories and acceptance criteria
- **Persona**: Product Manager
- **Method**: Few-shot (2 examples)
- **Includes**: Standard Agile format with examples
- **Audience**: Technical Project Managers

#### 6. Software Feature Request
**Use for**: Analyzing and specifying new features
- **Persona**: Product Manager
- **Method**: Chain-of-Thought
- **Includes**: Real-time collaboration feature example
- **Audience**: Product Managers

#### 7. Bug Analysis
**Use for**: Debugging and root cause analysis
- **Persona**: Senior Software Engineer
- **Method**: Chain-of-Thought
- **Includes**: File upload crash example with error logs
- **Audience**: Software Developers

#### 8. Project Familiarization
**Use for**: AI agent onboarding to a codebase
- **Persona**: Senior Software Engineer
- **Method**: Zero-shot
- **Purpose**: Help AI understand project for future collaboration
- **Audience**: Software Developers

### 🎨 Design & User Experience

- **Responsive Design**: Works on mobile, tablet, and desktop
- **Professional Styling**: Modern gradient header, clean card-based sections
- **Accessibility**: ARIA labels, keyboard navigation, WCAG 2.1 AA compliant
- **Dark Theme Output**: Generated prompts displayed in dark-themed code area
- **Smooth Interactions**: Transitions, hover effects, auto-scroll to output

![Mobile Responsive View](https://github.com/user-attachments/assets/8f95b849-3d0c-4831-8665-aac05fdb8412)

## 🛠️ How to Use

### Basic Workflow

1. **Choose a Persona** (optional)
   - Select from dropdown or create custom

2. **Write Instructions** (required)
   - Be specific about what you want the AI to do

3. **Add Context** (as needed)
   - Provide input data, output format, constraints

4. **Select Reasoning Method**
   - Zero-shot for direct tasks
   - Few-shot when you have examples
   - Chain-of-Thought for complex reasoning

5. **Configure Quality Controls**
   - Enable self-reflection for critical tasks
   - Use anti-hallucination for factual accuracy

6. **Generate**
   - Click "Generate Prompt"
   - Copy to clipboard
   - Use with your favorite AI model

### Using Few-Shot Examples

When you select "Few-shot" reasoning:
- Start with 2 example slots
- Click "Add Another Example" to add more (max 5)
- Fill in both input and output for each example
- Examples demonstrate the pattern you want the AI to follow

### Using Chain-of-Thought

When you select "Chain-of-Thought" reasoning:
- List the reasoning steps you want the AI to follow
- Optionally enable XML tags (recommended)
- AI will show its thinking process before the final answer

### Form Validation

![Validation Error](https://github.com/user-attachments/assets/2f83c78a-39ed-4130-b909-b806c3cc9a52)

- Instructions field is required
- Empty instructions will show error message with red border
- Form won't generate until required fields are filled

## 📊 Persona Templates

The wizard includes 11 predefined persona templates:

| Persona | Expertise |
|---------|-----------|
| Senior Software Engineer | Architecture, design patterns, best practices |
| Security Engineer | Vulnerabilities, secure coding, threat modeling |
| Data Scientist | Statistical analysis, ML, data visualization |
| Product Manager | User needs, market dynamics, product strategy |
| Technical Writer | Clear documentation, technical concepts |
| UX Designer | User research, interaction design, usability |
| DevOps Engineer | CI/CD, infrastructure as code, automation |
| Business Analyst | Requirements, process optimization, business value |
| Marketing Specialist | Content strategy, audience segmentation |
| Creative Writer | Narrative techniques, storytelling |
| Teacher/Educator | Breaking down complex topics, clear explanations |

## 🎯 Audience Templates

Target your prompts for specific audiences:

### Technical Audiences
- Software Developers
- System Architects
- Data Engineers
- DevOps/SRE

### Semi-Technical Audiences
- Product Managers
- Technical Project Managers

### Non-Technical Audiences
- Business Stakeholders
- C-Level Executives
- Marketing/Sales Teams

### Learning Audiences
- Beginners
- Intermediate learners
- Advanced learners

### General
- General Public
- Custom (define your own)

## 🧪 Prompt Generation Logic

Generated prompts follow this exact structure:

```
[Persona Template]

[Chain-of-Thought Steps] (if selected)

[Instructions] (always included - required field)

[Input Data]

[Few-Shot Examples] (if selected)
- Example 1: Input/Output
- Example 2: Input/Output
- [etc.]
- "Now, apply the same pattern to the following:"

[Output Format]

[Additional Context]

[Audience Template]

[Self-Reflection Guidelines] (if enabled)

[Anti-Hallucination Guidelines] (if enabled)
```

Each section is separated by exactly one blank line. All whitespace is trimmed.

## 💻 Technical Details

- **Size**: ~54KB single HTML file
- **Dependencies**: None (pure vanilla JavaScript)
- **CSS**: Embedded with CSS custom properties
- **JavaScript**: ES6+, event-driven architecture
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)
- **Accessibility**: Semantic HTML5, ARIA labels, keyboard navigation

### Key Features Implementation

- **Dynamic Forms**: Show/hide based on selections
- **State Management**: JavaScript object for few-shot examples
- **Validation**: Client-side validation with error highlighting
- **Clipboard API**: Modern copy-to-clipboard functionality
- **Smooth UX**: Auto-scroll, transitions, notifications

## 📝 Example Use Cases

### For Software Development
- Code reviews and security audits
- Bug analysis and debugging
- API documentation
- Feature specifications
- Architecture decisions

### For Product Management
- User story creation
- Feature request analysis
- Product requirement documents
- Stakeholder communications

### For Data & Analytics
- Data classification tasks
- Report generation
- Insight extraction
- Pattern recognition

### For AI Agent Development
- Project onboarding
- Codebase familiarization
- Context building for autonomous agents

## 🤝 Contributing

This is a single-file application for simplicity. To contribute:

1. Fork the repository
2. Edit `index.html`
3. Test in multiple browsers
4. Submit a pull request

## 📄 License

Open source - use freely for any purpose.

## 🔗 Resources

- [REQUIREMENTS.md](REQUIREMENTS.md) - Detailed specification
- [Prompt Engineering Guide](https://www.promptingguide.ai/) - Learn more about prompt engineering
- [Anthropic's Prompting Guide](https://docs.anthropic.com/claude/docs/prompt-engineering) - Best practices

## 🎓 Tips for Better Prompts

1. **Be Specific**: Clear instructions lead to better results
2. **Use Examples**: Few-shot learning significantly improves quality
3. **Define Structure**: Specify exact output format you need
4. **Add Context**: More relevant information = better responses
5. **Iterate**: Use the wizard to refine and improve prompts
6. **Test Different Methods**: Try zero-shot, few-shot, and chain-of-thought
7. **Enable Quality Controls**: Self-reflection catches errors

---

Built with vanilla HTML/CSS/JS • No frameworks required