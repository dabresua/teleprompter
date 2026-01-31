/**
 * Event listeners setup
 * Binds all event handlers after DOM is ready
 */
(function() {
    'use strict';

    window.setupEventListeners = function() {
        var dom = window.dom;
        
        // Persona and audience toggles
        dom.personaSelect.addEventListener('change', window.togglePersonaCustom);
        dom.personaSelect.addEventListener('change', window.updateLiveTokenCount);
        dom.personaCustom.addEventListener('input', window.updateLiveTokenCount);
        dom.audienceSelect.addEventListener('change', window.toggleAudienceCustom);
        dom.audienceSelect.addEventListener('change', window.updateLiveTokenCount);
        dom.audienceCustom.addEventListener('input', window.updateLiveTokenCount);
        
        // Reasoning method
        dom.reasoningRadios.forEach(function(radio) {
            radio.addEventListener('change', window.toggleReasoningMethod);
        });
        
        // Buttons
        dom.addExampleBtn.addEventListener('click', window.addExample);
        dom.addCotStepBtn.addEventListener('click', window.addCotStep);
        dom.generateBtn.addEventListener('click', window.generatePrompt);
        dom.exportBtn.addEventListener('click', window.exportToRequirements);
        dom.clearBtn.addEventListener('click', window.clearForm);
        dom.copyBtn.addEventListener('click', window.copyToClipboard);
        dom.loadExample.addEventListener('change', window.loadExampleScenario);
        dom.generatedPrompt.addEventListener('input', window.updateCharCount);
        
        // Live token count updates on field changes
        dom.instructions.addEventListener('input', window.updateLiveTokenCount);
        dom.inputData.addEventListener('input', window.updateLiveTokenCount);
        dom.outputFormat.addEventListener('input', window.updateLiveTokenCount);
        dom.additionalContext.addEventListener('input', window.updateLiveTokenCount);
        dom.responseLength.addEventListener('change', window.updateLiveTokenCount);
        dom.toneStyle.addEventListener('change', window.updateLiveTokenCount);
        dom.formatPreferences.addEventListener('input', window.updateLiveTokenCount);
        dom.negativePrompts.addEventListener('input', window.updateLiveTokenCount);
        dom.selfReflection.addEventListener('change', window.updateLiveTokenCount);
        dom.antiHallucination.addEventListener('change', window.updateLiveTokenCount);

        // Collapsible sections
        dom.personaHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.personaHeader, dom.personaContent);
        });
        dom.inputDataHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.inputDataHeader, dom.inputDataContent);
        });
        dom.outputFormatHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.outputFormatHeader, dom.outputFormatContent);
        });
        dom.additionalContextHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.additionalContextHeader, dom.additionalContextContent);
        });
        dom.systemConstraintsHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.systemConstraintsHeader, dom.systemConstraintsContent);
        });
        dom.negativePromptingHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.negativePromptingHeader, dom.negativePromptingContent);
        });
        dom.codeOptionsHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.codeOptionsHeader, dom.codeOptionsContent);
        });
        dom.safetyEthicsHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.safetyEthicsHeader, dom.safetyEthicsContent);
        });
        dom.reasoningMethodHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.reasoningMethodHeader, dom.reasoningMethodContent);
        });
        dom.audienceHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.audienceHeader, dom.audienceContent);
        });
        dom.qualityControlsHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.qualityControlsHeader, dom.qualityControlsContent);
        });
        dom.validationConditionsHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.validationConditionsHeader, dom.validationConditionsContent);
        });
        dom.addValidationBtn.addEventListener('click', window.addValidationCondition);

        dom.creativeContentHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.creativeContentHeader, dom.creativeContentContent);
        });
        dom.researchInstructionsHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.researchInstructionsHeader, dom.researchInstructionsContent);
        });
        dom.iterativeRefinementHeader.addEventListener('click', function() {
            window.toggleCollapsible(dom.iterativeRefinementHeader, dom.iterativeRefinementContent);
        });

        // Phase 3 live token count updates
        dom.writingStyle.addEventListener('change', window.updateLiveTokenCount);
        dom.pointOfView.addEventListener('change', window.updateLiveTokenCount);
        dom.wordCountTarget.addEventListener('input', window.updateLiveTokenCount);
        dom.readingLevel.addEventListener('change', window.updateLiveTokenCount);
        dom.searchLatestInfo.addEventListener('change', window.updateLiveTokenCount);
        dom.citeSources.addEventListener('change', window.updateLiveTokenCount);
        dom.compareMultipleSources.addEventListener('change', window.updateLiveTokenCount);
        dom.verifyFacts.addEventListener('change', window.updateLiveTokenCount);
        dom.includeConfidence.addEventListener('change', window.updateLiveTokenCount);
        dom.askClarifyingQuestions.addEventListener('change', window.updateLiveTokenCount);
        dom.provideAlternatives.addEventListener('change', window.updateLiveTokenCount);
        dom.requestFeedback.addEventListener('change', window.updateLiveTokenCount);
        dom.suggestImprovements.addEventListener('change', window.updateLiveTokenCount);
        dom.identifyAssumptions.addEventListener('change', window.updateLiveTokenCount);

        // Phase 2 live token count updates
        dom.programmingLanguage.addEventListener('input', window.updateLiveTokenCount);
        dom.frameworkLibrary.addEventListener('input', window.updateLiveTokenCount);
        dom.includeTests.addEventListener('change', window.updateLiveTokenCount);
        dom.includeDocumentation.addEventListener('change', window.updateLiveTokenCount);
        dom.testFramework.addEventListener('input', window.updateLiveTokenCount);
    };

})();
