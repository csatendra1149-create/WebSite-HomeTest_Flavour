// ===== MOBILE MENU TOGGLE =====
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && href !== '#download') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScroll = currentScroll;
});

// ===== INTERSECTION OBSERVER FOR FADE-IN ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all cards and sections
const animatedElements = document.querySelectorAll(
    '.user-card, .feature-card, .usp-card, .step, .scenario'
);

animatedElements.forEach(el => {
    observer.observe(el);
});

// ===== CONTACT FORM SUBMISSION =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            // Send to Formspree
            const formData = new FormData(contactForm);
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('✅ Thank you! Your message has been sent successfully. We\'ll get back to you soon.');
                contactForm.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Something went wrong. Please email us directly at c.satendra1149@gmail.com');
        } finally {
            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== STATS COUNTER ANIMATION =====
const stats = document.querySelectorAll('.stat-number');
let animated = false;

const animateStats = () => {
    if (animated) return;
    
    stats.forEach(stat => {
        const target = parseInt(stat.textContent.replace(/\D/g, ''));
        const suffix = stat.textContent.replace(/[0-9]/g, '');
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;
        
        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                stat.textContent = target + suffix;
                clearInterval(counter);
            } else {
                stat.textContent = Math.floor(current) + suffix;
            }
        }, stepTime);
    });
    
    animated = true;
};

// Trigger stats animation when hero section is in view
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ===== DOWNLOAD BUTTON TRACKING =====
const downloadButtons = document.querySelectorAll('.download-btn');

downloadButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = button.querySelector('.download-large').textContent;
        alert(`Download for ${platform} coming soon! We're working hard to bring HomeTest Flavours to your device.`);
        
        // In a real app, you'd track this click with analytics
        console.log(`User clicked download for: ${platform}`);
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHT =====
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(
    '%c🏠 Welcome to HomeTest Flavours! ',
    'background: linear-gradient(135deg, #FF6B35, #4CAF50); color: white; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log(
    '%cYour Home, Your Flavours, Delivered.',
    'color: #FF6B35; font-size: 16px; font-weight: bold;'

);
// ===== USP MODAL FUNCTIONALITY =====
const uspData = {
    'Personalized Meals': {
        icon: '❤️',
        details: [
            'Custom dietary preferences and restrictions catered to',
            'Family recipes passed down through generations',
            'No preservatives, MSG, or artificial ingredients',
            'Fresh ingredients sourced daily from local markets',
            'Made with love by your own family members',
            'Special occasion meals for birthdays and celebrations'
        ],
        stats: '📊 Over 10,000 personalized meals delivered monthly'
    },
    'City-wide Service': {
        icon: '🌆',
        details: [
            'Currently serving Kathmandu, Birgunj, and Pokhara',
            'Expanding to 5 more cities by end of 2025',
            'Average delivery time: 45 minutes or less',
            'Real-time GPS tracking for all orders',
            'Partnership with 200+ reliable local delivery partners',
            '98% on-time delivery rate'
        ],
        stats: '🚀 3 cities • 500+ daily deliveries • 98% on-time'
    },
    'Supports Home Chefs': {
        icon: '👩‍🍳',
        details: [
            'Empowers home cooks to earn sustainable income',
            'No commercial kitchen or license required',
            'Completely flexible working hours',
            'Fair and transparent compensation model',
            'Community of 200+ registered home chefs',
            'Free training and recipe sharing sessions'
        ],
        stats: '👨‍👩‍👧 Supporting 200+ families across Nepal'
    },
    'Healthier Choice': {
        icon: '🥗',
        details: [
            '30-40% more affordable than restaurant delivery',
            'Completely free from MSG and artificial flavors',
            'Nutritious home-cooked meals with balanced portions',
            'Detailed calorie and nutrition information provided',
            'Support for dietary needs: vegan, diabetic, etc.',
            'Fresh ingredients, no frozen or pre-packaged food'
        ],
        stats: '💰 Save ₹500+ per week compared to restaurants'
    },
    'Emotional Connection': {
        icon: '🤝',
        details: [
            'Stay connected to family food traditions',
            'Share meals with loved ones working remotely',
            'Send surprise meals for special occasions',
            'Optional video messages included with deliveries',
            'Build stronger family bonds through food',
            'Reminds you of home even when far away'
        ],
        stats: '⭐ 95% customer satisfaction • 4.8/5 rating'
    }
};

// Add click handlers to all USP cards
document.querySelectorAll('.usp-card').forEach(card => {
    card.addEventListener('click', () => {
        const title = card.getAttribute('data-title');
        showUSPModal(title);
    });
});

function showUSPModal(title) {
    const data = uspData[title];
    if (!data) return;
    
    const modal = document.getElementById('uspModal');
    
    // Populate modal content
    document.getElementById('modalIcon').textContent = data.icon;
    document.getElementById('modalTitle').textContent = title;
    
    // Create details list
    const detailsList = data.details.map(detail => `<li>${detail}</li>`).join('');
    document.getElementById('modalDetails').innerHTML = `<ul>${detailsList}</ul>`;
    
    // Add stats
    document.getElementById('modalStats').textContent = data.stats;
    
    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeUSPModal() {
    const modal = document.getElementById('uspModal');
    modal.classList.remove('show');
    document.body.style.overflow = ''; // Restore scrolling
}

function scrollToDownload() {
    closeUSPModal();
    setTimeout(() => {
        document.getElementById('download').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 300);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUSPModal();
    }
});

