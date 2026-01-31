/**
 * Few-shot examples UI management
 */
(function() {
    'use strict';

    /**
     * Initialize default examples
     */
    window.initializeExamples = function() {
        window.addExample();
        window.addExample();
    };

    /**
     * Add a new example
     */
    window.addExample = function() {
        if (window.exampleCount >= window.MAX_EXAMPLES) {
            return;
        }

        window.exampleCount++;
        var exampleDiv = document.createElement('div');
        exampleDiv.className = 'example-item';
        exampleDiv.id = 'example-' + window.exampleCount;
        
        exampleDiv.innerHTML = 
            '<div class="example-header">' +
                '<span class="example-title">Example ' + window.exampleCount + '</span>' +
                '<button type="button" class="btn-danger btn-small remove-example" onclick="removeExample(' + window.exampleCount + ')">Remove</button>' +
            '</div>' +
            '<div class="example-fields">' +
                '<div class="example-field">' +
                    '<label for="exampleInput-' + window.exampleCount + '">Example Input:</label>' +
                    '<textarea id="exampleInput-' + window.exampleCount + '" placeholder="Enter example input..." aria-label="Example ' + window.exampleCount + ' input"></textarea>' +
                '</div>' +
                '<div class="example-field">' +
                    '<label for="exampleOutput-' + window.exampleCount + '">Example Output:</label>' +
                    '<textarea id="exampleOutput-' + window.exampleCount + '" placeholder="Enter example output..." aria-label="Example ' + window.exampleCount + ' output"></textarea>' +
                '</div>' +
            '</div>';
        
        window.dom.examplesContainer.appendChild(exampleDiv);
        window.updateExampleButtons();
    };

    /**
     * Remove an example by ID
     * @param {number} id - Example ID to remove
     */
    window.removeExample = function(id) {
        var exampleDiv = document.getElementById('example-' + id);
        if (exampleDiv) {
            exampleDiv.remove();
            window.exampleCount--;
            window.renumberExamples();
            window.updateExampleButtons();
        }
    };

    /**
     * Renumber examples after removal
     */
    window.renumberExamples = function() {
        var examples = window.dom.examplesContainer.querySelectorAll('.example-item');
        examples.forEach(function(example, index) {
            var newNum = index + 1;
            example.id = 'example-' + newNum;
            example.querySelector('.example-title').textContent = 'Example ' + newNum;
            
            var inputs = example.querySelectorAll('textarea');
            inputs[0].id = 'exampleInput-' + newNum;
            inputs[1].id = 'exampleOutput-' + newNum;
            
            var labels = example.querySelectorAll('label');
            labels[0].setAttribute('for', 'exampleInput-' + newNum);
            labels[1].setAttribute('for', 'exampleOutput-' + newNum);
            
            var removeBtn = example.querySelector('.remove-example');
            removeBtn.setAttribute('onclick', 'removeExample(' + newNum + ')');
        });
    };

    /**
     * Update example button states
     */
    window.updateExampleButtons = function() {
        var examples = window.dom.examplesContainer.querySelectorAll('.example-item');
        var removeButtons = window.dom.examplesContainer.querySelectorAll('.remove-example');
        
        // Disable remove button if only 1 example
        removeButtons.forEach(function(btn) {
            btn.disabled = examples.length <= 1;
        });
        
        // Disable add button if at max
        window.dom.addExampleBtn.disabled = window.exampleCount >= window.MAX_EXAMPLES;
    };

})();
