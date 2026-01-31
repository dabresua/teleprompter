/**
 * Application initialization
 * Entry point that wires everything together
 */
(function() {
    'use strict';

    /**
     * Initialize the application
     */
    window.initApp = function() {
        // Initialize DOM references
        window.initDomRefs();
        
        // Setup event listeners
        window.setupEventListeners();
        
        // Initialize examples
        window.initializeExamples();
        
        // Initialize token count display
        window.updateLiveTokenCount();
    };

    // Auto-initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', window.initApp);
    } else {
        window.initApp();
    }

})();
