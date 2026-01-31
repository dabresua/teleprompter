# AI Prompt Engineering Wizard - Build System
#
# This Makefile builds a standalone index.html from modular source files.
# The final output works offline with no external dependencies.
#
# Usage:
#   make build    - Build index.html from source files
#   make clean    - Remove generated index.html
#   make test     - Run unit tests
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

.PHONY: all build clean test test-coverage help

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

# Run unit tests
test:
	@if [ ! -d "node_modules" ]; then \
		echo "Installing test dependencies..."; \
		npm install --silent; \
	fi
	@npm test

# Run tests with coverage report
test-coverage:
	@if [ ! -d "node_modules" ]; then \
		echo "Installing test dependencies..."; \
		npm install --silent; \
	fi
	@npm test -- --coverage

# Help message
help:
	@echo ""
	@echo "AI Prompt Engineering Wizard - Build System"
	@echo ""
	@echo "Available targets:"
	@echo "  make build         - Build index.html from source files"
	@echo "  make clean         - Remove generated index.html"
	@echo "  make test          - Run unit tests"
	@echo "  make test-coverage - Run tests with coverage report"
	@echo "  make help          - Show this help message"
	@echo ""
	@echo "Source structure:"
	@echo "  src/template.html     - HTML template with {{CSS}} and {{JS}} placeholders"
	@echo "  src/css/              - CSS files (variables, header, layout, forms, components)"
	@echo "  src/js/config/        - Configuration constants and scenarios"
	@echo "  src/js/core/          - Pure business logic (testable without DOM)"
	@echo "  src/js/ui/            - UI manipulation functions"
	@echo "  src/js/               - State, DOM refs, events, app initialization"
	@echo "  tests/                - Unit tests (run with make test)"
	@echo "
