/**
 * Theme Module
 * Handles theme toggle and language toggle functionality
 */
export class Theme {
    constructor() {
        this.init();
    }
    
    init() {
        this.initLanguageToggle();
        this.initThemeToggle();
    }
    
    /**
     * Language Toggle Functionality
     */
    initLanguageToggle() {
        const langOptions = document.querySelectorAll('.lang-option');
        const body = document.body;
        
        if (!langOptions.length) return;
        
        // Get saved language or default to English
        const savedLang = localStorage.getItem('preferred-language') || 'en';
        this.setLanguage(savedLang);
        
        langOptions.forEach(option => {
            option.addEventListener('click', () => {
                const selectedLang = option.getAttribute('data-lang-switch');
                this.setLanguage(selectedLang);
                localStorage.setItem('preferred-language', selectedLang);
            });
        });
    }
    
    setLanguage(lang) {
        const body = document.body;
        const langOptions = document.querySelectorAll('.lang-option');
        
        // Update body class
        body.className = body.className.replace(/lang-\w+/g, '');
        body.classList.add(`lang-${lang}`);
        
        // Update active language option
        langOptions.forEach(option => {
            option.classList.remove('active');
            if (option.getAttribute('data-lang-switch') === lang) {
                option.classList.add('active');
            }
        });
        
        // Update page language attribute
        document.documentElement.lang = lang;
    }
    
    /**
     * Theme Toggle Functionality
     */
    initThemeToggle() {
        const themeToggle = document.getElementById('theme-toggle');
        const themeIcon = document.querySelector('.theme-icon');
        const themeCss = document.getElementById('theme-css');
        
        if (!themeToggle || !themeCss) return;
        
        // Get saved theme or default to light
        const savedTheme = localStorage.getItem('preferred-theme') || 'light';
        this.setTheme(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = themeCss.getAttribute('href').includes('styles-dark.css') ? 'dark' : 'light';
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            this.setTheme(newTheme);
            localStorage.setItem('preferred-theme', newTheme);
        });
    }
    
    setTheme(theme) {
        const themeIcon = document.querySelector('.theme-icon');
        const themeToggle = document.getElementById('theme-toggle');
        const themeCss = document.getElementById('theme-css');
        
        if (!themeCss) return;
        
        const currentHref = themeCss.getAttribute('href');
        const isInSubdirectory = currentHref.includes('../css/');
        const basePath = isInSubdirectory ? '../css/' : 'css/';
        
        if (theme === 'dark') {
            themeCss.setAttribute('href', basePath + 'styles-dark.css');
            if (themeIcon) themeIcon.textContent = '☀️';
            if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to light theme');
        } else {
            themeCss.setAttribute('href', basePath + 'styles.css');
            if (themeIcon) themeIcon.textContent = '🌙';
            if (themeToggle) themeToggle.setAttribute('aria-label', 'Switch to dark theme');
        }
    }
}