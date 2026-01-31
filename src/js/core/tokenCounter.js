/**
 * Pure business logic functions for token counting
 * No DOM dependencies - can be unit tested
 */
(function() {
    'use strict';

    /**
     * Calculate approximate token count from character count
     * Uses rough estimate of ~4 characters per token
     * @param {number} charCount - Number of characters
     * @returns {number} Estimated token count
     */
    window.calculateTokenCount = function(charCount) {
        return Math.ceil(charCount / 4);
    };

    /**
     * Get token count status and message
     * @param {number} tokenCount - Number of tokens
     * @param {number} charCount - Number of characters
     * @param {boolean} isLive - Whether this is a live preview
     * @returns {Object} Status object with color and message
     */
    window.getTokenCountStatus = function(tokenCount, charCount, isLive) {
        const prefix = isLive ? '~' : '';
        
        if (tokenCount > 2000) {
            return {
                color: 'var(--error)',
                message: `${prefix}${charCount} characters • ${prefix}${tokenCount} tokens ⚠️ Large prompt - consider reducing`
            };
        } else if (tokenCount > 1000) {
            return {
                color: 'orange',
                message: `${prefix}${charCount} characters • ${prefix}${tokenCount} tokens ⚠️ Getting large`
            };
        } else {
            return {
                color: 'var(--text-light)',
                message: `${prefix}${charCount} characters • ${prefix}${tokenCount} tokens`
            };
        }
    };

    /**
     * Calculate total character count from form data for live preview
     * @param {Object} formData - Object containing form field values
     * @returns {number} Total character count
     */
    window.calculateLiveCharCount = function(formData) {
        let totalChars = 0;
        
        // Persona
        if (formData.persona && formData.persona !== 'None (no persona)') {
            if (formData.persona === 'Other (custom)') {
                totalChars += (formData.personaCustom || '').length;
            } else if (window.personaTemplates[formData.persona]) {
                totalChars += window.personaTemplates[formData.persona].length;
            }
        }
        
        // Main content fields
        totalChars += (formData.instructions || '').length;
        totalChars += (formData.inputData || '').length;
        totalChars += (formData.outputFormat || '').length;
        totalChars += (formData.additionalContext || '').length;
        totalChars += (formData.formatPreferences || '').length;
        totalChars += (formData.negativePrompts || '').length;
        
        // CoT steps
        if (formData.cotSteps && Array.isArray(formData.cotSteps)) {
            formData.cotSteps.forEach(function(step) {
                totalChars += (step || '').length;
            });
        }
        
        // Audience
        if (formData.audience && formData.audience !== 'General (not specified)') {
            if (formData.audience === 'Other (custom)') {
                totalChars += (formData.audienceCustom || '').length;
            } else if (window.audienceTemplates[formData.audience]) {
                totalChars += window.audienceTemplates[formData.audience].length;
            }
        }
        
        // Add approximate overhead for formatting, labels, and quality controls
        var overhead = 500;
        totalChars += overhead;
        
        return totalChars;
    };

})();
