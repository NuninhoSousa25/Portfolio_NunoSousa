/**
 * Slideshow Module
 * Enhanced slideshow with better transitions and controls
 */
export class Slideshow {
    constructor() {
        this.slides = [];
        this.slideshowContainer = null;
        this.currentSlide = 0;
        this.slideInterval = null;
        this.isPaused = false;
        
        this.init();
    }
    
    init() {
        this.slides = document.querySelectorAll('.slide');
        this.slideshowContainer = document.querySelector('.slideshow-container');
        
        if (!this.slides.length) return;
        
        this.createControls();
        this.addEventListeners();
        this.startSlideshow();
    }
    
    createControls() {
        // Create slide indicators
        const indicatorsContainer = document.createElement('div');
        indicatorsContainer.className = 'slideshow-indicators';
        indicatorsContainer.innerHTML = Array.from(this.slides).map((_, index) => 
            `<button class="indicator ${index === 0 ? 'active' : ''}" data-slide="${index}"></button>`
        ).join('');
        this.slideshowContainer.appendChild(indicatorsContainer);
        
        // Create navigation arrows
        const navContainer = document.createElement('div');
        navContainer.className = 'slideshow-nav';
        navContainer.innerHTML = `
            <button class="nav-btn prev" aria-label="Previous slide">‹</button>
            <button class="nav-btn next" aria-label="Next slide">›</button>
        `;
        this.slideshowContainer.appendChild(navContainer);
    }
    
    addEventListeners() {
        // Event listeners
        document.querySelector('.prev')?.addEventListener('click', () => {
            this.prevSlide();
            this.stopSlideshow();
            setTimeout(() => this.startSlideshow(), 8000); // Resume after 8 seconds
        });
        
        document.querySelector('.next')?.addEventListener('click', () => {
            this.nextSlide();
            this.stopSlideshow();
            setTimeout(() => this.startSlideshow(), 8000);
        });
        
        // Indicator click events
        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                this.showSlide(index);
                this.stopSlideshow();
                setTimeout(() => this.startSlideshow(), 8000);
            });
        });
        
        // Pause on hover
        this.slideshowContainer.addEventListener('mouseenter', () => {
            this.isPaused = true;
            this.stopSlideshow();
        });
        
        this.slideshowContainer.addEventListener('mouseleave', () => {
            this.isPaused = false;
            this.startSlideshow();
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft') this.prevSlide();
            if (e.key === 'ArrowRight') this.nextSlide();
        });
        
        // Make slideshow images clickable for fullscreen
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.style.cursor = 'pointer';
                img.addEventListener('click', (e) => {
                    e.preventDefault();
                    // Open fullscreen gallery starting with the currently active slide
                    this.openSlideshowInFullscreen(this.currentSlide);
                });
            }
        });
    }
    
    showSlide(n) {
        // Hide all slides and remove active class
        this.slides.forEach(slide => slide.classList.remove('active'));
        document.querySelectorAll('.indicator').forEach(indicator => 
            indicator.classList.remove('active'));
        
        // Set current slide with bounds checking
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        // Show current slide and update indicator
        this.slides[this.currentSlide].classList.add('active');
        document.querySelector(`.indicator[data-slide="${this.currentSlide}"]`)
            ?.classList.add('active');
    }
    
    nextSlide() {
        this.showSlide(this.currentSlide + 1);
    }
    
    prevSlide() {
        this.showSlide(this.currentSlide - 1);
    }
    
    startSlideshow() {
        if (!this.isPaused) {
            this.slideInterval = setInterval(() => this.nextSlide(), 5000);
        }
    }
    
    stopSlideshow() {
        clearInterval(this.slideInterval);
    }
    
    /**
     * Opens slideshow images in fullscreen gallery
     */
    openSlideshowInFullscreen(startIndex) {
        // Get all slideshow images
        const slides = document.querySelectorAll('.slide img');
        if (!slides.length) return;
        
        // Create media array for slideshow images
        const slideshowMedia = Array.from(slides).map(img => ({
            src: img.src,
            alt: img.alt || 'Slideshow Image',
            type: 'image',
            element: img
        }));
        
        // Create or get existing fullscreen gallery
        if (!window.slideshowGallery) {
            // Gallery will be available through the app's gallery module
            if (window.portfolioApp && window.portfolioApp.modules.gallery) {
                window.slideshowGallery = window.portfolioApp.modules.gallery;
            } else {
                // Fallback: try to find an existing gallery instance
                const existingGallery = document.getElementById('fullscreen-gallery');
                if (existingGallery) {
                    // Gallery exists but we need to create a new instance
                    // This is a simplified fallback
                    console.warn('Gallery module not available, slideshow fullscreen functionality limited');
                    return;
                }
            }
        }
        
        if (window.slideshowGallery) {
            // Replace media array with slideshow images
            window.slideshowGallery.media = slideshowMedia;
            // Open gallery at the specified index
            window.slideshowGallery.openGallery(startIndex);
        }
    }
}