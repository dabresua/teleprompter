/**
 * Pure business logic for prompt generation
 * Assembles prompt sections from form data
 * No DOM dependencies - can be unit tested
 */
(function() {
    'use strict';

    /**
     * Build persona section of prompt
     * @param {string} selectedPersona - Selected persona value
     * @param {string} customPersona - Custom persona text if applicable
     * @returns {string|null} Persona text or null
     */
    window.buildPersonaSection = function(selectedPersona, customPersona) {
        if (!selectedPersona || selectedPersona === 'None (no persona)') {
            return null;
        }
        
        if (selectedPersona === 'Other (custom)') {
            return customPersona ? customPersona.trim() : null;
        }
        
        return window.personaTemplates[selectedPersona] || null;
    };

    /**
     * Build audience section of prompt
     * @param {string} selectedAudience - Selected audience value
     * @param {string} customAudience - Custom audience text if applicable
     * @returns {string|null} Audience text or null
     */
    window.buildAudienceSection = function(selectedAudience, customAudience) {
        if (!selectedAudience || selectedAudience === 'General (not specified)') {
            return null;
        }
        
        if (selectedAudience === 'Other (custom)') {
            return customAudience ? customAudience.trim() : null;
        }
        
        return window.audienceTemplates[selectedAudience] || null;
    };

    /**
     * Build system constraints section
     * @param {Object} constraints - Object with responseLength, toneStyle, formatPreferences
     * @returns {string|null} Constraints section or null
     */
    window.buildConstraintsSection = function(constraints) {
        var responseLength = constraints.responseLength;
        var toneStyle = constraints.toneStyle;
        var formatPreferences = (constraints.formatPreferences || '').trim();
        
        if (!responseLength && !toneStyle && !formatPreferences) {
            return null;
        }
        
        var section = 'System Constraints:';
        
        if (responseLength && window.responseLengthTexts[responseLength]) {
            section += '\n- Length: ' + window.responseLengthTexts[responseLength];
        }
        
        if (toneStyle) {
            section += '\n- Tone: ' + toneStyle.charAt(0).toUpperCase() + toneStyle.slice(1);
        }
        
        if (formatPreferences) {
            section += '\n- Format: ' + formatPreferences;
        }
        
        return section;
    };

    /**
     * Build safety and ethics section
     * @param {Object} options - Object with checkBias, accessibility, privacy, ethical flags
     * @returns {string|null} Safety section or null
     */
    window.buildSafetySection = function(options) {
        if (!options.checkBias && !options.accessibility && !options.privacy && !options.ethical) {
            return null;
        }
        
        var section = 'Safety & Ethics Considerations:';
        
        if (options.checkBias) {
            section += '\n- Check for and eliminate bias in recommendations';
        }
        if (options.accessibility) {
            section += '\n- Ensure solutions meet accessibility requirements (WCAG 2.1 AA minimum)';
        }
        if (options.privacy) {
            section += '\n- Address privacy and data protection concerns (GDPR compliance)';
        }
        if (options.ethical) {
            section += '\n- Consider and discuss ethical implications of the solution';
        }
        
        return section;
    };

    /**
     * Build chain-of-thought section
     * @param {Array} steps - Array of step description strings
     * @param {boolean} useXmlTags - Whether to include XML tag instruction
     * @returns {string|null} CoT section or null
     */
    window.buildCoTSection = function(steps, useXmlTags) {
        if (!steps || steps.length < window.MIN_COT_STEPS) {
            return null;
        }
        
        var section = 'Think through this step-by-step:';
        
        steps.forEach(function(desc, index) {
            if (desc && desc.trim()) {
                section += '\nStep ' + (index + 1) + ': ' + desc.trim();
            }
        });
        
        if (useXmlTags) {
            section += '\nShow your reasoning in <thinking> tags before providing the final answer.';
        }
        
        return section;
    };

    /**
     * Build few-shot examples section
     * @param {Array} examples - Array of {input, output} objects
     * @returns {string|null} Few-shot section or null
     */
    window.buildFewShotSection = function(examples) {
        if (!examples || examples.length === 0) {
            return null;
        }
        
        var hasContent = examples.some(function(ex) {
            return (ex.input && ex.input.trim()) || (ex.output && ex.output.trim());
        });
        
        if (!hasContent) {
            return null;
        }
        
        var section = 'Here are examples of the desired output:\n';
        
        examples.forEach(function(example, index) {
            if ((example.input && example.input.trim()) || (example.output && example.output.trim())) {
                section += '\nExample ' + (index + 1) + ':\n';
                section += 'Input: ' + (example.input || '').trim() + '\n';
                section += 'Output: ' + (example.output || '').trim();
                if (index < examples.length - 1) {
                    section += '\n';
                }
            }
        });
        
        section += '\n\nNow, apply the same pattern to the following:';
        return section;
    };

    /**
     * Build code-specific requirements section
     * @param {Object} options - Code options object
     * @returns {string|null} Code section or null
     */
    window.buildCodeSection = function(options) {
        var lang = (options.language || '').trim();
        var framework = (options.framework || '').trim();
        var tests = options.includeTests;
        var docs = options.includeDocs;
        var testFramework = (options.testFramework || '').trim();
        
        if (!lang && !framework && !tests && !docs) {
            return null;
        }
        
        var section = 'Code-Specific Requirements:';
        
        if (lang) {
            section += '\n- Programming Language: ' + lang;
        }
        if (framework) {
            section += '\n- Framework/Library: ' + framework;
        }
        if (tests) {
            section += '\n- Include comprehensive unit tests';
            if (testFramework) {
                section += ' using ' + testFramework;
            }
        }
        if (docs) {
            section += '\n- Include detailed documentation with docstrings and inline comments';
        }
        
        return section;
    };

    /**
     * Build research guidelines section
     * @param {Object} options - Research options flags
     * @returns {string|null} Research section or null
     */
    window.buildResearchSection = function(options) {
        if (!options.searchLatest && !options.citeSources && !options.compareSources && 
            !options.verifyFacts && !options.includeConfidence) {
            return null;
        }
        
        var section = 'Research Guidelines:';
        
        if (options.searchLatest) {
            section += '\n- Search for and incorporate the latest information before answering';
        }
        if (options.citeSources) {
            section += '\n- Cite specific sources with dates and URLs where applicable';
        }
        if (options.compareSources) {
            section += '\n- Compare information from multiple authoritative sources';
        }
        if (options.verifyFacts) {
            section += '\n- Verify facts before presenting them and flag any uncertain information';
        }
        if (options.includeConfidence) {
            section += '\n- Include confidence levels for key claims and findings';
        }
        
        return section;
    };

    /**
     * Build creative content guidelines section
     * @param {Object} options - Creative options
     * @returns {string|null} Creative section or null
     */
    window.buildCreativeSection = function(options) {
        var style = options.writingStyle;
        var pov = options.pointOfView;
        var wordCount = (options.wordCount || '').trim();
        var readingLevel = options.readingLevel;
        
        if (!style && !pov && !wordCount && !readingLevel) {
            return null;
        }
        
        var section = 'Creative Content Guidelines:';
        
        if (style) {
            section += '\n- Writing Style: ' + style;
        }
        if (pov) {
            section += '\n- Point of View: ' + pov;
        }
        if (wordCount) {
            section += '\n- Target Word Count: ' + wordCount;
        }
        if (readingLevel) {
            section += '\n- Reading Level: ' + readingLevel;
        }
        
        return section;
    };

    /**
     * Build validation conditions section
     * @param {Array} validations - Array of {description, impact} objects
     * @returns {string|null} Validation section or null
     */
    window.buildValidationSection = function(validations) {
        if (!validations || validations.length === 0) {
            return null;
        }
        
        var hasContent = validations.some(function(v) {
            return v.description && v.description.trim();
        });
        
        if (!hasContent) {
            return null;
        }
        
        var section = 'Success Criteria - Validate that the response meets these conditions:';
        
        validations.forEach(function(validation, index) {
            if (validation.description && validation.description.trim()) {
                var impactLabel = validation.impact === 'blocking' ? '[REQUIRED]' : '[RECOMMENDED]';
                section += '\n' + (index + 1) + '. ' + impactLabel + ' ' + validation.description.trim();
            }
        });
        
        return section;
    };

    /**
     * Build iterative refinement section
     * @param {Object} options - Iterative options flags
     * @returns {string|null} Iterative section or null
     */
    window.buildIterativeSection = function(options) {
        if (!options.askClarifying && !options.provideAlternatives && !options.requestFeedback && 
            !options.suggestImprovements && !options.identifyAssumptions) {
            return null;
        }
        
        var section = 'Iterative Approach:';
        
        if (options.askClarifying) {
            section += '\n- Ask clarifying questions before providing the final answer if anything is ambiguous';
        }
        if (options.provideAlternatives) {
            section += '\n- Provide multiple solution approaches or alternatives when applicable';
        }
        if (options.requestFeedback) {
            section += '\n- Request feedback and be prepared to iterate based on responses';
        }
        if (options.suggestImprovements) {
            section += '\n- Proactively suggest improvements or optimizations';
        }
        if (options.identifyAssumptions) {
            section += '\n- Clearly identify any assumptions made and ask for confirmation';
        }
        
        return section;
    };

    /**
     * Build quality control sections
     * @param {boolean} selfReflection - Enable self-reflection
     * @param {boolean} antiHallucination - Enable anti-hallucination guidelines
     * @returns {Array} Array of quality control section strings
     */
    window.buildQualityControlSections = function(selfReflection, antiHallucination) {
        var sections = [];
        
        if (selfReflection) {
            sections.push('After providing your solution, perform a self-review:\n1. Check for logical errors\n2. Verify all requirements are met\n3. Identify any assumptions made\n4. Rate your confidence (1-10)');
        }
        
        if (antiHallucination) {
            sections.push('Important guidelines:\n- If you don\'t know something, explicitly say "I don\'t know"\n- Cite specific sources when making factual claims\n- Distinguish between facts and opinions\n- State assumptions explicitly\n- Only use well-documented, standard approaches');
        }
        
        return sections;
    };

    /**
     * Assemble complete prompt from all sections
     * @param {Object} formData - Complete form data object
     * @returns {string} Assembled prompt
     */
    window.assemblePrompt = function(formData) {
        var sections = [];
        
        // 1. Persona
        var persona = window.buildPersonaSection(formData.persona, formData.personaCustom);
        if (persona) sections.push(persona);
        
        // 2. Audience
        var audience = window.buildAudienceSection(formData.audience, formData.audienceCustom);
        if (audience) sections.push(audience);
        
        // 3. System Constraints
        var constraints = window.buildConstraintsSection({
            responseLength: formData.responseLength,
            toneStyle: formData.toneStyle,
            formatPreferences: formData.formatPreferences
        });
        if (constraints) sections.push(constraints);
        
        // 4. Safety & Ethics
        var safety = window.buildSafetySection({
            checkBias: formData.checkBias,
            accessibility: formData.accessibility,
            privacy: formData.privacy,
            ethical: formData.ethical
        });
        if (safety) sections.push(safety);
        
        // 5. Additional Context
        if (formData.additionalContext && formData.additionalContext.trim()) {
            sections.push('Additional context:\n' + formData.additionalContext.trim());
        }
        
        // 6. Input Data
        if (formData.inputData && formData.inputData.trim()) {
            sections.push(formData.inputData.trim());
        }
        
        // 7. Instructions (always included)
        if (formData.instructions && formData.instructions.trim()) {
            sections.push(formData.instructions.trim());
        }
        
        // 8. Reasoning Method
        if (formData.reasoning === 'chain-of-thought') {
            var cot = window.buildCoTSection(formData.cotSteps, formData.cotXmlTags);
            if (cot) sections.push(cot);
        } else if (formData.reasoning === 'few-shot') {
            var fewShot = window.buildFewShotSection(formData.examples);
            if (fewShot) sections.push(fewShot);
        }
        
        // 9. Code-Specific Options
        var code = window.buildCodeSection({
            language: formData.programmingLanguage,
            framework: formData.framework,
            includeTests: formData.includeTests,
            includeDocs: formData.includeDocs,
            testFramework: formData.testFramework
        });
        if (code) sections.push(code);
        
        // 10. Research Instructions
        var research = window.buildResearchSection({
            searchLatest: formData.searchLatest,
            citeSources: formData.citeSources,
            compareSources: formData.compareSources,
            verifyFacts: formData.verifyFacts,
            includeConfidence: formData.includeConfidence
        });
        if (research) sections.push(research);
        
        // 11. Creative Content Options
        var creative = window.buildCreativeSection({
            writingStyle: formData.writingStyle,
            pointOfView: formData.pointOfView,
            wordCount: formData.wordCount,
            readingLevel: formData.readingLevel
        });
        if (creative) sections.push(creative);
        
        // 12. Output Format
        if (formData.outputFormat && formData.outputFormat.trim()) {
            sections.push('Output format:\n' + formData.outputFormat.trim());
        }
        
        // 13. Quality Controls
        var qualityControls = window.buildQualityControlSections(formData.selfReflection, formData.antiHallucination);
        qualityControls.forEach(function(section) {
            sections.push(section);
        });
        
        // 14. Validation Conditions
        var validation = window.buildValidationSection(formData.validations);
        if (validation) sections.push(validation);
        
        // 15. Negative Prompting
        if (formData.negativePrompts && formData.negativePrompts.trim()) {
            sections.push('IMPORTANT - Do NOT:\n' + formData.negativePrompts.trim());
        }
        
        // 16. Iterative Refinement
        var iterative = window.buildIterativeSection({
            askClarifying: formData.askClarifying,
            provideAlternatives: formData.provideAlternatives,
            requestFeedback: formData.requestFeedback,
            suggestImprovements: formData.suggestImprovements,
            identifyAssumptions: formData.identifyAssumptions
        });
        if (iterative) sections.push(iterative);
        
        return sections.join('\n\n');
    };

    /**
     * Validate that instructions field is not empty
     * @param {string} instructions - Instructions text
     * @returns {boolean} True if valid
     */
    window.validateInstructions = function(instructions) {
        return instructions && instructions.trim().length > 0;
    };

    /**
     * Format markdown export content
     * @param {string} prompt - Generated prompt
     * @returns {string} Markdown formatted content
     */
    window.formatMarkdownExport = function(prompt) {
        return '# AI Agent Requirements\n\n## Generated Prompt\n\n' + prompt + '\n\n---\n\n*Generated by AI Prompt Engineering Wizard on ' + new Date().toLocaleDateString() + '*\n';
    };

})();
