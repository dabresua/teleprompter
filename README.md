# AI Prompt Engineering Wizard

A standalone tool for building well-structured prompts following best practices. Works entirely offline with no external dependencies.

## Quick Start

```bash
# Build the single-file index.html
make build

# Open in browser
open index.html
# or on Linux:
xdg-open index.html
```

## Features

- **17 configurable sections** covering persona, instructions, output format, reasoning methods, and more
- **8 pre-built example scenarios** (code security, API docs, user stories, etc.)
- **Real-time token counting** with color-coded status
- **Chain-of-Thought support** with customizable reasoning steps
- **Few-shot examples** with add/remove functionality
- **Validation conditions** with drag-and-drop reordering
- **Export options**: Copy to clipboard or download as REQUIREMENTS.md
- **Zero dependencies**: Works offline via file:// protocol

## Development Workflow

### Building

```bash
make build         # Combine source files into index.html
make clean         # Remove generated index.html
make test          # Run unit tests
make test-coverage # Run tests with coverage report
```

### Source File Structure

```
teleprompter/
├── index.html              # Generated output (do not edit directly)
├── Makefile                # Build system
├── package.json            # Test dependencies (Jest)
├── jest.config.js          # Jest configuration
├── README.md
├── tests/                  # Unit tests
│   ├── setup.js            # Test setup and mocking
│   ├── state.test.js
│   ├── core/
│   │   ├── tokenCounter.test.js
│   │   └── promptGenerator.test.js
│   └── config/
│       ├── constants.test.js
│       └── scenarios.test.js
└── src/
    ├── template.html       # HTML skeleton with {{CSS}} and {{JS}} placeholders
    ├── css/
    │   ├── variables.css   # CSS custom properties (colors, spacing)
    │   ├── header.css      # Header/footer styles
    │   ├── layout.css      # Layout, sections, responsive design
    │   ├── forms.css       # Form elements, inputs, selects
    │   └── components.css  # Buttons, collapsibles, notifications
    └── js/
        ├── config/
        │   ├── constants.js    # Persona/audience templates, settings
        │   └── scenarios.js    # 8 example scenarios
        ├── core/
        │   ├── tokenCounter.js   # Pure: token counting functions
        │   └── promptGenerator.js # Pure: prompt assembly functions
        ├── state.js            # Mutable state variables
        ├── dom.js              # Cached DOM element references
        ├── ui/
        │   ├── utils.js        # Notifications, toggles, live updates
        │   ├── examples.js     # Few-shot example management
        │   ├── cotSteps.js     # Chain-of-thought step management
        │   ├── validations.js  # Validation condition management
        │   ├── formActions.js  # Generate, export, copy, clear
        │   └── scenarioLoader.js # Load example scenarios
        ├── events.js           # Event listener setup
        └── app.js              # Entry point, initialization
```

### Architecture

**CSS Organization**: Feature-based separation
- `variables.css` - All CSS custom properties for theming
- Feature files for header, layout, forms, and components

**JavaScript Organization**: IIFE-wrapped modules
- All modules wrapped in immediately-invoked function expressions
- Exports via `window` namespace (e.g., `window.generatePrompt = generatePrompt`)
- Order-independent concatenation (no ES modules)

**Pure Functions** (in `core/`):
- No DOM access - can be unit tested with Node.js
- `tokenCounter.js`: `calculateTokenCount()`, `getTokenCountStatus()`
- `promptGenerator.js`: `buildPersonaSection()`, `assemblePrompt()`, etc.

**UI Functions** (in `ui/`):
- DOM manipulation, event handlers
- Depend on `state.js` and `dom.js`

### Build Process

1. `cat` concatenates all CSS files into a temporary file
2. `cat` concatenates all JS files into a temporary file
3. `awk` reads `template.html` and replaces:
   - `{{CSS}}` → concatenated CSS content
   - `{{JS}}` → concatenated JS content
4. Output written to `index.html`
5. Temporary files cleaned up

No webpack or bundler required. Just standard Unix tools.

## Testing

Unit tests cover the pure business logic in `core/` and `config/` modules.

### Running Tests

```bash
make test          # Run all unit tests
make test-coverage # Run tests with coverage report
```

On first run, this installs Jest via npm. Subsequent runs skip installation.

### Test Coverage

Tests focus on testable pure functions:

| Module | Functions Tested |
|--------|------------------|
| `core/tokenCounter.js` | `calculateTokenCount`, `getTokenCountStatus`, `calculateLiveCharCount` |
| `core/promptGenerator.js` | All 15 `build*` functions, `assemblePrompt`, `validateInstructions` |
| `config/constants.js` | Data integrity validation |
| `config/scenarios.js` | Schema validation for all 8 scenarios |
| `state.js` | Initial values, `resetState` |

DOM-dependent functions (`ui/`, `dom.js`, `events.js`) are not unit tested - they require browser integration testing.

## Design Decisions

### Why No ES Modules?
ES modules require a server (CORS restrictions on file://). This tool must work when double-clicked from the file system.

### Why IIFEs?
Immediately-invoked function expressions provide:
- Encapsulation (no global variable pollution)
- Order-independent loading (no import dependency graph)
- Explicit exports via window namespace

### Why Makefile?
- Available on all Unix-like systems
- No installation required (unlike npm, webpack, etc.)
- Simple text-based build rules
- Easy to understand and debug

### Why Feature-Based CSS?
Easier to locate styles related to specific UI elements. Each file is self-contained and focused on one area.

## Contributing

1. Edit files in `src/` directory
2. Run `make test` to verify changes don't break existing functionality
3. Run `make build` to generate `index.html`
4. Test changes in browser
5. Commit both source files and generated `index.html`

## License

This project is provided as-is for educational and practical use.
