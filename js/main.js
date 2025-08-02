/**
 * Nuno Sousa - 3D Artist Portfolio
 * Enhanced JavaScript with modern interactions
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initMobileMenu(); 
    initSlideshow();
    initPageIndex();
    initSmoothScrolling();
    initScrollEffects();
    initImageLazyLoading();
    initAnimationObserver();
    initContactForm();
    initThemeElements();
    initLanguageToggle();
    initFullscreenGallery();
});

/**
 * Initializes the mobile hamburger menu functionality.
 */
function initMobileMenu() {
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
    
    // Create particles with better performance
    for (let i = 0; i < 15; i++) { // Reduced from 20 to 15 for better performance
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 15}s`;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
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
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutNotification 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
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
    textArea.className = 'clipboard-textarea';
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            showEmailCopiedNotification();
        }
    } catch (err) {
        // Silent fallback - clipboard copy failed
    }
    
    document.body.removeChild(textArea);
}



/**
 * Language Toggle Functionality
 */
function initLanguageToggle() {
    const langOptions = document.querySelectorAll('.lang-option');
    const body = document.body;
    
    if (!langOptions.length) return;
    
    // Get saved language or default to English
    const savedLang = localStorage.getItem('preferred-language') || 'en';
    setLanguage(savedLang);
    
    langOptions.forEach(option => {
        option.addEventListener('click', function() {
            const selectedLang = this.getAttribute('data-lang-switch');
            setLanguage(selectedLang);
            localStorage.setItem('preferred-language', selectedLang);
        });
    });
    
    function setLanguage(lang) {
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
}

/**
 * Enhanced email copy with language support
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
    
    // Check current language and set appropriate message
    const isPortuguese = document.body.classList.contains('lang-pt');
    notification.textContent = isPortuguese ? 'Email copiado!' : 'Email copied to clipboard!';
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutEmailNotification 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/**
 * ==== FULLSCREEN GALLERY FUNCTIONALITY ====
 * Reusable fullscreen gallery class for all project pages
 */
class FullscreenGallery {
    constructor() {
        this.media = [];
        this.currentIndex = 0;
        this.isOpen = false;
        
        // DOM elements (will be created if they don't exist)
        this.overlay = null;
        this.fullscreenImg = null;
        this.fullscreenVideo = null;
        this.fullscreenYoutube = null;
        this.closeBtn = null;
        this.prevBtn = null;
        this.nextBtn = null;
        this.counter = null;
        
        // Touch/swipe variables
        this.touchStartX = 0;
        this.touchStartY = 0;
        this.touchEndX = 0;
        this.touchEndY = 0;
        this.minSwipeDistance = 50;
    }
    
    init() {
        // Create overlay HTML if it doesn't exist
        this.createOverlayHTML();
        
        // Get DOM references
        this.overlay = document.getElementById('fullscreen-gallery');
        this.fullscreenImg = document.getElementById('fullscreen-img');
        this.fullscreenVideo = document.getElementById('fullscreen-video');
        this.fullscreenYoutube = document.getElementById('fullscreen-youtube');
        this.closeBtn = document.getElementById('fullscreen-close');
        this.prevBtn = document.getElementById('fullscreen-prev');
        this.nextBtn = document.getElementById('fullscreen-next');
        this.counter = document.getElementById('fullscreen-counter');
        
        // Collect all gallery media (images, videos, and YouTube)
        this.collectMedia();
        
        // Add event listeners
        this.addEventListeners();
    }
    
    createOverlayHTML() {
        // Check if overlay already exists
        if (document.getElementById('fullscreen-gallery')) return;
        
        const overlayHTML = `
            <div class="fullscreen-overlay" id="fullscreen-gallery">
                <div class="fullscreen-content">
                    <img src="" alt="" class="fullscreen-image" id="fullscreen-img" style="display: none;">
                    <video class="fullscreen-video" id="fullscreen-video" controls style="display: none;">
                        <source src="" type="video/mp4">
                        Your browser does not support the video tag.
                    </video>
                    <iframe class="fullscreen-youtube" id="fullscreen-youtube" style="display: none;" allowfullscreen></iframe>
                    <button class="fullscreen-close" id="fullscreen-close" aria-label="Close fullscreen">×</button>
                    <button class="fullscreen-nav fullscreen-prev" id="fullscreen-prev" aria-label="Previous media">‹</button>
                    <button class="fullscreen-nav fullscreen-next" id="fullscreen-next" aria-label="Next media">›</button>
                    <div class="fullscreen-counter" id="fullscreen-counter">1 / 1</div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', overlayHTML);
    }
    
    collectMedia() {
        // Collect all gallery media (images, videos, and YouTube)
        const galleryMedia = document.querySelectorAll('.gallery-clickable, .gallery-item img, .gallery-item video');
        this.media = Array.from(galleryMedia).map(element => {
            const tagName = element.tagName.toLowerCase();
            const isVideo = tagName === 'video';
            const isYoutube = element.getAttribute('data-media-type') === 'youtube' || 
                             element.closest('[data-media-type="youtube"]');
            
            let type = 'image';
            let src = element.src;
            
            if (isVideo) {
                type = 'video';
            } else if (isYoutube) {
                type = 'youtube';
                // For YouTube, get the iframe src from the sibling iframe
                const iframe = element.parentElement.querySelector('iframe') || 
                              element.closest('.gallery-item').querySelector('iframe');
                src = iframe ? iframe.src : '';
            }
            
            return {
                src: src,
                alt: element.alt || 'Media',
                type: type,
                element: element
            };
        });
        
        // Add click listeners to all collected media
        this.media.forEach((mediaData, index) => {
            mediaData.element.addEventListener('click', (e) => {
                e.preventDefault();
                this.openGallery(index);
            });
            
            // Add cursor pointer style
            mediaData.element.style.cursor = 'pointer';
        });
    }
    
    addEventListeners() {
        if (!this.overlay) return;
        
        // Control button listeners
        this.closeBtn?.addEventListener('click', () => this.closeGallery());
        this.prevBtn?.addEventListener('click', () => this.prevMedia());
        this.nextBtn?.addEventListener('click', () => this.nextMedia());
        
        // Close on overlay click (but not on content click)
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.closeGallery();
            }
        });
        
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (!this.isOpen) return;
            
            switch(e.key) {
                case 'Escape':
                    this.closeGallery();
                    break;
                case 'ArrowLeft':
                    this.prevMedia();
                    break;
                case 'ArrowRight':
                    this.nextMedia();
                    break;
            }
        });
        
        // Touch/swipe controls for mobile
        this.overlay.addEventListener('touchstart', (e) => {
            if (!this.isOpen) return;
            this.touchStartX = e.changedTouches[0].screenX;
            this.touchStartY = e.changedTouches[0].screenY;
        }, { passive: true });
        
        this.overlay.addEventListener('touchend', (e) => {
            if (!this.isOpen) return;
            this.touchEndX = e.changedTouches[0].screenX;
            this.touchEndY = e.changedTouches[0].screenY;
            this.handleSwipe();
        }, { passive: true });
    }
    
    openGallery(index) {
        this.currentIndex = index;
        this.isOpen = true;
        this.updateMedia();
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    closeGallery() {
        this.isOpen = false;
        this.overlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
        
        // Pause any playing video
        if (this.fullscreenVideo) {
            this.fullscreenVideo.pause();
        }
        
        // Stop YouTube video by removing src
        if (this.fullscreenYoutube) {
            this.fullscreenYoutube.src = '';
        }
    }
    
    prevMedia() {
        this.currentIndex = (this.currentIndex - 1 + this.media.length) % this.media.length;
        this.updateMedia();
    }
    
    nextMedia() {
        this.currentIndex = (this.currentIndex + 1) % this.media.length;
        this.updateMedia();
    }
    
    updateMedia() {
        if (!this.media.length) return;
        
        const currentMedia = this.media[this.currentIndex];
        const elements = [this.fullscreenImg, this.fullscreenVideo, this.fullscreenYoutube];
        
        // Hide all elements and reset
        elements.forEach(el => {
            if (el) {
                el.style.display = 'none';
                if (el.tagName === 'VIDEO') el.pause();
                if (el.tagName === 'IFRAME') el.src = '';
            }
        });
        
        // Show appropriate element
        if (currentMedia.type === 'video' && this.fullscreenVideo) {
            this.fullscreenVideo.style.display = 'block';
            this.fullscreenVideo.src = currentMedia.src;
            this.fullscreenVideo.load();
            
            // Autoplay the video when ready
            this.fullscreenVideo.addEventListener('loadeddata', () => {
                this.fullscreenVideo.play().catch(() => {
                    // Autoplay prevented - expected behavior
                });
            }, { once: true });
        } else if (currentMedia.type === 'youtube' && this.fullscreenYoutube) {
            this.fullscreenYoutube.style.display = 'block';
            this.fullscreenYoutube.src = FullscreenGallery.getYouTubeEmbedUrl(currentMedia.src);
        } else if (this.fullscreenImg) {
            this.fullscreenImg.style.display = 'block';
            this.fullscreenImg.src = currentMedia.src;
            this.fullscreenImg.alt = currentMedia.alt;
        }
        
        // Update counter and navigation
        if (this.counter) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.media.length}`;
        }
        
        const showNav = this.media.length > 1;
        if (this.prevBtn) this.prevBtn.style.display = showNav ? 'flex' : 'none';
        if (this.nextBtn) this.nextBtn.style.display = showNav ? 'flex' : 'none';
    }
    
    handleSwipe() {
        const deltaX = this.touchEndX - this.touchStartX;
        const deltaY = this.touchEndY - this.touchStartY;
        
        // Check if it's a horizontal swipe (not vertical scroll)
        if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > this.minSwipeDistance) {
            if (deltaX > 0) {
                // Swiped right - go to previous media
                this.prevMedia();
            } else {
                // Swiped left - go to next media
                this.nextMedia();
            }
        }
    }
    
    // Helper function to convert YouTube URL to embed URL
    static getYouTubeEmbedUrl(url) {
        const videoIdMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/);
        if (videoIdMatch) {
            return `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1&rel=0`;
        }
        return url;
    }
}

/**
 * Initialize fullscreen gallery functionality
 */
function initFullscreenGallery() {
    // Only initialize if there are gallery items on the page
    const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-item video, .gallery-clickable');
    if (galleryItems.length > 0) {
        const gallery = new FullscreenGallery();
        gallery.init();
    }
}