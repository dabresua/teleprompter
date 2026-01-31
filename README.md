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
make build      # Combine source files into index.html
make clean      # Remove generated index.html
make validate   # Show manual testing checklist
```

### Source File Structure

```
teleprompter/
├── index.html              # Generated output (do not edit directly)
├── old_index.html          # Reference file for validation
├── Makefile                # Build system
├── README.md
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

No Node.js, npm, or webpack required. Just standard Unix tools.

## Validation

After making changes, run the manual validation checklist:

```bash
make validate
```

This displays a checklist to compare the new `index.html` against `old_index.html`:

1. **Visual comparison**: Both should look identical
2. **All 8 scenarios**: Load each and verify generated prompts match
3. **Interactive features**: Collapsibles, add/remove buttons, drag-drop
4. **Form operations**: Generate, copy, export, clear
5. **Responsive design**: Test at various viewport widths

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
2. Run `make build`
3. Test changes in browser
4. Run `make validate` and complete the checklist
5. Commit both source files and generated `index.html`

## License

This project is provided as-is for educational and practical use.
