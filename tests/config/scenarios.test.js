/**
 * Config Scenarios Tests
 * 
 * Tests for data integrity in src/js/config/scenarios.js
 */

describe('config/scenarios', () => {
  
  describe('exampleScenarios', () => {
    
    test('is defined and is an object', () => {
      expect(window.exampleScenarios).toBeDefined();
      expect(typeof window.exampleScenarios).toBe('object');
    });
    
    test('contains all expected scenario keys', () => {
      const expectedScenarios = [
        'code-security',
        'email-classification',
        'research-summary',
        'api-documentation',
        'user-story',
        'feature-request',
        'bug-analysis',
        'project-familiarization'
      ];
      
      expectedScenarios.forEach(scenario => {
        expect(window.exampleScenarios).toHaveProperty(scenario);
      });
    });
    
    test('has exactly 8 scenarios', () => {
      expect(Object.keys(window.exampleScenarios)).toHaveLength(8);
    });
    
  });
  
  describe('scenario schema validation', () => {
    
    const requiredFields = ['instructions', 'reasoning'];
    
    Object.entries(window.exampleScenarios || {}).forEach(([key, scenario]) => {
      
      describe(`scenario: ${key}`, () => {
        
        test('has instructions field', () => {
          expect(scenario).toHaveProperty('instructions');
          expect(typeof scenario.instructions).toBe('string');
          expect(scenario.instructions.length).toBeGreaterThan(0);
        });
        
        test('has valid reasoning type', () => {
          expect(scenario).toHaveProperty('reasoning');
          expect(['zero-shot', 'few-shot', 'chain-of-thought']).toContain(scenario.reasoning);
        });
        
        test('has persona if defined', () => {
          if (scenario.persona) {
            expect(typeof scenario.persona).toBe('string');
          }
        });
        
        test('has audience if defined', () => {
          if (scenario.audience) {
            expect(typeof scenario.audience).toBe('string');
          }
        });
        
        test('has cotSteps array for chain-of-thought reasoning', () => {
          if (scenario.reasoning === 'chain-of-thought') {
            expect(scenario).toHaveProperty('cotSteps');
            expect(Array.isArray(scenario.cotSteps)).toBe(true);
            expect(scenario.cotSteps.length).toBeGreaterThanOrEqual(2);
          }
        });
        
        test('has examples array for few-shot reasoning', () => {
          if (scenario.reasoning === 'few-shot') {
            expect(scenario).toHaveProperty('examples');
            expect(Array.isArray(scenario.examples)).toBe(true);
          }
        });
        
        test('selfReflection is boolean if defined', () => {
          if (scenario.selfReflection !== undefined) {
            expect(typeof scenario.selfReflection).toBe('boolean');
          }
        });
        
        test('antiHallucination is boolean if defined', () => {
          if (scenario.antiHallucination !== undefined) {
            expect(typeof scenario.antiHallucination).toBe('boolean');
          }
        });
        
      });
      
    });
    
  });
  
  describe('specific scenario content', () => {
    
    test('code-security scenario uses Security Engineer persona', () => {
      expect(window.exampleScenarios['code-security'].persona).toBe('Security Engineer');
    });
    
    test('code-security scenario uses chain-of-thought reasoning', () => {
      expect(window.exampleScenarios['code-security'].reasoning).toBe('chain-of-thought');
    });
    
    test('email-classification scenario uses few-shot reasoning', () => {
      expect(window.exampleScenarios['email-classification'].reasoning).toBe('few-shot');
    });
    
    test('research-summary scenario uses zero-shot reasoning', () => {
      expect(window.exampleScenarios['research-summary'].reasoning).toBe('zero-shot');
    });
    
    test('bug-analysis scenario has input data', () => {
      expect(window.exampleScenarios['bug-analysis']).toHaveProperty('inputData');
      expect(window.exampleScenarios['bug-analysis'].inputData).toContain('bug_report');
    });
    
  });
  
});
