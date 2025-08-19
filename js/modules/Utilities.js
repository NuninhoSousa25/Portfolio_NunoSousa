/**
 * Utilities Module
 * Utility functions for throttling, debouncing, notifications, and clipboard operations
 */

/**
 * Utility function for throttling
 */
export function throttle(func, limit) {
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
export function debounce(func, wait, immediate) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
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

/**
 * Show notification messages
 */
export function showNotification(message, type = 'info') {
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
 * Copy email to clipboard functionality
 */
export function copyEmailToClipboard(event) {
    event.preventDefault();
    
    const email = 'nunombsousa25@gmail.com';
    
    // Try to use the modern clipboard API
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(() => {
            showEmailCopiedNotification();
        }).catch(() => {
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
 * Enhanced email copy with language support
 */
export function showEmailCopiedNotification() {
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

// Make functions available globally for backwards compatibility
window.copyEmailToClipboard = copyEmailToClipboard;
window.showNotification = showNotification;