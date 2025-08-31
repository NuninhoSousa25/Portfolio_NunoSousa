/**
 * Gallery Module
 * Reusable fullscreen gallery class for all project pages
 */
export class FullscreenGallery {
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
        
        // Zoom functionality variables
        this.zoomLevel = 1;
        this.minZoom = 1;
        this.maxZoom = 5;
        this.zoomStep = 0.3;
        this.isPanning = false;
        this.panStartX = 0;
        this.panStartY = 0;
        this.translateX = 0;
        this.translateY = 0;
        this.lastTouchTime = 0;
        this.touchCount = 0;
        
        // Pinch zoom variables for mobile
        this.lastPinchDistance = 0;
        this.isPinching = false;
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
        console.log('Gallery: Found', galleryMedia.length, 'media elements');
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
                console.log('Gallery: Opening gallery with media:', mediaData);
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
        
        this.addZoomEventListeners();
        this.addTouchEventListeners();
    }
    
    addZoomEventListeners() {
        // Mouse wheel zoom for desktop
        this.overlay.addEventListener('wheel', (e) => {
            if (!this.isOpen) return;
            e.preventDefault();
            
            if (e.deltaY < 0) {
                this.zoomIn();
            } else {
                this.zoomOut();
            }
        }, { passive: false });
        
        // Mouse pan for desktop
        this.overlay.addEventListener('mousedown', (e) => {
            if (!this.isOpen || this.zoomLevel <= 1) return;
            
            // Only pan with left mouse button
            if (e.button === 0) {
                this.isPanning = true;
                this.panStartX = e.clientX;
                this.panStartY = e.clientY;
                this.overlay.style.cursor = 'grabbing';
                e.preventDefault();
            }
        });
        
        this.overlay.addEventListener('mousemove', (e) => {
            if (!this.isOpen) return;
            
            if (this.isPanning && this.zoomLevel > 1) {
                e.preventDefault();
                const deltaX = e.clientX - this.panStartX;
                const deltaY = e.clientY - this.panStartY;
                
                this.translateX += deltaX;
                this.translateY += deltaY;
                
                this.panStartX = e.clientX;
                this.panStartY = e.clientY;
                
                this.updateImageTransform();
            } else if (this.zoomLevel > 1) {
                // Show grab cursor when hovering over zoomed image
                this.overlay.style.cursor = 'grab';
            } else {
                this.overlay.style.cursor = 'default';
            }
        });
        
        this.overlay.addEventListener('mouseup', () => {
            if (this.isPanning) {
                this.isPanning = false;
                this.overlay.style.cursor = this.zoomLevel > 1 ? 'grab' : 'default';
            }
        });
        
        // Handle mouse leave to stop panning
        this.overlay.addEventListener('mouseleave', () => {
            if (this.isPanning) {
                this.isPanning = false;
                this.overlay.style.cursor = 'default';
            }
        });
    }
    
    addTouchEventListeners() {
        // Touch/swipe controls for mobile
        this.overlay.addEventListener('touchstart', (e) => {
            if (!this.isOpen) return;
            
            const touches = e.touches;
            this.touchCount = touches.length;
            
            if (touches.length === 1) {
                // Single touch - prepare for swipe or double tap
                this.touchStartX = touches[0].clientX;
                this.touchStartY = touches[0].clientY;
                this.panStartX = touches[0].clientX;
                this.panStartY = touches[0].clientY;
                
                // Double tap detection
                const currentTime = new Date().getTime();
                const tapLength = currentTime - this.lastTouchTime;
                if (tapLength < 500 && tapLength > 0) {
                    this.handleDoubleTap();
                }
                this.lastTouchTime = currentTime;
                
                // Start panning if zoomed
                if (this.zoomLevel > 1) {
                    this.isPanning = true;
                }
            } else if (touches.length === 2) {
                // Pinch zoom preparation
                this.isPinching = true;
                this.lastPinchDistance = this.getPinchDistance(touches);
            }
        }, { passive: true });
        
        this.overlay.addEventListener('touchmove', (e) => {
            if (!this.isOpen) return;
            
            const touches = e.touches;
            
            if (touches.length === 1 && this.isPanning && this.zoomLevel > 1) {
                // Pan the image
                e.preventDefault();
                const deltaX = touches[0].clientX - this.panStartX;
                const deltaY = touches[0].clientY - this.panStartY;
                
                this.translateX += deltaX;
                this.translateY += deltaY;
                
                this.panStartX = touches[0].clientX;
                this.panStartY = touches[0].clientY;
                
                this.updateImageTransform();
            } else if (touches.length === 2 && this.isPinching) {
                // Pinch zoom
                e.preventDefault();
                const currentDistance = this.getPinchDistance(touches);
                const scale = currentDistance / this.lastPinchDistance;
                
                this.zoomLevel = Math.max(this.minZoom, Math.min(this.maxZoom, this.zoomLevel * scale));
                this.lastPinchDistance = currentDistance;
                
                this.updateImageTransform();
            }
        }, { passive: false });
        
        this.overlay.addEventListener('touchend', (e) => {
            if (!this.isOpen) return;
            
            const touches = e.changedTouches;
            
            if (this.touchCount === 1 && !this.isPanning) {
                // Handle swipe if not panning
                this.touchEndX = touches[0].clientX;
                this.touchEndY = touches[0].clientY;
                this.handleSwipe();
            }
            
            this.isPanning = false;
            this.isPinching = false;
            this.touchCount = 0;
        }, { passive: true });
    }
    
    openGallery(index) {
        this.currentIndex = index;
        this.isOpen = true;
        this.resetZoom();
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
        this.resetZoom();
        this.updateMedia();
    }
    
    nextMedia() {
        this.currentIndex = (this.currentIndex + 1) % this.media.length;
        this.resetZoom();
        this.updateMedia();
    }
    
    updateMedia() {
        if (!this.media.length) return;
        
        const currentMedia = this.media[this.currentIndex];
        console.log('Gallery: Updating to media:', currentMedia);
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
    
    // Zoom functionality methods
    zoomIn() {
        if (this.zoomLevel < this.maxZoom) {
            this.zoomLevel = Math.min(this.maxZoom, this.zoomLevel + this.zoomStep);
            this.updateImageTransform();
        }
    }
    
    zoomOut() {
        if (this.zoomLevel > this.minZoom) {
            this.zoomLevel = Math.max(this.minZoom, this.zoomLevel - this.zoomStep);
            this.updateImageTransform();
            
            // Reset translation if back to min zoom
            if (this.zoomLevel === this.minZoom) {
                this.translateX = 0;
                this.translateY = 0;
            }
        }
    }
    
    resetZoom() {
        this.zoomLevel = this.minZoom;
        this.translateX = 0;
        this.translateY = 0;
        this.isPanning = false;
        if (this.overlay) {
            this.overlay.style.cursor = 'default';
        }
        this.updateImageTransform();
    }
    
    handleDoubleTap() {
        if (this.zoomLevel === this.minZoom) {
            // Zoom in to 2x on double tap
            this.zoomLevel = 2;
        } else {
            // Reset zoom on double tap if already zoomed
            this.zoomLevel = this.minZoom;
            this.translateX = 0;
            this.translateY = 0;
        }
        this.updateImageTransform();
    }
    
    updateImageTransform() {
        if (this.fullscreenImg && this.fullscreenImg.style.display !== 'none') {
            this.fullscreenImg.style.transform = `scale(${this.zoomLevel}) translate(${this.translateX / this.zoomLevel}px, ${this.translateY / this.zoomLevel}px)`;
            this.fullscreenImg.style.transformOrigin = 'center center';
            this.fullscreenImg.style.transition = this.isPanning || this.isPinching ? 'none' : 'transform 0.3s ease';
        }
    }
    
    getPinchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.sqrt(dx * dx + dy * dy);
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
export function initFullscreenGallery() {
    // Only initialize if there are gallery items on the page
    const galleryItems = document.querySelectorAll('.gallery-item img, .gallery-item video, .gallery-clickable');
    if (galleryItems.length > 0) {
        const gallery = new FullscreenGallery();
        gallery.init();
        return gallery;
    }
    return null;
}