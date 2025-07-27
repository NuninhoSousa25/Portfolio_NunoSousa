/**
 * Nuno Sousa - 3D Artist Portfolio
 * Main JavaScript file
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSlideshow();
    initPageIndex();
    initSmoothScrolling();
});

/**
 * Slideshow functionality for the homepage
 */
function initSlideshow() {
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;
    
    function showSlide(n) {
        // Hide all slides
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Set current slide
        currentSlide = (n + slides.length) % slides.length;
        
        // Show current slide
        slides[currentSlide].classList.add('active');
    }
    
    // Auto slide change
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // Change slide every 5 seconds
}

/**
 * Page index functionality (dots on the right side)
 */
function initPageIndex() {
    const sections = ['home', 'projects', 'about', 'cv', 'contact'];
    const indexDots = document.querySelectorAll('.index-dot');
    
    // Smooth scroll to section when clicking index dot
    indexDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            document.getElementById(sections[index]).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
    
    // Update active index dot based on scroll position
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        sections.forEach((section, index) => {
            const element = document.getElementById(section);
            const elementPosition = element.offsetTop;
            const elementHeight = element.offsetHeight;
            
            if (scrollPosition >= elementPosition - 200 && 
                scrollPosition < elementPosition + elementHeight - 200) {
                indexDots.forEach(dot => dot.classList.remove('active'));
                indexDots[index].classList.add('active');
            }
        });
    });
}

/**
 * Smooth scrolling for navigation links
 */
function initSmoothScrolling() {
    document.querySelectorAll('#main-nav a').forEach(anchor => { // Target links inside #main-nav
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            // === ADJUST SCROLL OFFSET HERE ===
            // Estimate the height of your sticky #main-header
            const headerHeight = 100; // <<< CHANGE THIS VALUE (in pixels)
            // === --- ===

            if (targetElement) { // Check if target exists
                 window.scrollTo({
                    top: targetElement.offsetTop - headerHeight, // Subtract header height
                    behavior: 'smooth'
                });
            }
        });
    });
}