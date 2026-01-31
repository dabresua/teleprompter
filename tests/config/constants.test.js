/**
 * Config Constants Tests
 * 
 * Tests for data integrity in src/js/config/constants.js
 */

describe('config/constants', () => {
  
  describe('personaTemplates', () => {
    
    test('is defined and is an object', () => {
      expect(window.personaTemplates).toBeDefined();
      expect(typeof window.personaTemplates).toBe('object');
    });
    
    test('contains all expected personas', () => {
      const expectedPersonas = [
        'Senior Software Engineer',
        'Security Engineer',
        'Data Scientist',
        'Product Manager',
        'Technical Writer',
        'UX Designer',
        'DevOps Engineer',
        'Business Analyst',
        'Marketing Specialist',
        'Creative Writer',
        'Teacher/Educator'
      ];
      
      expectedPersonas.forEach(persona => {
        expect(window.personaTemplates).toHaveProperty(persona);
      });
    });
    
    test('all persona templates are non-empty strings', () => {
      Object.entries(window.personaTemplates).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
    
    test('has exactly 11 personas', () => {
      expect(Object.keys(window.personaTemplates)).toHaveLength(11);
    });
    
  });
  
  describe('audienceTemplates', () => {
    
    test('is defined and is an object', () => {
      expect(window.audienceTemplates).toBeDefined();
      expect(typeof window.audienceTemplates).toBe('object');
    });
    
    test('contains all expected audiences', () => {
      const expectedAudiences = [
        'Technical - Software Developers',
        'Technical - System Architects',
        'Technical - Data Engineers',
        'Technical - DevOps/SRE',
        'Semi-Technical - Product Managers',
        'Semi-Technical - Technical Project Managers',
        'Non-Technical - Business Stakeholders',
        'Non-Technical - C-Level Executives',
        'Non-Technical - Marketing/Sales Teams',
        'Students/Learners - Beginners',
        'Students/Learners - Intermediate',
        'Students/Learners - Advanced',
        'General Public'
      ];
      
      expectedAudiences.forEach(audience => {
        expect(window.audienceTemplates).toHaveProperty(audience);
      });
    });
    
    test('all audience templates are non-empty strings', () => {
      Object.entries(window.audienceTemplates).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
    
    test('has exactly 13 audiences', () => {
      expect(Object.keys(window.audienceTemplates)).toHaveLength(13);
    });
    
  });
  
  describe('constants', () => {
    
    test('MAX_EXAMPLES is defined and equals 5', () => {
      expect(window.MAX_EXAMPLES).toBeDefined();
      expect(window.MAX_EXAMPLES).toBe(5);
    });
    
    test('MIN_COT_STEPS is defined and equals 2', () => {
      expect(window.MIN_COT_STEPS).toBeDefined();
      expect(window.MIN_COT_STEPS).toBe(2);
    });
    
    test('MAX_COT_STEPS is defined and equals 10', () => {
      expect(window.MAX_COT_STEPS).toBeDefined();
      expect(window.MAX_COT_STEPS).toBe(10);
    });
    
    test('MIN_COT_STEPS is less than MAX_COT_STEPS', () => {
      expect(window.MIN_COT_STEPS).toBeLessThan(window.MAX_COT_STEPS);
    });
    
  });
  
  describe('responseLengthTexts', () => {
    
    test('is defined and is an object', () => {
      expect(window.responseLengthTexts).toBeDefined();
      expect(typeof window.responseLengthTexts).toBe('object');
    });
    
    test('contains all expected response lengths', () => {
      const expectedLengths = ['brief', 'moderate', 'detailed', 'comprehensive'];
      
      expectedLengths.forEach(length => {
        expect(window.responseLengthTexts).toHaveProperty(length);
      });
    });
    
    test('all response length texts are non-empty strings', () => {
      Object.entries(window.responseLengthTexts).forEach(([key, value]) => {
        expect(typeof value).toBe('string');
        expect(value.length).toBeGreaterThan(0);
      });
    });
    
    test('has exactly 4 response length options', () => {
      expect(Object.keys(window.responseLengthTexts)).toHaveLength(4);
    });
    
  });
  
});
