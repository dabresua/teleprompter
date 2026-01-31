/**
 * Form action handlers
 * Generate prompt, export, copy, clear
 */
(function() {
    'use strict';

    /**
     * Collect all form data into an object
     * @returns {Object} Form data object
     */
    window.collectFormData = function() {
        // Collect examples
        var examples = [];
        var exampleItems = window.dom.examplesContainer.querySelectorAll('.example-item');
        exampleItems.forEach(function(example) {
            var inputField = example.querySelector('textarea[id^="exampleInput"]');
            var outputField = example.querySelector('textarea[id^="exampleOutput"]');
            examples.push({
                input: inputField ? inputField.value : '',
                output: outputField ? outputField.value : ''
            });
        });
        
        // Collect CoT steps
        var cotSteps = [];
        var cotStepElements = window.dom.cotStepsContainer.querySelectorAll('.workflow-step');
        cotStepElements.forEach(function(step) {
            cotSteps.push(step.querySelector('textarea').value);
        });
        
        // Collect validations
        var validationItems = window.dom.validationsContainer.querySelectorAll('.validation-item');
        var validationsData = [];
        validationItems.forEach(function(item) {
            validationsData.push({
                description: item.querySelector('textarea').value,
                impact: item.querySelector('select').value
            });
        });
        
        // Get selected reasoning method
        var reasoningRadio = document.querySelector('input[name="reasoning"]:checked');
        var reasoning = reasoningRadio ? reasoningRadio.value : 'zero-shot';
        
        return {
            // Persona
            persona: window.dom.personaSelect.value,
            personaCustom: window.dom.personaCustom.value,
            
            // Core content
            instructions: window.dom.instructions.value,
            inputData: window.dom.inputData.value,
            outputFormat: window.dom.outputFormat.value,
            additionalContext: window.dom.additionalContext.value,
            
            // Constraints
            responseLength: window.dom.responseLength.value,
            toneStyle: window.dom.toneStyle.value,
            formatPreferences: window.dom.formatPreferences.value,
            
            // Negative prompts
            negativePrompts: window.dom.negativePrompts.value,
            
            // Reasoning
            reasoning: reasoning,
            examples: examples,
            cotSteps: cotSteps,
            cotXmlTags: window.dom.cotXmlTags.checked,
            
            // Audience
            audience: window.dom.audienceSelect.value,
            audienceCustom: window.dom.audienceCustom.value,
            
            // Quality
            selfReflection: window.dom.selfReflection.checked,
            antiHallucination: window.dom.antiHallucination.checked,
            
            // Code options
            programmingLanguage: window.dom.programmingLanguage.value,
            framework: window.dom.frameworkLibrary.value,
            includeTests: window.dom.includeTests.checked,
            includeDocs: window.dom.includeDocumentation.checked,
            testFramework: window.dom.testFramework.value,
            
            // Safety
            checkBias: window.dom.checkBias.checked,
            accessibility: window.dom.accessibilityRequirements.checked,
            privacy: window.dom.privacyDataProtection.checked,
            ethical: window.dom.ethicalImplications.checked,
            
            // Validations
            validations: validationsData,
            
            // Creative
            writingStyle: window.dom.writingStyle.value,
            pointOfView: window.dom.pointOfView.value,
            wordCount: window.dom.wordCountTarget.value,
            readingLevel: window.dom.readingLevel.value,
            
            // Research
            searchLatest: window.dom.searchLatestInfo.checked,
            citeSources: window.dom.citeSources.checked,
            compareSources: window.dom.compareMultipleSources.checked,
            verifyFacts: window.dom.verifyFacts.checked,
            includeConfidence: window.dom.includeConfidence.checked,
            
            // Iterative
            askClarifying: window.dom.askClarifyingQuestions.checked,
            provideAlternatives: window.dom.provideAlternatives.checked,
            requestFeedback: window.dom.requestFeedback.checked,
            suggestImprovements: window.dom.suggestImprovements.checked,
            identifyAssumptions: window.dom.identifyAssumptions.checked
        };
    };

    /**
     * Generate prompt from form data
     */
    window.generatePrompt = function() {
        // Validate instructions
        if (!window.validateInstructions(window.dom.instructions.value)) {
            window.dom.instructions.classList.add('field-error');
            window.dom.instructionsError.style.display = 'block';
            window.dom.instructions.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        } else {
            window.dom.instructions.classList.remove('field-error');
            window.dom.instructionsError.style.display = 'none';
        }

        var formData = window.collectFormData();
        var finalPrompt = window.assemblePrompt(formData);
        
        window.dom.generatedPrompt.value = finalPrompt;
        window.updateCharCount();

        // Scroll to output
        document.getElementById('output').scrollIntoView({ behavior: 'smooth' });
    };

    /**
     * Export prompt to REQUIREMENTS.md file
     */
    window.exportToRequirements = function() {
        var prompt = window.dom.generatedPrompt.value;
        if (!prompt) {
            window.showNotification('Please generate a prompt first');
            return;
        }

        var markdown = window.formatMarkdownExport(prompt);

        // Create blob and download
        var blob = new Blob([markdown], { type: 'text/markdown' });
        var url = URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = 'REQUIREMENTS.md';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        window.showNotification('Exported to REQUIREMENTS.md');
    };

    /**
     * Copy prompt to clipboard
     */
    window.copyToClipboard = function() {
        var text = window.dom.generatedPrompt.value;
        if (!text) {
            return;
        }

        navigator.clipboard.writeText(text).then(function() {
            window.showNotification('Copied!');
            window.dom.copyBtn.textContent = 'Copied!';
            setTimeout(function() {
                window.dom.copyBtn.textContent = 'Copy to Clipboard';
            }, 2000);
        }).catch(function(err) {
            console.error('Failed to copy:', err);
        });
    };

    /**
     * Clear all form fields
     */
    window.clearForm = function() {
        if (confirm('Are you sure you want to clear all fields?')) {
            window.dom.promptForm.reset();
            window.dom.personaCustomContainer.classList.add('hidden');
            window.dom.audienceCustomContainer.classList.add('hidden');
            window.dom.fewShotContainer.classList.add('hidden');
            window.dom.cotContainer.classList.add('hidden');
            window.dom.generatedPrompt.value = '';
            window.dom.charCount.style.color = 'var(--text-light)';
            window.dom.charCount.textContent = '~0 characters • ~0 tokens';
            window.dom.instructions.classList.remove('field-error');
            window.dom.instructionsError.style.display = 'none';
            
            // Reset examples
            window.dom.examplesContainer.innerHTML = '';
            window.exampleCount = 0;
            window.initializeExamples();
            
            // Reset CoT steps
            window.dom.cotStepsContainer.innerHTML = '';
            window.cotStepCount = 0;
            
            // Reset validation conditions
            window.dom.validationsContainer.innerHTML = '';
            window.validationCount = 0;
            window.validations = [];
            
            // Reset collapsible sections to collapsed state
            document.querySelectorAll('.collapsible-content').forEach(function(content) {
                content.classList.remove('open');
            });
            document.querySelectorAll('.collapsible-header').forEach(function(header) {
                header.classList.remove('active');
            });
            document.querySelectorAll('.collapsible-toggle').forEach(function(toggle) {
                toggle.classList.remove('open');
            });
            
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

})();
