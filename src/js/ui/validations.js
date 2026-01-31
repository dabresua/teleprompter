/**
 * Validation conditions UI management
 */
(function() {
    'use strict';

    /**
     * Add a new validation condition
     */
    window.addValidationCondition = function() {
        window.validationCount++;
        var validationDiv = document.createElement('div');
        validationDiv.className = 'validation-item';
        validationDiv.id = 'validation-' + window.validationCount;
        validationDiv.draggable = true;
        
        var index = window.validations.length;
        window.validations.push({
            id: window.validationCount,
            description: '',
            impact: 'warning'
        });
        
        validationDiv.innerHTML = 
            '<div class="validation-header">' +
                '<div style="display: flex; align-items: center;">' +
                    '<span class="drag-handle">☰</span>' +
                    '<span class="validation-order">' + (index + 1) + '.</span>' +
                    '<strong>Validation Condition</strong>' +
                '</div>' +
                '<button type="button" class="btn-danger btn-small" onclick="removeValidationCondition(' + window.validationCount + ')">Remove</button>' +
            '</div>' +
            '<label for="validationDesc' + window.validationCount + '">Description:</label>' +
            '<textarea id="validationDesc' + window.validationCount + '" placeholder="E.g., Response must include working code examples" data-validation-id="' + window.validationCount + '"></textarea>' +
            '<label for="validationImpact' + window.validationCount + '" style="margin-top: 8px;">Impact:</label>' +
            '<select id="validationImpact' + window.validationCount + '" data-validation-id="' + window.validationCount + '" onchange="updateValidationImpact(' + window.validationCount + ', this.value)">' +
                '<option value="warning">Warning</option>' +
                '<option value="blocking">Blocking</option>' +
            '</select>';
        
        window.dom.validationsContainer.appendChild(validationDiv);
        
        // Add drag and drop event listeners
        validationDiv.addEventListener('dragstart', window.handleDragStart);
        validationDiv.addEventListener('dragover', window.handleDragOver);
        validationDiv.addEventListener('drop', window.handleDrop);
        validationDiv.addEventListener('dragend', window.handleDragEnd);
    };

    /**
     * Remove a validation condition
     * @param {number} id - Validation ID to remove
     */
    window.removeValidationCondition = function(id) {
        var validationDiv = document.getElementById('validation-' + id);
        if (validationDiv) {
            validationDiv.remove();
            // Remove from state
            window.validations = window.validations.filter(function(v) {
                return v.id !== id;
            });
            // Renumber remaining validations
            window.renumberValidations();
        }
    };

    /**
     * Update validation impact style
     * @param {number} id - Validation ID
     * @param {string} impact - Impact value ('warning' or 'blocking')
     */
    window.updateValidationImpact = function(id, impact) {
        var validationDiv = document.getElementById('validation-' + id);
        if (validationDiv) {
            validationDiv.classList.remove('blocking', 'warning');
            validationDiv.classList.add(impact);
        }
        // Update state
        var validation = window.validations.find(function(v) {
            return v.id === id;
        });
        if (validation) {
            validation.impact = impact;
        }
    };

    /**
     * Renumber validations after changes
     */
    window.renumberValidations = function() {
        var items = window.dom.validationsContainer.querySelectorAll('.validation-item');
        items.forEach(function(item, index) {
            var orderSpan = item.querySelector('.validation-order');
            if (orderSpan) {
                orderSpan.textContent = (index + 1) + '.';
            }
        });
    };

    // Drag and drop handlers
    window.handleDragStart = function(e) {
        window.draggedItem = this;
        this.style.opacity = '0.4';
    };

    window.handleDragOver = function(e) {
        if (e.preventDefault) {
            e.preventDefault();
        }
        return false;
    };

    window.handleDrop = function(e) {
        if (e.stopPropagation) {
            e.stopPropagation();
        }
        
        if (window.draggedItem !== this) {
            var allItems = Array.from(window.dom.validationsContainer.querySelectorAll('.validation-item'));
            var draggedIndex = allItems.indexOf(window.draggedItem);
            var targetIndex = allItems.indexOf(this);
            
            if (draggedIndex < targetIndex) {
                this.parentNode.insertBefore(window.draggedItem, this.nextSibling);
            } else {
                this.parentNode.insertBefore(window.draggedItem, this);
            }
            
            window.renumberValidations();
        }
        
        return false;
    };

    window.handleDragEnd = function(e) {
        this.style.opacity = '1';
    };

})();
