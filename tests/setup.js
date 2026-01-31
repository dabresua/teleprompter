/**
 * Test Setup
 * 
 * Initializes mock window object and loads source files in dependency order.
 * This runs before each test file.
 */

// Create global window object for IIFE exports
global.window = {};

// Load source files in dependency order
// Config layer (pure data)
require('../src/js/config/constants.js');
require('../src/js/config/scenarios.js');

// Core layer (pure business logic)
require('../src/js/core/tokenCounter.js');
require('../src/js/core/promptGenerator.js');

// State layer
require('../src/js/state.js');

// Note: DOM layer (dom.js) and UI layer (ui/*.js) are NOT loaded
// because they require a real DOM. Those are tested separately with jsdom.

/**
 * Reset state before each test
 */
beforeEach(() => {
  // Reset mutable state
  if (typeof window.resetState === 'function') {
    window.resetState();
  }
});

/**
 * Export window for direct access in tests if needed
 */
module.exports = global.window;
