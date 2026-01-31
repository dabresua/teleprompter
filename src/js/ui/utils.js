/**
 * UI utility functions
 * DOM manipulation helpers
 */
(function() {
    'use strict';

    /**
     * Show a notification toast
     * @param {string} message - Message to display
     */
    window.showNotification = function(message) {
        var notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(function() {
            notification.remove();
        }, 2000);
    };

    /**
     * Toggle collapsible section
     * @param {HTMLElement} header - Header element
     * @param {HTMLElement} content - Content element
     */
    window.toggleCollapsible = function(header, content) {
        var toggle = header.querySelector('.collapsible-toggle');
        var isOpen = content.classList.contains('open');
        
        if (isOpen) {
            content.classList.remove('open');
            toggle.classList.remove('open');
            header.classList.remove('active');
        } else {
            content.classList.add('open');
            toggle.classList.add('open');
            header.classList.add('active');
        }
    };

    /**
     * Toggle persona custom input visibility
     */
    window.togglePersonaCustom = function() {
        if (window.dom.personaSelect.value === 'Other (custom)') {
            window.dom.personaCustomContainer.classList.remove('hidden');
        } else {
            window.dom.personaCustomContainer.classList.add('hidden');
        }
    };

    /**
     * Toggle audience custom input visibility
     */
    window.toggleAudienceCustom = function() {
        if (window.dom.audienceSelect.value === 'Other (custom)') {
            window.dom.audienceCustomContainer.classList.remove('hidden');
        } else {
            window.dom.audienceCustomContainer.classList.add('hidden');
        }
    };

    /**
     * Toggle reasoning method containers
     */
    window.toggleReasoningMethod = function() {
        var selectedReasoning = document.querySelector('input[name="reasoning"]:checked').value;
        
        if (selectedReasoning === 'few-shot') {
            window.dom.fewShotContainer.classList.remove('hidden');
            window.dom.cotContainer.classList.add('hidden');
        } else if (selectedReasoning === 'chain-of-thought') {
            window.dom.fewShotContainer.classList.add('hidden');
            window.dom.cotContainer.classList.remove('hidden');
            // Add minimum steps if empty
            while (window.dom.cotStepsContainer.children.length < window.MIN_COT_STEPS) {
                window.addCotStep();
            }
        } else {
            window.dom.fewShotContainer.classList.add('hidden');
            window.dom.cotContainer.classList.add('hidden');
        }
    };

    /**
     * Update character count display
     */
    window.updateCharCount = function() {
        var text = window.dom.generatedPrompt.value;
        var charCountVal = text.length;
        var tokenCount = window.calculateTokenCount(charCountVal);
        var status = window.getTokenCountStatus(tokenCount, charCountVal, false);
        
        window.dom.charCount.style.color = status.color;
        window.dom.charCount.textContent = status.message;
    };

    /**
     * Update live token count from form fields
     */
    window.updateLiveTokenCount = function() {
        // Collect CoT steps
        var cotSteps = [];
        var cotStepElements = window.dom.cotStepsContainer.querySelectorAll('.workflow-step');
        cotStepElements.forEach(function(step) {
            cotSteps.push(step.querySelector('textarea').value);
        });
        
        var formData = {
            persona: window.dom.personaSelect.value,
            personaCustom: window.dom.personaCustom.value,
            instructions: window.dom.instructions.value,
            inputData: window.dom.inputData.value,
            outputFormat: window.dom.outputFormat.value,
            additionalContext: window.dom.additionalContext.value,
            formatPreferences: window.dom.formatPreferences.value,
            negativePrompts: window.dom.negativePrompts.value,
            cotSteps: cotSteps,
            audience: window.dom.audienceSelect.value,
            audienceCustom: window.dom.audienceCustom.value
        };
        
        var totalChars = window.calculateLiveCharCount(formData);
        var tokenCount = window.calculateTokenCount(totalChars);
        var status = window.getTokenCountStatus(tokenCount, totalChars, true);
        
        window.dom.charCount.style.color = status.color;
        window.dom.charCount.textContent = status.message;
    };

})();
