// Florida Cold Reads - Additional Features JavaScript

// ============================================
// FEATURE: SCORE CALCULATOR
// ============================================

function calculateScore(correctAnswers, totalQuestions) {
    const percentage = Math.round((correctAnswers / totalQuestions) * 100);
    return {
        percentage: percentage,
        correct: correctAnswers,
        total: totalQuestions,
        grade: getGrade(percentage)
    };
}

function getGrade(percentage) {
    if (percentage >= 90) return 'A';
    if (percentage >= 80) return 'B';
    if (percentage >= 70) return 'C';
    if (percentage >= 60) return 'D';
    return 'F';
}

// ============================================
// FEATURE: QUESTION VALIDATION
// ============================================

function validateAnswers(questions) {
    const results = [];
    questions.forEach((question, index) => {
        const selectedAnswer = document.querySelector(`input[name="q${index + 1}"]:checked`);
        const isCorrect = selectedAnswer && selectedAnswer.value === question.correctAnswer;
        
        results.push({
            questionNumber: index + 1,
            selected: selectedAnswer ? selectedAnswer.value : null,
            correct: question.correctAnswer,
            isCorrect: isCorrect
        });
    });
    
    return results;
}

// ============================================
// FEATURE: ANIMATIONS
// ============================================

function fadeIn(element, duration = 300) {
    element.style.opacity = '0';
    element.style.display = 'block';
    
    let start = null;
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = Math.min(progress / duration, 1);
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        }
    }
    requestAnimationFrame(animate);
}

function fadeOut(element, duration = 300) {
    let start = null;
    const startOpacity = parseFloat(window.getComputedStyle(element).opacity);
    
    function animate(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const opacity = startOpacity * (1 - Math.min(progress / duration, 1));
        element.style.opacity = opacity;
        
        if (progress < duration) {
            requestAnimationFrame(animate);
        } else {
            element.style.display = 'none';
        }
    }
    requestAnimationFrame(animate);
}

// ============================================
// FEATURE: FORM VALIDATION
// ============================================

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.classList.add('error');
            isValid = false;
        } else {
            input.classList.remove('error');
            
            // Email validation
            if (input.type === 'email' && !validateEmail(input.value)) {
                input.classList.add('error');
                isValid = false;
            }
        }
    });
    
    return isValid;
}

// ============================================
// FEATURE: LAZY LOADING IMAGES
// ============================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ============================================
// FEATURE: SMOOTH ANIMATIONS ON SCROLL
// ============================================

function initScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in-on-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(el => observer.observe(el));
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize lazy loading
    initLazyLoading();
    
    // Initialize scroll animations
    initScrollAnimations();
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .fade-in-on-scroll {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .fade-in-on-scroll.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        .error {
            border-color: #f44336 !important;
            box-shadow: 0 0 0 2px rgba(244, 67, 54, 0.2) !important;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .loading-spinner {
            display: inline-block;
            width: 12px;
            height: 12px;
            border: 2px solid rgba(255,255,255,0.3);
            border-radius: 50%;
            border-top-color: white;
            animation: spin 0.6s linear infinite;
        }
        
        @keyframes spin {
            to { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
});

// Export functions
window.FloridaColdReadsFeatures = {
    calculateScore,
    getGrade,
    validateAnswers,
    fadeIn,
    fadeOut,
    validateEmail,
    validateForm
};

