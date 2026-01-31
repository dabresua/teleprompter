/**
 * Application state management
 * Manages mutable state used across modules
 */
(function() {
    'use strict';

    // ===== Few-Shot Examples State =====
    window.exampleCount = 0;

    // ===== Validation Conditions State =====
    window.validationCount = 0;
    window.validations = [];

    // ===== Chain-of-Thought Steps State =====
    window.cotStepCount = 0;

    // ===== Drag and Drop State =====
    window.draggedItem = null;

    // ===== State Reset Function =====
    window.resetState = function() {
        window.exampleCount = 0;
        window.validationCount = 0;
        window.validations = [];
        window.cotStepCount = 0;
        window.draggedItem = null;
    };

})();
