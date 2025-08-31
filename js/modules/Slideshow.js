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
        
        // Navigation arrows removed to prevent UI artifacts
    }
    
    addEventListeners() {
        // Navigation arrow event listeners removed
        
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
        
        // Make slideshow images clickable for fullscreen - same as grid gallery
        this.slides.forEach((slide, index) => {
            const img = slide.querySelector('img');
            if (img) {
                img.classList.add('gallery-clickable');
                img.style.cursor = 'pointer';
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
}