/**
 * Nuno Sousa - 3D Artist Portfolio
 * Legacy main.js - now redirects to modular architecture
 * 
 * This file is kept for backwards compatibility.
 * The main functionality has been moved to js/app.js and modules/
 */

// Note: This file is now deprecated. 
// The new modular structure is in js/app.js and js/modules/
// If you need to use the old monolithic version, it's backed up as main-original.js

console.warn('main.js is deprecated. Please use the new modular structure in js/app.js');

// For sites still loading main.js directly, provide basic compatibility
if (typeof module === 'undefined' && !window.portfolioApp) {
    // Determine if we're in a subdirectory
    const currentScript = document.currentScript;
    const scriptSrc = currentScript ? currentScript.src : '';
    const isInSubdirectory = scriptSrc.includes('../js/main.js');
    
    // Load the new modular structure with correct path
    const script = document.createElement('script');
    script.type = 'module';
    script.src = isInSubdirectory ? '../js/app.js' : 'js/app.js';
    document.head.appendChild(script);
}