/**
 * Example scenario loader
 * Loads predefined scenarios into the form
 */
(function() {
    'use strict';

    /**
     * Load an example scenario into the form
     */
    window.loadExampleScenario = function() {
        var scenarioKey = window.dom.loadExample.value;
        if (!scenarioKey) return;

        var scenario = window.exampleScenarios[scenarioKey];
        if (!scenario) return;

        // Clear form first
        window.dom.promptForm.reset();
        window.dom.personaCustomContainer.classList.add('hidden');
        window.dom.audienceCustomContainer.classList.add('hidden');
        window.dom.examplesContainer.innerHTML = '';
        window.exampleCount = 0;
        
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

        // Apply scenario data
        if (scenario.persona) {
            window.dom.personaSelect.value = scenario.persona;
        }
        
        if (scenario.instructions) {
            window.dom.instructions.value = scenario.instructions;
        }
        
        if (scenario.inputData) {
            window.dom.inputData.value = scenario.inputData;
        }
        
        if (scenario.outputFormat) {
            window.dom.outputFormat.value = scenario.outputFormat;
        }
        
        if (scenario.additionalContext) {
            window.dom.additionalContext.value = scenario.additionalContext;
        }
        
        if (scenario.audience) {
            window.dom.audienceSelect.value = scenario.audience;
        }
        
        if (scenario.selfReflection !== undefined) {
            window.dom.selfReflection.checked = scenario.selfReflection;
        }
        
        if (scenario.antiHallucination !== undefined) {
            window.dom.antiHallucination.checked = scenario.antiHallucination;
        }
        
        // Handle reasoning method
        if (scenario.reasoning) {
            var reasoningRadio = document.getElementById(
                scenario.reasoning === 'chain-of-thought' ? 'chainOfThought' :
                scenario.reasoning === 'few-shot' ? 'fewShot' : 'zeroShot'
            );
            if (reasoningRadio) {
                reasoningRadio.checked = true;
            }
            window.toggleReasoningMethod();
            
            // Handle CoT steps
            if (scenario.reasoning === 'chain-of-thought' && scenario.cotSteps) {
                setTimeout(function() {
                    // Add steps to reach the required count
                    while (window.dom.cotStepsContainer.children.length < scenario.cotSteps.length) {
                        window.addCotStep();
                    }
                    
                    // Fill in step values
                    var cotStepElements = window.dom.cotStepsContainer.querySelectorAll('.workflow-step');
                    scenario.cotSteps.forEach(function(stepText, index) {
                        if (cotStepElements[index]) {
                            cotStepElements[index].querySelector('textarea').value = stepText;
                        }
                    });
                    
                    if (scenario.cotXmlTags !== undefined) {
                        window.dom.cotXmlTags.checked = scenario.cotXmlTags;
                    }
                }, 100);
            }
            
            // Handle few-shot examples
            if (scenario.reasoning === 'few-shot' && scenario.examples) {
                setTimeout(function() {
                    // Add examples to reach the required count
                    while (window.exampleCount < scenario.examples.length) {
                        window.addExample();
                    }
                    
                    // Fill in example values
                    scenario.examples.forEach(function(example, index) {
                        var inputField = document.getElementById('exampleInput-' + (index + 1));
                        var outputField = document.getElementById('exampleOutput-' + (index + 1));
                        if (inputField) inputField.value = example.input || '';
                        if (outputField) outputField.value = example.output || '';
                    });
                }, 100);
            }
        }

        window.showNotification('Loaded: ' + window.dom.loadExample.options[window.dom.loadExample.selectedIndex].text);
        window.dom.loadExample.value = '';
    };

})();
