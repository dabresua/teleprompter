/**
 * Jest Configuration
 * 
 * Tests run in Node.js environment with a mock window object.
 * Source files are loaded via tests/setup.js in dependency order.
 */
module.exports = {
  testEnvironment: 'node',
  
  // Setup file runs before each test file
  setupFilesAfterEnv: ['<rootDir>/tests/setup.js'],
  
  // Test file patterns
  testMatch: ['**/tests/**/*.test.js'],
  
  // Coverage configuration
  collectCoverageFrom: [
    'src/js/core/**/*.js',
    'src/js/config/**/*.js',
    'src/js/state.js'
  ],
  
  // Coverage thresholds for core logic
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80
    }
  },
  
  // Output format
  verbose: true
};
