# AI Prompt Engineering Wizard - Build System
#
# This Makefile builds a standalone index.html from modular source files.
# The final output works offline with no external dependencies.
#
# Usage:
#   make build    - Build index.html from source files
#   make clean    - Remove generated index.html
#   make validate - Show manual validation checklist
#   make help     - Show this help message

# Configuration
TEMPLATE := src/template.html
OUTPUT := index.html
REFERENCE := old_index.html

# CSS source files (order doesn't matter)
CSS_FILES := \
	src/css/variables.css \
	src/css/header.css \
	src/css/layout.css \
	src/css/forms.css \
	src/css/components.css

# JS source files (wrapped in IIFEs, order doesn't matter for functionality)
# but we load config first, then core logic, then UI, then events, then app
JS_FILES := \
	src/js/config/constants.js \
	src/js/config/scenarios.js \
	src/js/core/tokenCounter.js \
	src/js/core/promptGenerator.js \
	src/js/state.js \
	src/js/dom.js \
	src/js/ui/utils.js \
	src/js/ui/examples.js \
	src/js/ui/cotSteps.js \
	src/js/ui/validations.js \
	src/js/ui/formActions.js \
	src/js/ui/scenarioLoader.js \
	src/js/events.js \
	src/js/app.js

# Temporary files for build process
TMP_CSS := .tmp_css.txt
TMP_JS := .tmp_js.txt

.PHONY: all build clean validate help

# Default target
all: build

# Build index.html from template and source files
build:
	@echo "Building $(OUTPUT)..."
	@# Concatenate all CSS files
	@cat $(CSS_FILES) > $(TMP_CSS)
	@# Concatenate all JS files
	@cat $(JS_FILES) > $(TMP_JS)
	@# Read template, replace placeholders with file contents
	@awk ' \
		BEGIN { \
			while ((getline line < "$(TMP_CSS)") > 0) css = css line "\n"; \
			close("$(TMP_CSS)"); \
			while ((getline line < "$(TMP_JS)") > 0) js = js line "\n"; \
			close("$(TMP_JS)"); \
		} \
		/\{\{CSS\}\}/ { \
			sub(/\{\{CSS\}\}/, ""); \
			print css; \
			next; \
		} \
		/\{\{JS\}\}/ { \
			sub(/\{\{JS\}\}/, ""); \
			print js; \
			next; \
		} \
		{ print } \
	' $(TEMPLATE) > $(OUTPUT)
	@# Clean up temp files
	@rm -f $(TMP_CSS) $(TMP_JS)
	@echo "Build complete: $(OUTPUT)"
	@echo "Size: $$(wc -c < $(OUTPUT)) bytes"

# Remove generated files
clean:
	@echo "Cleaning..."
	@rm -f $(OUTPUT) $(TMP_CSS) $(TMP_JS)
	@echo "Clean complete"

# Manual validation checklist
validate:
	@echo ""
	@echo "========================================"
	@echo "  VALIDATION CHECKLIST"
	@echo "========================================"
	@echo ""
	@echo "Compare $(OUTPUT) against $(REFERENCE) for functional equivalence:"
	@echo ""
	@echo "1. BASIC FUNCTIONALITY"
	@echo "   [ ] Open both files in browser side-by-side"
	@echo "   [ ] Both load without JavaScript errors (check console)"
	@echo "   [ ] Visual appearance matches"
	@echo ""
	@echo "2. EXAMPLE SCENARIOS (test all 8)"
	@echo "   [ ] code-security - Load and generate prompt"
	@echo "   [ ] email-classification - Load and generate prompt"
	@echo "   [ ] research-summary - Load and generate prompt"
	@echo "   [ ] api-documentation - Load and generate prompt"
	@echo "   [ ] user-story - Load and generate prompt"
	@echo "   [ ] feature-request - Load and generate prompt"
	@echo "   [ ] bug-analysis - Load and generate prompt"
	@echo "   [ ] project-familiarization - Load and generate prompt"
	@echo ""
	@echo "3. INTERACTIVE FEATURES"
	@echo "   [ ] Token count updates live as you type"
	@echo "   [ ] Collapsible sections expand/collapse"
	@echo "   [ ] Few-shot examples: add/remove works"
	@echo "   [ ] Chain-of-thought: add/remove steps works"
	@echo "   [ ] Validation conditions: add/remove/reorder works"
	@echo "   [ ] Drag-drop reordering of validations works"
	@echo ""
	@echo "4. FORM OPERATIONS"
	@echo "   [ ] Generate Prompt button produces output"
	@echo "   [ ] Copy to Clipboard works"
	@echo "   [ ] Export to REQUIREMENTS.md downloads file"
	@echo "   [ ] Clear All resets form"
	@echo ""
	@echo "5. RESPONSIVE DESIGN"
	@echo "   [ ] Resize window - layout adapts properly"
	@echo "   [ ] Test at 768px width (mobile breakpoint)"
	@echo ""
	@echo "6. GENERATED PROMPT COMPARISON"
	@echo "   For each scenario, generated prompts should be identical"
	@echo "   (function order in JS doesn't matter, only output)"
	@echo ""
	@echo "========================================"
	@echo ""

# Help message
help:
	@echo ""
	@echo "AI Prompt Engineering Wizard - Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  make build    - Build index.html from source files"
	@echo "  make clean    - Remove generated index.html"
	@echo "  make validate - Show manual validation checklist"
	@echo "  make help     - Show this help message"
	@echo ""
	@echo "Source structure:"
	@echo "  src/template.html     - HTML template with {{CSS}} and {{JS}} placeholders"
	@echo "  src/css/              - CSS files (variables, header, layout, forms, components)"
	@echo "  src/js/config/        - Configuration constants and scenarios"
	@echo "  src/js/core/          - Pure business logic (testable without DOM)"
	@echo "  src/js/ui/            - UI manipulation functions"
	@echo "  src/js/               - State, DOM refs, events, app initialization"
	@echo ""
