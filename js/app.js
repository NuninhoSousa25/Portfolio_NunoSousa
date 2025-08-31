/**
 * Nuno Sousa - 3D Artist Portfolio
 * Main Application Entry Point
 * Modern Modular JavaScript Architecture
 */

// Determine the correct path for modules based on current location
const getCurrentBasePath = () => {
    const script = document.querySelector('script[src*="app.js"]');
    if (script && script.src.includes('../js/app.js')) {
        return '../js/modules/';
    }
    return './modules/';
};

class App {
    constructor() {
        this.modules = {};
        this.modulePath = getCurrentBasePath();
        this.init();
    }
    
    async init() {
        try {
            // Dynamic imports to handle different directory structures
            const { Navigation } = await import(`${this.modulePath}Navigation.js`);
            const { Slideshow } = await import(`${this.modulePath}Slideshow.js`);
            const { initFullscreenGallery } = await import(`${this.modulePath}Gallery.js`);
            const { UIAnimations } = await import(`${this.modulePath}UIAnimations.js`);
            const { Theme } = await import(`${this.modulePath}Theme.js`);
            
            // Initialize all modules
            this.modules.navigation = new Navigation();
            this.modules.slideshow = new Slideshow();
            this.modules.uiAnimations = new UIAnimations();
            this.modules.theme = new Theme();
            
            // Initialize gallery last to ensure it collects all clickable elements (including slideshow)
            this.modules.gallery = initFullscreenGallery();
            
            // Initialize image sources (if imageConfig is loaded)
            if (this.modules.uiAnimations.initImageSources) {
                this.modules.uiAnimations.initImageSources();
            }
            
            // Log successful initialization
            console.log('Portfolio app initialized with modules:', Object.keys(this.modules));
        } catch (error) {
            console.error('Error initializing portfolio app:', error);
        }
    }
    
    // Public method to access modules if needed
    getModule(moduleName) {
        return this.modules[moduleName];
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.portfolioApp = new App();
});