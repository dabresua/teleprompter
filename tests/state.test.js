/**
 * State Tests
 * 
 * Tests for state management in src/js/state.js
 */

describe('state', () => {
  
  describe('initial state values', () => {
    
    // Note: beforeEach in setup.js calls resetState() before each test
    
    test('exampleCount starts at 0', () => {
      expect(window.exampleCount).toBe(0);
    });
    
    test('validationCount starts at 0', () => {
      expect(window.validationCount).toBe(0);
    });
    
    test('validations starts as empty array', () => {
      expect(window.validations).toEqual([]);
      expect(Array.isArray(window.validations)).toBe(true);
    });
    
    test('cotStepCount starts at 0', () => {
      expect(window.cotStepCount).toBe(0);
    });
    
    test('draggedItem starts as null', () => {
      expect(window.draggedItem).toBeNull();
    });
    
  });
  
  describe('state mutation', () => {
    
    test('exampleCount can be incremented', () => {
      window.exampleCount = 3;
      expect(window.exampleCount).toBe(3);
    });
    
    test('validationCount can be incremented', () => {
      window.validationCount = 5;
      expect(window.validationCount).toBe(5);
    });
    
    test('validations can have items pushed', () => {
      window.validations.push({ id: 1, description: 'Test', impact: 'warning' });
      expect(window.validations).toHaveLength(1);
      expect(window.validations[0].description).toBe('Test');
    });
    
    test('cotStepCount can be incremented', () => {
      window.cotStepCount = 4;
      expect(window.cotStepCount).toBe(4);
    });
    
    test('draggedItem can be set to an object', () => {
      const mockElement = { id: 'validation-1' };
      window.draggedItem = mockElement;
      expect(window.draggedItem).toBe(mockElement);
    });
    
  });
  
  describe('resetState', () => {
    
    test('resetState function exists', () => {
      expect(typeof window.resetState).toBe('function');
    });
    
    test('resetState resets exampleCount to 0', () => {
      window.exampleCount = 10;
      window.resetState();
      expect(window.exampleCount).toBe(0);
    });
    
    test('resetState resets validationCount to 0', () => {
      window.validationCount = 10;
      window.resetState();
      expect(window.validationCount).toBe(0);
    });
    
    test('resetState clears validations array', () => {
      window.validations.push({ id: 1, description: 'Test' });
      window.validations.push({ id: 2, description: 'Test 2' });
      window.resetState();
      expect(window.validations).toEqual([]);
    });
    
    test('resetState resets cotStepCount to 0', () => {
      window.cotStepCount = 8;
      window.resetState();
      expect(window.cotStepCount).toBe(0);
    });
    
    test('resetState sets draggedItem to null', () => {
      window.draggedItem = { id: 'something' };
      window.resetState();
      expect(window.draggedItem).toBeNull();
    });
    
    test('resetState resets all state in single call', () => {
      // Mutate all state
      window.exampleCount = 5;
      window.validationCount = 3;
      window.validations = [{ id: 1 }, { id: 2 }];
      window.cotStepCount = 7;
      window.draggedItem = { element: true };
      
      // Reset
      window.resetState();
      
      // Verify all reset
      expect(window.exampleCount).toBe(0);
      expect(window.validationCount).toBe(0);
      expect(window.validations).toEqual([]);
      expect(window.cotStepCount).toBe(0);
      expect(window.draggedItem).toBeNull();
    });
    
  });
  
});
