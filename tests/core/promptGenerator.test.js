/**
 * Prompt Generator Tests
 * 
 * Tests for pure functions in src/js/core/promptGenerator.js
 */

describe('promptGenerator', () => {
  
  describe('buildPersonaSection', () => {
    
    test('returns null for empty persona', () => {
      expect(window.buildPersonaSection('', '')).toBeNull();
    });
    
    test('returns null for "None (no persona)"', () => {
      expect(window.buildPersonaSection('None (no persona)', '')).toBeNull();
    });
    
    test('returns XML-wrapped template text for known persona', () => {
      const result = window.buildPersonaSection('Senior Software Engineer', '');
      expect(result).toContain('<persona>');
      expect(result).toContain('</persona>');
      expect(result).toContain(window.personaTemplates['Senior Software Engineer']);
    });
    
    test('returns XML-wrapped custom text for "Other (custom)"', () => {
      const customText = 'You are a specialized AI assistant';
      const result = window.buildPersonaSection('Other (custom)', customText);
      expect(result).toContain('<persona>');
      expect(result).toContain(customText);
    });
    
    test('returns null for unknown persona not in templates', () => {
      const result = window.buildPersonaSection('Unknown Persona', '');
      expect(result).toBeNull();
    });
    
  });
  
  describe('buildAudienceSection', () => {
    
    test('returns null for empty audience', () => {
      expect(window.buildAudienceSection('', '')).toBeNull();
    });
    
    test('returns null for "General (not specified)"', () => {
      expect(window.buildAudienceSection('General (not specified)', '')).toBeNull();
    });
    
    test('returns XML-wrapped template text for known audience', () => {
      const result = window.buildAudienceSection('Technical - Software Developers', '');
      expect(result).toContain('<audience>');
      expect(result).toContain('</audience>');
      expect(result).toContain(window.audienceTemplates['Technical - Software Developers']);
    });
    
    test('returns XML-wrapped custom text for "Other (custom)"', () => {
      const customText = 'Target audience: medical professionals';
      const result = window.buildAudienceSection('Other (custom)', customText);
      expect(result).toContain('<audience>');
      expect(result).toContain(customText);
    });
    
  });
  
  describe('buildConstraintsSection', () => {
    
    test('returns null when no constraints provided', () => {
      const result = window.buildConstraintsSection({});
      expect(result).toBeNull();
    });
    
    test('returns null when all constraints are empty', () => {
      const result = window.buildConstraintsSection({
        responseLength: '',
        toneStyle: '',
        formatPreferences: ''
      });
      expect(result).toBeNull();
    });
    
    test('includes XML-wrapped response length when provided', () => {
      const result = window.buildConstraintsSection({
        responseLength: 'brief'
      });
      expect(result).toContain('<constraints>');
      expect(result).toContain('System Constraints:');
      expect(result).toContain(window.responseLengthTexts['brief']);
    });
    
    test('includes XML-wrapped tone style when provided', () => {
      const result = window.buildConstraintsSection({
        toneStyle: 'formal'
      });
      expect(result).toContain('<constraints>');
      expect(result).toContain('Formal');
    });
    
    test('includes format preferences when provided', () => {
      const result = window.buildConstraintsSection({
        formatPreferences: 'Use tables and bullet points'
      });
      expect(result).toContain('System Constraints:');
      expect(result).toContain('Use tables and bullet points');
    });
    
    test('combines all constraints when all provided', () => {
      const result = window.buildConstraintsSection({
        responseLength: 'detailed',
        toneStyle: 'technical',
        formatPreferences: 'Include code examples'
      });
      expect(result).toContain('System Constraints:');
      expect(result).toContain(window.responseLengthTexts['detailed']);
      expect(result).toContain('Technical');
      expect(result).toContain('Include code examples');
    });
    
  });
  
  describe('buildSafetySection', () => {
    
    test('returns null when no options enabled', () => {
      const result = window.buildSafetySection({
        checkBias: false,
        accessibility: false,
        privacy: false,
        ethical: false
      });
      expect(result).toBeNull();
    });
    
    test('includes XML-wrapped bias check when enabled', () => {
      const result = window.buildSafetySection({ checkBias: true });
      expect(result).toContain('<safety_ethics>');
      expect(result).toContain('Safety & Ethics');
      expect(result).toContain('bias');
    });
    
    test('includes accessibility when enabled', () => {
      const result = window.buildSafetySection({ accessibility: true });
      expect(result).toContain('accessibility');
    });
    
    test('includes privacy when enabled', () => {
      const result = window.buildSafetySection({ privacy: true });
      expect(result).toContain('privacy');
    });
    
    test('includes ethical when enabled', () => {
      const result = window.buildSafetySection({ ethical: true });
      expect(result).toContain('ethical');
    });
    
  });
  
  describe('buildCoTSection', () => {
    
    test('returns null for empty steps array', () => {
      const result = window.buildCoTSection([], true);
      expect(result).toBeNull();
    });
    
    test('returns null for steps below minimum', () => {
      const result = window.buildCoTSection(['Only one step'], true);
      expect(result).toBeNull();
    });
    
    test('builds XML-wrapped section for valid steps', () => {
      const steps = ['Analyze the input', 'Process the data', 'Generate output'];
      const result = window.buildCoTSection(steps, false);
      expect(result).toContain('<reasoning type="chain-of-thought">');
      expect(result).toContain('step-by-step');
      expect(result).toContain('Step 1:');
      expect(result).toContain('Step 2:');
      expect(result).toContain('Step 3:');
      expect(result).toContain('Analyze the input');
    });
    
    test('includes XML tag instruction when enabled', () => {
      const steps = ['Step 1', 'Step 2'];
      const result = window.buildCoTSection(steps, true);
      expect(result).toContain('<thinking>');
    });
    
    test('omits XML tag instruction when disabled', () => {
      const steps = ['Step 1', 'Step 2'];
      const result = window.buildCoTSection(steps, false);
      expect(result).not.toContain('<thinking>');
    });
    
  });
  
  describe('buildFewShotSection', () => {
    
    test('returns null for empty examples array', () => {
      const result = window.buildFewShotSection([]);
      expect(result).toBeNull();
    });
    
    test('returns null when all examples are empty', () => {
      const result = window.buildFewShotSection([
        { input: '', output: '' },
        { input: '  ', output: '  ' }
      ]);
      expect(result).toBeNull();
    });
    
    test('builds XML-wrapped section for valid examples', () => {
      const examples = [
        { input: 'Hello', output: 'Hi there!' },
        { input: 'Goodbye', output: 'See you later!' }
      ];
      const result = window.buildFewShotSection(examples);
      expect(result).toContain('<reasoning type="few-shot">');
      expect(result).toContain('examples');
      expect(result).toContain('Example 1');
      expect(result).toContain('Example 2');
      expect(result).toContain('Hello');
      expect(result).toContain('Hi there!');
    });
    
    test('includes call to action at end', () => {
      const examples = [{ input: 'Test', output: 'Result' }];
      const result = window.buildFewShotSection(examples);
      expect(result).toContain('apply the same pattern');
    });
    
  });
  
  describe('buildCodeSection', () => {
    
    test('returns null when no code options provided', () => {
      const result = window.buildCodeSection({});
      expect(result).toBeNull();
    });
    
    test('includes XML-wrapped programming language when provided', () => {
      const result = window.buildCodeSection({ language: 'Python' });
      expect(result).toContain('<code_requirements>');
      expect(result).toContain('Code-Specific');
      expect(result).toContain('Python');
    });
    
    test('includes framework when provided', () => {
      const result = window.buildCodeSection({ framework: 'React' });
      expect(result).toContain('React');
    });
    
    test('includes test instructions when enabled', () => {
      const result = window.buildCodeSection({ 
        includeTests: true,
        testFramework: 'Jest'
      });
      expect(result).toContain('test');
      expect(result).toContain('Jest');
    });
    
    test('includes documentation request when enabled', () => {
      const result = window.buildCodeSection({ includeDocs: true });
      expect(result).toContain('documentation');
    });
    
  });
  
  describe('buildResearchSection', () => {
    
    test('returns null when no research options enabled', () => {
      const result = window.buildResearchSection({});
      expect(result).toBeNull();
    });
    
    test('includes XML-wrapped search latest when enabled', () => {
      const result = window.buildResearchSection({ searchLatest: true });
      expect(result).toContain('<research_guidelines>');
      expect(result).toContain('Research Guidelines');
    });
    
    test('includes cite sources when enabled', () => {
      const result = window.buildResearchSection({ citeSources: true });
      expect(result).toContain('sources');
    });
    
    test('includes verify facts when enabled', () => {
      const result = window.buildResearchSection({ verifyFacts: true });
      expect(result).toContain('Verify');
    });
    
  });
  
  describe('buildCreativeSection', () => {
    
    test('returns null when no creative options provided', () => {
      const result = window.buildCreativeSection({});
      expect(result).toBeNull();
    });
    
    test('includes XML-wrapped writing style when provided', () => {
      const result = window.buildCreativeSection({ writingStyle: 'academic' });
      expect(result).toContain('<creative_guidelines>');
      expect(result).toContain('Creative Content');
      expect(result).toContain('academic');
    });
    
    test('includes point of view when provided', () => {
      const result = window.buildCreativeSection({ pointOfView: 'first-person' });
      expect(result).toContain('first-person');
    });
    
    test('includes word count when provided', () => {
      const result = window.buildCreativeSection({ wordCount: '500-1000' });
      expect(result).toContain('500-1000');
    });
    
    test('includes reading level when provided', () => {
      const result = window.buildCreativeSection({ readingLevel: 'college' });
      expect(result).toContain('college');
    });
    
  });
  
  describe('buildValidationSection', () => {
    
    test('returns null for empty validations array', () => {
      const result = window.buildValidationSection([]);
      expect(result).toBeNull();
    });
    
    test('returns null when all validations have empty descriptions', () => {
      const result = window.buildValidationSection([
        { description: '', impact: 'warning' }
      ]);
      expect(result).toBeNull();
    });
    
    test('builds XML-wrapped section for valid validations', () => {
      const validations = [
        { description: 'Must include code examples', impact: 'blocking' },
        { description: 'Should mention performance', impact: 'warning' }
      ];
      const result = window.buildValidationSection(validations);
      expect(result).toContain('<validation>');
      expect(result).toContain('Success Criteria');
      expect(result).toContain('Must include code examples');
      expect(result).toContain('REQUIRED');
      expect(result).toContain('RECOMMENDED');
    });
    
  });
  
  describe('buildIterativeSection', () => {
    
    test('returns null when no iterative options enabled', () => {
      const result = window.buildIterativeSection({});
      expect(result).toBeNull();
    });
    
    test('includes XML-wrapped clarifying questions when enabled', () => {
      const result = window.buildIterativeSection({ askClarifying: true });
      expect(result).toContain('<iterative_approach>');
      expect(result).toContain('Iterative Approach');
      expect(result).toContain('clarifying');
    });
    
    test('includes alternatives when enabled', () => {
      const result = window.buildIterativeSection({ provideAlternatives: true });
      expect(result).toContain('alternative');
    });
    
  });
  
  describe('buildQualityControlSections', () => {
    
    test('returns null when both disabled', () => {
      const result = window.buildQualityControlSections(false, false);
      expect(result).toBeNull();
    });
    
    test('returns XML-wrapped self-reflection section when enabled', () => {
      const result = window.buildQualityControlSections(true, false);
      expect(result).toContain('<quality>');
      expect(result).toContain('<self_review>');
      expect(result).toContain('review');
      expect(result).not.toContain('<anti_hallucination>');
    });
    
    test('returns XML-wrapped anti-hallucination section when enabled', () => {
      const result = window.buildQualityControlSections(false, true);
      expect(result).toContain('<quality>');
      expect(result).toContain('<anti_hallucination>');
      expect(result).toContain("don't know");
      expect(result).not.toContain('<self_review>');
    });
    
    test('returns XML-wrapped combined section when both enabled', () => {
      const result = window.buildQualityControlSections(true, true);
      expect(result).toContain('<quality>');
      expect(result).toContain('<self_review>');
      expect(result).toContain('<anti_hallucination>');
    });
    
  });
  
  describe('validateInstructions', () => {
    
    test('returns falsy for empty string', () => {
      expect(window.validateInstructions('')).toBeFalsy();
    });
    
    test('returns false for whitespace only', () => {
      expect(window.validateInstructions('   ')).toBeFalsy();
      expect(window.validateInstructions('\t\n')).toBeFalsy();
    });
    
    test('returns falsy for null/undefined', () => {
      expect(window.validateInstructions(null)).toBeFalsy();
      expect(window.validateInstructions(undefined)).toBeFalsy();
    });
    
    test('returns true for valid text', () => {
      expect(window.validateInstructions('Do something')).toBe(true);
    });
    
    test('returns true for text with leading/trailing whitespace', () => {
      expect(window.validateInstructions('  Valid text  ')).toBe(true);
    });
    
  });
  
  describe('formatMarkdownExport', () => {
    
    test('wraps prompt in markdown format', () => {
      const prompt = 'Test prompt content';
      const result = window.formatMarkdownExport(prompt);
      expect(result).toContain('# AI Agent Requirements');
      expect(result).toContain('## Generated Prompt');
      expect(result).toContain('Test prompt content');
    });
    
    test('includes generation date', () => {
      const result = window.formatMarkdownExport('Test');
      expect(result).toContain('Generated by AI Prompt Engineering Wizard');
    });
    
    test('handles empty prompt', () => {
      const result = window.formatMarkdownExport('');
      expect(result).toContain('# AI Agent Requirements');
    });
    
  });
  
  describe('assemblePrompt', () => {
    
    test('returns empty string for minimal empty form data', () => {
      const formData = {};
      const result = window.assemblePrompt(formData);
      expect(result).toBe('');
    });
    
    test('includes XML-wrapped instructions when provided', () => {
      const formData = {
        instructions: 'Write a function to sort an array'
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<instructions>');
      expect(result).toContain('Write a function to sort an array');
      expect(result).toContain('</instructions>');
    });
    
    test('includes XML-wrapped persona section', () => {
      const formData = {
        persona: 'Senior Software Engineer',
        instructions: 'Test'
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<persona>');
      expect(result).toContain(window.personaTemplates['Senior Software Engineer']);
    });
    
    test('includes XML-wrapped input data when provided', () => {
      const formData = {
        instructions: 'Analyze this',
        inputData: '<code>function test() {}</code>'
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<input_data>');
      expect(result).toContain('<code>function test() {}</code>');
    });
    
    test('includes XML-wrapped output format when provided', () => {
      const formData = {
        instructions: 'Test',
        outputFormat: '1. Summary\n2. Details'
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<output_format>');
      expect(result).toContain('1. Summary');
    });
    
    test('includes chain-of-thought for cot reasoning', () => {
      const formData = {
        instructions: 'Test',
        reasoning: 'chain-of-thought',
        cotSteps: ['Analyze', 'Process'],
        cotXmlTags: true
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<reasoning type="chain-of-thought">');
      expect(result).toContain('step-by-step');
    });
    
    test('includes few-shot examples for few-shot reasoning', () => {
      const formData = {
        instructions: 'Test',
        reasoning: 'few-shot',
        examples: [
          { input: 'A', output: 'B' }
        ]
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<reasoning type="few-shot">');
      expect(result).toContain('Example 1');
    });
    
    test('includes quality controls when enabled', () => {
      const formData = {
        instructions: 'Test',
        selfReflection: true,
        antiHallucination: true
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<quality>');
      expect(result).toContain('review');
    });
    
    test('includes XML-wrapped negative prompts when provided', () => {
      const formData = {
        instructions: 'Test',
        negativePrompts: 'Do not use deprecated APIs'
      };
      const result = window.assemblePrompt(formData);
      expect(result).toContain('<constraints_negative>');
      expect(result).toContain('Do not use deprecated APIs');
    });
    
    test('assembles complete prompt with all sections in correct order', () => {
      const formData = {
        persona: 'Security Engineer',
        audience: 'Technical - Software Developers',
        instructions: 'Review this code for vulnerabilities',
        inputData: '<code>user input here</code>',
        outputFormat: '1. Vulnerabilities\n2. Recommendations',
        additionalContext: 'Production environment',
        responseLength: 'detailed',
        toneStyle: 'technical',
        selfReflection: true,
        antiHallucination: true
      };
      const result = window.assemblePrompt(formData);
      
      // Check key sections are present with XML wrappers
      expect(result).toContain('<persona>');
      expect(result).toContain(window.personaTemplates['Security Engineer']);
      expect(result).toContain('<audience>');
      expect(result).toContain(window.audienceTemplates['Technical - Software Developers']);
      expect(result).toContain('<instructions>');
      expect(result).toContain('Review this code for vulnerabilities');
      expect(result).toContain('<input_data>');
      expect(result).toContain('<code>user input here</code>');
      expect(result).toContain('<output_format>');
      expect(result).toContain('1. Vulnerabilities');
      expect(result).toContain('<context>');
      expect(result).toContain('Production environment');
      expect(result).toContain('<quality>');
      
      // Verify audience comes before persona (matches HTML order)
      const audiencePos = result.indexOf('<audience>');
      const personaPos = result.indexOf('<persona>');
      expect(audiencePos).toBeLessThan(personaPos);
    });
    
  });
  
});
