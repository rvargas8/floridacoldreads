// Florida Cold Reads - Main JavaScript File
// This file contains reusable JavaScript functions and features

// ============================================
// UTILITY FUNCTIONS
// ============================================

/**
 * Smooth scroll to element
 */
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Show loading state on button
 */
function showLoading(button, loadingText = 'Loading...') {
    if (button) {
        button.dataset.originalText = button.innerHTML;
        button.innerHTML = `<span class="loading-spinner"></span> ${loadingText}`;
        button.disabled = true;
    }
}

/**
 * Hide loading state on button
 */
function hideLoading(button) {
    if (button && button.dataset.originalText) {
        button.innerHTML = button.dataset.originalText;
        button.disabled = false;
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info', duration = 3000) {
    // Create toast element
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#13294B'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    // Remove after duration
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

/**
 * Format date nicely
 */
function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-US', options);
}

/**
 * Copy text to clipboard
 */
async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('Copied to clipboard!', 'success', 2000);
        return true;
    } catch (err) {
        console.error('Failed to copy:', err);
        showToast('Failed to copy', 'error', 2000);
        return false;
    }
}

// ============================================
// FEATURE: PROGRESS TRACKING
// ============================================

/**
 * Track reading progress
 */
function trackProgress(passageId, score) {
    const progress = JSON.parse(localStorage.getItem('readingProgress') || '{}');
    progress[passageId] = {
        score: score,
        completed: true,
        date: new Date().toISOString()
    };
    localStorage.setItem('readingProgress', JSON.stringify(progress));
    showToast(`Progress saved! Score: ${score}%`, 'success');
}

/**
 * Get progress for a passage
 */
function getProgress(passageId) {
    const progress = JSON.parse(localStorage.getItem('readingProgress') || '{}');
    return progress[passageId] || null;
}

/**
 * Get all progress
 */
function getAllProgress() {
    return JSON.parse(localStorage.getItem('readingProgress') || '{}');
}

/**
 * Clear all progress
 */
function clearAllProgress() {
    if (confirm('Are you sure you want to clear all progress?')) {
        localStorage.removeItem('readingProgress');
        showToast('All progress cleared', 'success');
        location.reload();
    }
}

// ============================================
// FEATURE: DARK MODE TOGGLE
// ============================================

function initDarkMode() {
    const darkModeToggle = document.getElementById('darkModeToggle');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    if (isDarkMode) {
        document.body.classList.add('dark-mode');
    }
    
    if (darkModeToggle) {
        darkModeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('darkMode', isDark);
            showToast(isDark ? 'Dark mode enabled' : 'Light mode enabled', 'info', 2000);
        });
    }
}

// ============================================
// FEATURE: READING TIMER
// ============================================

let readingTimer = null;
let startTime = null;

function startReadingTimer() {
    startTime = Date.now();
    readingTimer = setInterval(() => {
        const elapsed = Math.floor((Date.now() - startTime) / 1000);
        const minutes = Math.floor(elapsed / 60);
        const seconds = elapsed % 60;
        const timerDisplay = document.getElementById('readingTimer');
        if (timerDisplay) {
            timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        }
    }, 1000);
}

function stopReadingTimer() {
    if (readingTimer) {
        clearInterval(readingTimer);
        readingTimer = null;
    }
}

function getReadingTime() {
    if (startTime) {
        return Math.floor((Date.now() - startTime) / 1000);
    }
    return 0;
}

// ============================================
// FEATURE: PRINT FUNCTIONALITY
// ============================================

function printPage() {
    window.print();
}

function printPassage(passageId) {
    // Could implement selective printing
    window.print();
}

// ============================================
// FEATURE: SHARE FUNCTIONALITY
// ============================================

async function sharePage() {
    const shareData = {
        title: 'Florida Cold Reads',
        text: 'Practice reading comprehension with Florida Cold Reads!',
        url: window.location.href
    };
    
    try {
        if (navigator.share) {
            await navigator.share(shareData);
            showToast('Shared successfully!', 'success');
        } else {
            // Fallback: copy URL
            await copyToClipboard(window.location.href);
        }
    } catch (err) {
        if (err.name !== 'AbortError') {
            console.error('Error sharing:', err);
        }
    }
}

// ============================================
// FEATURE: ANALYTICS TRACKING
// ============================================

function trackEvent(eventName, eventData = {}) {
    // Simple analytics tracking
    const analytics = JSON.parse(localStorage.getItem('analytics') || '[]');
    analytics.push({
        event: eventName,
        data: eventData,
        timestamp: new Date().toISOString(),
        url: window.location.href
    });
    
    // Keep only last 100 events
    if (analytics.length > 100) {
        analytics.shift();
    }
    
    localStorage.setItem('analytics', JSON.stringify(analytics));
}

// Track page views
function trackPageView() {
    trackEvent('page_view', {
        page: window.location.pathname,
        referrer: document.referrer
    });
}

// ============================================
// INITIALIZATION
// ============================================

// Run when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize dark mode
    initDarkMode();
    
    // Track page view
    trackPageView();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('passageSearch');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape to close modals/menus
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('navMenu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
    
    console.log('Florida Cold Reads - JavaScript loaded successfully!');
});

// Export functions for use in other scripts
window.FloridaColdReads = {
    smoothScrollTo,
    showLoading,
    hideLoading,
    showToast,
    trackProgress,
    getProgress,
    getAllProgress,
    clearAllProgress,
    startReadingTimer,
    stopReadingTimer,
    getReadingTime,
    sharePage,
    copyToClipboard,
    trackEvent
};


