/**
 * UI/Animation Module
 * Handles scroll effects, lazy loading, animations, and form interactions
 */
export class UIAnimations {
    constructor() {
        this.init();
    }
    
    init() {
        this.initScrollEffects();
        this.initImageLazyLoading();
        this.initAnimationObserver();
        this.initContactForm();
        this.initThemeElements();
        this.initProjectCards();
    }
    
    /**
     * Scroll-based effects for header and elements
     */
    initScrollEffects() {
        const header = document.getElementById('main-header');
        let lastScrollY = window.scrollY;
        
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Add scrolled class to header for styling
            if (currentScrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
            
            lastScrollY = currentScrollY;
        };
        
        // Use throttle function (will be available via dynamic import)
        const throttle = (func, limit) => {
            let inThrottle;
            return function() {
                const args = arguments;
                const context = this;
                if (!inThrottle) {
                    func.apply(context, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        };
        
        window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps
    }
    
    /**
     * Lazy loading for images
     */
    initImageLazyLoading() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.classList.add('loaded');
                        observer.unobserve(img);
                    }
                });
            });
            
            images.forEach(img => imageObserver.observe(img));
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => img.classList.add('loaded'));
        }
    }
    
    /**
     * Animation observer for scroll-triggered animations
     */
    initAnimationObserver() {
        const animatedElements = document.querySelectorAll('.project-item, .cv-item, .social-icon');
        
        if ('IntersectionObserver' in window) {
            const animationObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animationDelay = `${Math.random() * 0.3}s`;
                        entry.target.classList.add('animate-in');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            
            animatedElements.forEach(element => animationObserver.observe(element));
        }
    }
    
    /**
     * Enhanced contact form handling (if contact form exists)
     */
    initContactForm() {
        const contactForm = document.getElementById('contact-form');
        if (!contactForm) return;
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            
            // Show loading state
            submitButton.textContent = 'Sending...';
            submitButton.disabled = true;
            
            try {
                // Simulate form submission (replace with actual form handling)
                await new Promise(resolve => setTimeout(resolve, 2000));
                
                // Show success message
                this.showNotification('Message sent successfully!', 'success');
                contactForm.reset();
            } catch (error) {
                this.showNotification('Failed to send message. Please try again.', 'error');
            } finally {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            }
        });
    }
    
    /**
     * Theme and visual enhancement elements
     */
    initThemeElements() {
        // Add hover effects to project items
        this.enhanceProjectItems();
    }
    
    
    /**
     * Enhance project item interactions
     */
    enhanceProjectItems() {
        // Removed image scaling effects for minimal hover interaction
    }
    
    /**
     * Initializes enhanced project cards functionality
     */
    initProjectCards() {
        // Add smooth scroll behavior
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    /**
     * Initialize image sources using the image configuration
     */
    initImageSources() {
        const imageMappings = [
            { selector: '.slide:nth-child(1) img', path: 'slideshow.image1' },
            { selector: '.slide:nth-child(2) img', path: 'slideshow.image2' },
            { selector: '.slide:nth-child(3) img', path: 'slideshow.image3' },
            { selector: '.about-image', path: 'profile.main' },
            { selector: '.project-item:nth-child(1) img', path: 'projects.digitalDebris.main' },
            { selector: '.project-item:nth-child(2) img', path: 'projects.comingSoon.placeholder' }
        ];
        
        if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
            const productMappings = [
                { selector: 'a[href*="vertex-group"] img', path: 'products.vertexGroupToSculptMask' },
                { selector: 'a[href*="voxel"] img', path: 'products.voxelMaster' }
            ];
            window.setImageSources([...imageMappings, ...productMappings]);
        } else {
            window.setImageSources(imageMappings, '../');
        }
    }
    
    /**
     * Show notification messages
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOutNotification 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}