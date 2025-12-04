// =================================
// DOM Elements
// =================================

const navbar = document.getElementById('navbar');
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const scrollTopBtn = document.getElementById('scroll-top');
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// =================================
// Mobile Menu Toggle
// =================================

mobileMenuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    const icon = mobileMenuBtn.querySelector('i');
    
    if (mobileMenu.classList.contains('hidden')) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    } else {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
    }
});

// Close mobile menu when clicking on a link
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        const icon = mobileMenuBtn.querySelector('i');
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
    });
});

// =================================
// Navbar Scroll Effect
// =================================

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    // Add shadow on scroll
    if (currentScroll > 10) {
        navbar.classList.add('shadow-lg');
    } else {
        navbar.classList.remove('shadow-lg');
    }
    
    // Show/hide scroll to top button
    if (currentScroll > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    lastScroll = currentScroll;
});

// =================================
// Smooth Scroll for Navigation Links
// =================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// =================================
// Scroll to Top Button
// =================================

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// =================================
// Active Navigation Link Highlight
// =================================

const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

function highlightNavigation() {
    const scrollPosition = window.pageYOffset + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('text-indigo-600');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('text-indigo-600');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// =================================
// Intersection Observer for Animations
// =================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// =================================
// Skill Bars Animation
// =================================

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
            skillBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            });
            skillObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.getElementById('skills');
if (skillsSection) {
    skillObserver.observe(skillsSection);
}

// =================================
// Contact Form Handling
// =================================

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        company: document.getElementById('company').value,
        collabType: document.getElementById('collab-type').value,
        message: document.getElementById('message').value,
        timestamp: new Date().toISOString()
    };
    
    // Disable submit button
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
    
    try {
        // Simulate form submission (replace with actual API call if needed)
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        successMessage.classList.remove('hidden');
        contactForm.reset();
        
        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.add('hidden');
        }, 5000);
        
        // Log form data to console (for development)
        console.log('Form submitted:', formData);
        
    } catch (error) {
        console.error('Form submission error:', error);
        alert('There was an error submitting your message. Please try again or contact directly via email.');
    } finally {
        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
});

// =================================
// Typing Effect for Hero Section
// =================================

function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Optional: Add typing effect on load
// Uncomment if you want this feature
/*
window.addEventListener('load', () => {
    const heroText = document.querySelector('.hero-typing-text');
    if (heroText) {
        const originalText = heroText.textContent;
        typeWriter(heroText, originalText, 50);
    }
});
*/

// =================================
// Particle Background Effect (Optional)
// =================================

function createParticles() {
    const hero = document.querySelector('#home');
    if (!hero) return;
    
    const particleCount = 20;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.4), rgba(118, 75, 162, 0.4));
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        hero.appendChild(particle);
    }
    
    // Add keyframes for floating animation
    const style = document.createElement('style');
    style.innerHTML = `
        @keyframes float {
            0%, 100% {
                transform: translateY(0) translateX(0);
                opacity: 0.4;
            }
            25% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
            50% {
                transform: translateY(-40px) translateX(-10px);
                opacity: 0.8;
            }
            75% {
                transform: translateY(-20px) translateX(10px);
                opacity: 0.6;
            }
        }
    `;
    document.head.appendChild(style);
}

// Uncomment to enable particle effect
// createParticles();

// =================================
// YouTube Channel Stats (Optional)
// =================================

// If you have access to YouTube API, you can fetch real stats
// This is a placeholder function
async function fetchYouTubeStats() {
    // Replace with actual YouTube API call
    // const API_KEY = 'YOUR_API_KEY';
    // const CHANNEL_ID = 'YOUR_CHANNEL_ID';
    // const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`;
    
    // For now, returning mock data
    return {
        subscribers: '10K+',
        videos: '100+',
        views: '500K+'
    };
}

// Uncomment to fetch and display real stats
/*
fetchYouTubeStats().then(stats => {
    console.log('YouTube Stats:', stats);
    // Update DOM elements with stats
});
*/

// =================================
// Performance Monitoring
// =================================

// Monitor page load performance
window.addEventListener('load', () => {
    const loadTime = performance.now();
    console.log(`Page loaded in ${loadTime.toFixed(2)}ms`);
});

// =================================
// Lazy Loading Images (if any added later)
// =================================

const lazyImages = document.querySelectorAll('img[data-src]');

const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
        }
    });
});

lazyImages.forEach(img => imageObserver.observe(img));

// =================================
// Theme Toggle (Optional Feature)
// =================================

function initThemeToggle() {
    const theme = localStorage.getItem('theme') || 'light';
    document.documentElement.classList.toggle('dark', theme === 'dark');
}

// Uncomment to enable theme toggle
// initThemeToggle();

// =================================
// Analytics Event Tracking (Optional)
// =================================

function trackEvent(eventName, eventData) {
    // Replace with your analytics service (Google Analytics, etc.)
    console.log('Event tracked:', eventName, eventData);
    
    // Example for Google Analytics
    // gtag('event', eventName, eventData);
}

// Track important interactions
document.querySelectorAll('.btn-primary, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', (e) => {
        trackEvent('button_click', {
            button_text: e.target.textContent.trim(),
            button_url: e.target.href
        });
    });
});

// Track social media clicks
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('click', (e) => {
        const platform = e.currentTarget.querySelector('i').className;
        trackEvent('social_click', { platform });
    });
});

// =================================
// Console Message
// =================================

console.log('%c👋 Welcome to Asha Suthar\'s Portfolio!', 'font-size: 20px; font-weight: bold; color: #4f46e5;');
console.log('%c🚀 Built with passion for the tech community', 'font-size: 14px; color: #6b7280;');
console.log('%c📺 Check out Beyond The Console: https://www.youtube.com/@beyondtheconsole', 'font-size: 14px; color: #dc2626;');

// =================================
// Initialize on Page Load
// =================================

document.addEventListener('DOMContentLoaded', () => {
    // Add loaded class to body for any CSS transitions
    document.body.classList.add('loaded');
    
    // Initialize any third-party libraries here
    console.log('Website initialized successfully! ✨');
});