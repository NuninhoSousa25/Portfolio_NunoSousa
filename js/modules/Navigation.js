/**
 * Navigation Module
 * Handles mobile menu, smooth scrolling, and page index functionality
 */
export class Navigation {
    constructor() {
        this.init();
    }
    
    init() {
        this.initMobileMenu();
        this.initSmoothScrolling();
        this.initPageIndex();
    }
    
    /**
     * Initializes the mobile hamburger menu functionality.
     */
    initMobileMenu() {
        const hamburgerBtn = document.querySelector('.hamburger-menu');
        const navPanel = document.querySelector('.header-nav-section');
        const navLinks = document.querySelectorAll('#main-nav a');
        const body = document.body;

        if (!hamburgerBtn || !navPanel) return;

        // Toggle menu on hamburger click
        hamburgerBtn.addEventListener('click', () => {
            const isActive = hamburgerBtn.classList.contains('is-active');
            hamburgerBtn.classList.toggle('is-active', !isActive);
            navPanel.classList.toggle('is-active', !isActive);
            body.classList.toggle('mobile-menu-open', !isActive);
            hamburgerBtn.setAttribute('aria-expanded', !isActive);
        });

        // Close menu when a nav link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (hamburgerBtn.classList.contains('is-active')) {
                    hamburgerBtn.classList.remove('is-active');
                    navPanel.classList.remove('is-active');
                    body.classList.remove('mobile-menu-open');
                    hamburgerBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }
    
    /**
     * Enhanced smooth scrolling for navigation
     */
    initSmoothScrolling() {
        // Handle navigation links that start with # (same page scrolling)
        document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    // Use a smaller fixed offset for mobile, or calculate dynamically
                    const header = document.getElementById('main-header');
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = targetElement.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Handle header logo link - let it navigate normally to other pages
        document.querySelectorAll('.header-logo-link').forEach(link => {
            // Check if the link goes to a different page (contains ../ or doesn't start with #)
            const href = link.getAttribute('href');
            if (href && !href.startsWith('#') && href.includes('../')) {
                // Let it navigate normally - don't prevent default
                return;
            } else if (href && href.startsWith('#')) {
                // Handle same-page scrolling
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = href.substring(1);
                    const targetElement = document.getElementById(targetId);
                    
                    if (targetElement) {
                        const header = document.getElementById('main-header');
                        const headerHeight = header ? header.offsetHeight : 80;
                        const targetPosition = targetElement.offsetTop - headerHeight - 20;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                });
            }
        });
    }
    
    /**
     * Enhanced page index with better scroll detection
     */
    initPageIndex() {
        const sections = ['home', 'projects', 'products', 'about', 'cv', 'contact'];
        const indexDots = document.querySelectorAll('.index-dot');
        
        if (!indexDots.length) return;
        
        // Smooth scroll with offset for sticky header
        indexDots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                const targetSection = document.getElementById(sections[index]);
                if (targetSection) {
                    const headerHeight = document.getElementById('main-header').offsetHeight;
                    const targetPosition = targetSection.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Enhanced scroll position tracking with throttling
        let ticking = false;
        
        function updateActiveIndex() {
            const scrollPosition = window.scrollY;
            const headerHeight = document.getElementById('main-header').offsetHeight;
            
            sections.forEach((sectionId, index) => {
                const element = document.getElementById(sectionId);
                if (!element) return;
                
                const elementTop = element.offsetTop - headerHeight - 100;
                const elementBottom = elementTop + element.offsetHeight;
                
                if (scrollPosition >= elementTop && scrollPosition < elementBottom) {
                    indexDots.forEach(dot => dot.classList.remove('active'));
                    indexDots[index]?.classList.add('active');
                }
            });
            
            ticking = false;
        }
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateActiveIndex);
                ticking = true;
            }
        });
    }
}