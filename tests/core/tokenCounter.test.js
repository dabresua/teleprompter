/**
 * Token Counter Tests
 * 
 * Tests for pure functions in src/js/core/tokenCounter.js
 */

describe('tokenCounter', () => {
  
  describe('calculateTokenCount', () => {
    
    test('returns 0 for 0 characters', () => {
      expect(window.calculateTokenCount(0)).toBe(0);
    });
    
    test('returns 1 for 1-4 characters (ceiling division)', () => {
      expect(window.calculateTokenCount(1)).toBe(1);
      expect(window.calculateTokenCount(2)).toBe(1);
      expect(window.calculateTokenCount(3)).toBe(1);
      expect(window.calculateTokenCount(4)).toBe(1);
    });
    
    test('returns 2 for 5-8 characters', () => {
      expect(window.calculateTokenCount(5)).toBe(2);
      expect(window.calculateTokenCount(8)).toBe(2);
    });
    
    test('calculates correctly for larger texts', () => {
      expect(window.calculateTokenCount(100)).toBe(25);
      expect(window.calculateTokenCount(1000)).toBe(250);
      expect(window.calculateTokenCount(4000)).toBe(1000);
    });
    
    test('handles edge case of exact multiples of 4', () => {
      expect(window.calculateTokenCount(12)).toBe(3);
      expect(window.calculateTokenCount(400)).toBe(100);
    });
    
  });
  
  describe('getTokenCountStatus', () => {
    
    test('returns green status for under 1000 tokens', () => {
      const result = window.getTokenCountStatus(500, 2000, false);
      expect(result.color).toBe('var(--text-light)');
      expect(result.message).toContain('500');
      expect(result.message).toContain('2000');
    });
    
    test('returns orange status for 1000-2000 tokens', () => {
      const result = window.getTokenCountStatus(1500, 6000, false);
      expect(result.color).toBe('orange');
      expect(result.message).toContain('1500');
    });
    
    test('returns red status for over 2000 tokens', () => {
      const result = window.getTokenCountStatus(2500, 10000, false);
      expect(result.color).toBe('var(--error)');
      expect(result.message).toContain('2500');
    });
    
    test('adds tilde prefix for live preview', () => {
      const result = window.getTokenCountStatus(500, 2000, true);
      expect(result.message).toContain('~');
    });
    
    test('does not add tilde for non-live display', () => {
      const result = window.getTokenCountStatus(500, 2000, false);
      expect(result.message).not.toMatch(/^~/);
    });
    
    test('boundary: exactly 1000 tokens is normal', () => {
      const result = window.getTokenCountStatus(1000, 4000, false);
      expect(result.color).toBe('var(--text-light)');
    });
    
    test('boundary: exactly 2000 tokens is orange', () => {
      const result = window.getTokenCountStatus(2000, 8000, false);
      expect(result.color).toBe('orange');
    });
    
    test('boundary: 2001 tokens is red', () => {
      const result = window.getTokenCountStatus(2001, 8004, false);
      expect(result.color).toBe('var(--error)');
    });
    
  });
  
  describe('calculateLiveCharCount', () => {
    
    test('returns overhead for empty form data', () => {
      const formData = {};
      const result = window.calculateLiveCharCount(formData);
      // Should return ~500 for overhead
      expect(result).toBe(500);
    });
    
    test('counts instructions length', () => {
      const formData = {
        instructions: 'Test instructions here'
      };
      const result = window.calculateLiveCharCount(formData);
      expect(result).toBe(500 + 'Test instructions here'.length);
    });
    
    test('counts all main content fields', () => {
      const formData = {
        instructions: '12345',
        inputData: '12345',
        outputFormat: '12345',
        additionalContext: '12345',
        formatPreferences: '12345',
        negativePrompts: '12345'
      };
      const result = window.calculateLiveCharCount(formData);
      // 6 fields * 5 chars + 500 overhead = 530
      expect(result).toBe(530);
    });
    
    test('counts persona from template', () => {
      const formData = {
        persona: 'Senior Software Engineer'
      };
      const result = window.calculateLiveCharCount(formData);
      const personaLength = window.personaTemplates['Senior Software Engineer'].length;
      expect(result).toBe(500 + personaLength);
    });
    
    test('counts custom persona text', () => {
      const formData = {
        persona: 'Other (custom)',
        personaCustom: 'Custom persona text'
      };
      const result = window.calculateLiveCharCount(formData);
      expect(result).toBe(500 + 'Custom persona text'.length);
    });
    
    test('ignores persona when set to None', () => {
      const formData = {
        persona: 'None (no persona)'
      };
      const result = window.calculateLiveCharCount(formData);
      expect(result).toBe(500);
    });
    
    test('counts audience from template', () => {
      const formData = {
        audience: 'Technical - Software Developers'
      };
      const result = window.calculateLiveCharCount(formData);
      const audienceLength = window.audienceTemplates['Technical - Software Developers'].length;
      expect(result).toBe(500 + audienceLength);
    });
    
    test('counts custom audience text', () => {
      const formData = {
        audience: 'Other (custom)',
        audienceCustom: 'Custom audience description'
      };
      const result = window.calculateLiveCharCount(formData);
      expect(result).toBe(500 + 'Custom audience description'.length);
    });
    
    test('ignores audience when set to General', () => {
      const formData = {
        audience: 'General (not specified)'
      };
      const result = window.calculateLiveCharCount(formData);
      expect(result).toBe(500);
    });
    
    test('counts CoT steps array', () => {
      const formData = {
        cotSteps: ['Step one', 'Step two', 'Step three']
      };
      const result = window.calculateLiveCharCount(formData);
      const stepsLength = 'Step one'.length + 'Step two'.length + 'Step three'.length;
      expect(result).toBe(500 + stepsLength);
    });
    
    test('handles undefined cotSteps gracefully', () => {
      const formData = {
        cotSteps: undefined
      };
      const result = window.calculateLiveCharCount(formData);
      expect(result).toBe(500);
    });
    
  });
  
});
