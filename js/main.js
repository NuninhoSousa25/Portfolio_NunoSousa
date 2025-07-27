/**
 * Nuno Sousa - 3D Artist Portfolio
 * Enhanced JavaScript with modern interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSlideshow();
    initPageIndex();
    initSmoothScrolling();
    initScrollEffects();
    initImageLazyLoading();
    initAnimationObserver();
    initContactForm();
    initThemeElements();
});

/**
 * Enhanced slideshow with better transitions and controls
 */
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    const slideshowContainer = document.querySelector('.slideshow-container');
    let currentSlide = 0;
    let slideInterval;
    let isPaused = false;
    
    if (!slides.length) return;
    
    // Create slide indicators
    const indicatorsContainer = document.createElement('div');
    indicatorsContainer.className = 'slideshow-indicators';
    indicatorsContainer.innerHTML = Array.from(slides).map((_, index) => 
        `<button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
    ).join('');
    slideshowContainer.appendChild(indicatorsContainer);
    
    // Create navigation arrows
    const navContainer = document.createElement('div');
    navContainer.className = 'slideshow-nav';
    navContainer.innerHTML = `
        <button class="nav-btn prev" aria-label="Previous slide">‹</button>
        <button class="nav-btn next" aria-label="Next slide">›</button>
    `;
    slideshowContainer.appendChild(navContainer);
    
    function showSlide(n) {
        // Hide all slides and remove active class
        slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.indicator').forEach(indicator => 
            indicator.classList.remove('active'));
        
        // Set current slide with bounds checking
        currentSlide = (n + slides.length) % slides.length;
        
        // Show current slide and update indicator
        slides[currentSlide].classList.add('active');
        document.querySelector(`.indicator[data-slide="${currentSlide}"]`)
            ?.classList.add('active');
    }
    
    function nextSlide() {
        showSlide(currentSlide + 1);
    }
    
    function prevSlide() {
        showSlide(currentSlide - 1);
    }
    
    function startSlideshow() {
        if (!isPaused) {
            slideInterval = setInterval(nextSlide, 5000);
        }
    }
    
    function stopSlideshow() {
        clearInterval(slideInterval);
    }
    
    // Event listeners
    document.querySelector('.prev')?.addEventListener('click', () => {
        prevSlide();
        stopSlideshow();
        setTimeout(startSlideshow, 8000); // Resume after 8 seconds
    });
    
    document.querySelector('.next')?.addEventListener('click', () => {
        nextSlide();
        stopSlideshow();
        setTimeout(startSlideshow, 8000);
    });
    
    // Indicator click events
    document.querySelectorAll('.indicator').forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopSlideshow();
            setTimeout(startSlideshow, 8000);
        });
    });
    
    // Pause on hover
    slideshowContainer.addEventListener('mouseenter', () => {
        isPaused = true;
        stopSlideshow();
    });
    
    slideshowContainer.addEventListener('mouseleave', () => {
        isPaused = false;
        startSlideshow();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });
    
    // Start the slideshow
    startSlideshow();
}

/**
 * Enhanced page index with better scroll detection
 */
function initPageIndex() {
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

/**
 * Enhanced smooth scrolling for navigation
 */
function initSmoothScrolling() {
    document.querySelectorAll('#main-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            const headerHeight = document.getElementById('main-header').offsetHeight;
            
            if (targetElement) {
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/**
 * Scroll-based effects for header and elements
 */
function initScrollEffects() {
    const header = document.getElementById('main-header');
    let lastScrollY = window.scrollY;
    
    function handleScroll() {
        const currentScrollY = window.scrollY;
        
        // Add scrolled class to header for styling
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Parallax effect for slideshow (if visible)
        const slideshow = document.querySelector('.slideshow-container');
        if (slideshow && currentScrollY < window.innerHeight) {
            const parallaxSpeed = 0.5;
            slideshow.style.transform = `translateY(${currentScrollY * parallaxSpeed}px)`;
        }
        
        lastScrollY = currentScrollY;
    }
    
    window.addEventListener('scroll', throttle(handleScroll, 16)); // ~60fps
}

/**
 * Lazy loading for images
 */
function initImageLazyLoading() {
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
function initAnimationObserver() {
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
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitButton = this.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Show loading state
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        try {
            // Simulate form submission (replace with actual form handling)
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Show success message
            showNotification('Message sent successfully!', 'success');
            contactForm.reset();
        } catch (error) {
            showNotification('Failed to send message. Please try again.', 'error');
        } finally {
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    });
}

/**
 * Theme and visual enhancement elements
 */
function initThemeElements() {
    // Add dynamic background particles (optional)
    createBackgroundParticles();
    
    // Add hover effects to project items
    enhanceProjectItems();
    
}

/**
 * Create subtle background particles
 */
function createBackgroundParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.className = 'background-particles';
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.15;
    `;
    
    // Create particles
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: #ff5722;
            border-radius: 50%;
            animation: float ${10 + Math.random() * 10}s infinite linear;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
    
    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            100% { transform: translateY(-100vh) rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
}

/**
 * Enhance project item interactions
 */
function enhanceProjectItems() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            // Add subtle zoom to image
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1.1)';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) {
                img.style.transform = 'scale(1)';
            }
        });
    });
}



/**
 * Show notification messages
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
        color: white;
        border-radius: 4px;
        z-index: 10000;
        animation: slideInNotification 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add notification animations
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            @keyframes slideInNotification {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes slideOutNotification {
                from { transform: translateX(0); opacity: 1; }
                to { transform: translateX(100%); opacity: 0; }
            }
        `;
        document.head.appendChild(style);
    }
}

/**
 * Utility function for throttling
 */
function throttle(func, limit) {
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
}

/**
 * Utility function for debouncing
 */
function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this, args = arguments;
        const later = function() {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(context, args);
    };
}

function copyEmailToClipboard(event) {
    event.preventDefault();
    
    const email = 'nunombsousa25@gmail.com';
    
    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showEmailCopiedNotification();
        }).catch(err => {
            console.error('Failed to copy email: ', err);
            fallbackCopyTextToClipboard(email);
        });
    } else {
        // Fallback for older browsers
        fallbackCopyTextToClipboard(email);
    }
}

/**
 * Fallback method for copying text
 */
function fallbackCopyTextToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Avoid scrolling to bottom
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showEmailCopiedNotification();
        } else {
            console.error('Fallback: Could not copy text');
        }
    } catch (err) {
        console.error('Fallback: Could not copy text: ', err);
    }
    
    document.body.removeChild(textArea);
}

/**
 * Show notification when email is copied
 */
function showEmailCopiedNotification() {
    // Remove any existing notification
    const existingNotification = document.querySelector('.email-copied-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'email-copied-notification';
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-color);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        z-index: 10000;
        font-size: 0.9rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        animation: slideInEmailNotification 0.3s ease-out;
    `;
    notification.textContent = 'Email copied to clipboard!';
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutEmailNotification 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
    
    // Add CSS animations if not already present
    if (!document.querySelector('#email-notification-styles')) {
        const style = document.createElement('style');
        style.id = 'email-notification-styles';
        style.textContent = `
            @keyframes slideInEmailNotification {
                from { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
                to { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
            }
            @keyframes slideOutEmailNotification {
                from { 
                    transform: translateX(0); 
                    opacity: 1; 
                }
                to { 
                    transform: translateX(100%); 
                    opacity: 0; 
                }
            }
        `;
        document.head.appendChild(style);
    }
}