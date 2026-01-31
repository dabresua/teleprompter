/**
 * Chain-of-Thought steps UI management
 */
(function() {
    'use strict';

    /**
     * Add a new CoT step
     */
    window.addCotStep = function() {
        if (window.dom.cotStepsContainer.children.length >= window.MAX_COT_STEPS) {
            alert('Maximum ' + window.MAX_COT_STEPS + ' steps allowed');
            return;
        }

        var stepDiv = document.createElement('div');
        stepDiv.className = 'workflow-step';
        stepDiv.innerHTML = 
            '<strong>Step ' + (window.dom.cotStepsContainer.children.length + 1) + ':</strong>' +
            '<textarea placeholder="Describe this step..."></textarea>' +
            (window.dom.cotStepsContainer.children.length >= window.MIN_COT_STEPS - 1 ? 
                '<button type="button" class="remove-step-btn" onclick="window.removeCotStep(this)">Remove</button>' : 
                '');
        
        var textarea = stepDiv.querySelector('textarea');
        textarea.addEventListener('input', window.updateLiveTokenCount);
        
        window.dom.cotStepsContainer.appendChild(stepDiv);
        window.updateCotStepNumbers();
    };

    /**
     * Remove a CoT step
     * @param {HTMLElement} button - Remove button element
     */
    window.removeCotStep = function(button) {
        if (window.dom.cotStepsContainer.children.length <= window.MIN_COT_STEPS) {
            alert('Minimum ' + window.MIN_COT_STEPS + ' steps required');
            return;
        }

        button.parentElement.remove();
        window.updateCotStepNumbers();
        window.updateLiveTokenCount();
    };

    /**
     * Update CoT step numbers after changes
     */
    window.updateCotStepNumbers = function() {
        var steps = window.dom.cotStepsContainer.querySelectorAll('.workflow-step');
        steps.forEach(function(step, index) {
            step.querySelector('strong').textContent = 'Step ' + (index + 1) + ':';
        });
    };

})();
