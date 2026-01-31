/**
 * DOM element references
 * Cached references to frequently used DOM elements
 */
(function() {
    'use strict';

    // Initialize DOM references after DOM is ready
    window.initDomRefs = function() {
        // ===== Main Form Elements =====
        window.dom = {
            // Form
            promptForm: document.getElementById('promptForm'),
            
            // Persona
            personaSelect: document.getElementById('persona'),
            personaCustomContainer: document.getElementById('personaCustomContainer'),
            personaCustom: document.getElementById('personaCustom'),
            
            // Instructions
            instructions: document.getElementById('instructions'),
            instructionsError: document.getElementById('instructionsError'),
            
            // Input/Output
            inputData: document.getElementById('inputData'),
            outputFormat: document.getElementById('outputFormat'),
            additionalContext: document.getElementById('additionalContext'),
            
            // System Constraints
            responseLength: document.getElementById('responseLength'),
            toneStyle: document.getElementById('toneStyle'),
            formatPreferences: document.getElementById('formatPreferences'),
            
            // Negative Prompts
            negativePrompts: document.getElementById('negativePrompts'),
            
            // Reasoning
            reasoningRadios: document.querySelectorAll('input[name="reasoning"]'),
            fewShotContainer: document.getElementById('fewShotContainer'),
            cotContainer: document.getElementById('cotContainer'),
            examplesContainer: document.getElementById('examplesContainer'),
            addExampleBtn: document.getElementById('addExampleBtn'),
            cotStepsContainer: document.getElementById('cotStepsContainer'),
            addCotStepBtn: document.getElementById('addCotStepBtn'),
            cotXmlTags: document.getElementById('cotXmlTags'),
            
            // Audience
            audienceSelect: document.getElementById('audience'),
            audienceCustomContainer: document.getElementById('audienceCustomContainer'),
            audienceCustom: document.getElementById('audienceCustom'),
            
            // Quality Controls
            selfReflection: document.getElementById('selfReflection'),
            antiHallucination: document.getElementById('antiHallucination'),
            
            // Load Example
            loadExample: document.getElementById('loadExample'),
            
            // Buttons
            generateBtn: document.getElementById('generateBtn'),
            exportBtn: document.getElementById('exportBtn'),
            clearBtn: document.getElementById('clearBtn'),
            copyBtn: document.getElementById('copyBtn'),
            
            // Output
            generatedPrompt: document.getElementById('generatedPrompt'),
            charCount: document.getElementById('charCount'),
            
            // Code Options
            codeOptionsHeader: document.getElementById('codeOptionsHeader'),
            codeOptionsContent: document.getElementById('codeOptionsContent'),
            programmingLanguage: document.getElementById('programmingLanguage'),
            frameworkLibrary: document.getElementById('frameworkLibrary'),
            includeTests: document.getElementById('includeTests'),
            includeDocumentation: document.getElementById('includeDocumentation'),
            testFramework: document.getElementById('testFramework'),
            
            // Safety & Ethics
            safetyEthicsHeader: document.getElementById('safetyEthicsHeader'),
            safetyEthicsContent: document.getElementById('safetyEthicsContent'),
            checkBias: document.getElementById('checkBias'),
            accessibilityRequirements: document.getElementById('accessibilityRequirements'),
            privacyDataProtection: document.getElementById('privacyDataProtection'),
            ethicalImplications: document.getElementById('ethicalImplications'),
            
            // Validation Conditions
            validationConditionsHeader: document.getElementById('validationConditionsHeader'),
            validationConditionsContent: document.getElementById('validationConditionsContent'),
            validationsContainer: document.getElementById('validationsContainer'),
            addValidationBtn: document.getElementById('addValidationBtn'),
            
            // Creative Content
            creativeContentHeader: document.getElementById('creativeContentHeader'),
            creativeContentContent: document.getElementById('creativeContentContent'),
            writingStyle: document.getElementById('writingStyle'),
            pointOfView: document.getElementById('pointOfView'),
            wordCountTarget: document.getElementById('wordCountTarget'),
            readingLevel: document.getElementById('readingLevel'),
            
            // Research Instructions
            researchInstructionsHeader: document.getElementById('researchInstructionsHeader'),
            researchInstructionsContent: document.getElementById('researchInstructionsContent'),
            searchLatestInfo: document.getElementById('searchLatestInfo'),
            citeSources: document.getElementById('citeSources'),
            compareMultipleSources: document.getElementById('compareMultipleSources'),
            verifyFacts: document.getElementById('verifyFacts'),
            includeConfidence: document.getElementById('includeConfidence'),
            
            // Iterative Refinement
            iterativeRefinementHeader: document.getElementById('iterativeRefinementHeader'),
            iterativeRefinementContent: document.getElementById('iterativeRefinementContent'),
            askClarifyingQuestions: document.getElementById('askClarifyingQuestions'),
            provideAlternatives: document.getElementById('provideAlternatives'),
            requestFeedback: document.getElementById('requestFeedback'),
            suggestImprovements: document.getElementById('suggestImprovements'),
            identifyAssumptions: document.getElementById('identifyAssumptions'),
            
            // Collapsible Headers
            personaHeader: document.getElementById('personaHeader'),
            personaContent: document.getElementById('personaContent'),
            inputDataHeader: document.getElementById('inputDataHeader'),
            inputDataContent: document.getElementById('inputDataContent'),
            outputFormatHeader: document.getElementById('outputFormatHeader'),
            outputFormatContent: document.getElementById('outputFormatContent'),
            additionalContextHeader: document.getElementById('additionalContextHeader'),
            additionalContextContent: document.getElementById('additionalContextContent'),
            systemConstraintsHeader: document.getElementById('systemConstraintsHeader'),
            systemConstraintsContent: document.getElementById('systemConstraintsContent'),
            negativePromptingHeader: document.getElementById('negativePromptingHeader'),
            negativePromptingContent: document.getElementById('negativePromptingContent'),
            reasoningMethodHeader: document.getElementById('reasoningMethodHeader'),
            reasoningMethodContent: document.getElementById('reasoningMethodContent'),
            audienceHeader: document.getElementById('audienceHeader'),
            audienceContent: document.getElementById('audienceContent'),
            qualityControlsHeader: document.getElementById('qualityControlsHeader'),
            qualityControlsContent: document.getElementById('qualityControlsContent')
        };
    };

})();
