// ===== MOBILE MENU TOGGLE =====
const mobileToggle = document.querySelector('.mobile-toggle');
const navLinks = document.querySelector('.nav-links');

if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        mobileToggle.classList.toggle('active');
    });
}

// ===== CLOSE MOBILE MENU WHEN LINK IS CLICKED =====
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            mobileToggle.classList.remove('active');
        }
    });
});

// ===== CITY REQUEST FUNCTIONS =====
function fillCityName(city) {
    document.getElementById('cityRequestInput').value = city;
}

function submitCityRequest() {
    const input = document.getElementById('cityRequestInput');
    const message = document.getElementById('successMsg');
    
    if (input.value.trim() !== '') {
        // Log the city request (in production, send to backend)
        console.log('City request:', input.value.trim());
        
        // Show success message
        message.classList.add('show');
        input.value = '';
        
        // Hide message after 5 seconds
        setTimeout(() => {
            message.classList.remove('show');
        }, 5000);
    } else {
        alert('Please enter a city name');
    }
}

// ===== USER MODAL FUNCTIONALITY =====
const userModalData = {
    office: {
        icon: '👔',
        title: 'Office Workers',
        tagline: 'Never miss the taste of home during your workday',
        benefits: [
            'Get fresh, homemade meals delivered right to your office desk',
            'Save time - no more long lunch breaks or meal prep worries',
            'Enjoy nutritious, home-style food that gives you energy for the day',
            'Stay connected to your family through their cooking',
            'Affordable pricing - much cheaper than eating out daily',
            'Customizable meals based on your dietary preferences'
        ],
        steps: [
            'Download the HomeTaste Flavours app and create your account',
            'Add your office address and set your lunch preferences',
            'Your family uploads the day\'s menu in the morning',
            'Select your meal and preferred delivery time',
            'Get notified when your delivery partner is on the way',
            'Enjoy a delicious home-cooked meal at work!'
        ],
        stats: '⭐ Join 1000+ professionals already enjoying home meals at work'
    },
    family: {
        icon: '👨‍👩‍👧‍👦',
        title: 'Urban Families',
        tagline: 'Keep your loved ones connected through food',
        benefits: [
            'Send love and care to family members working away from home',
            'Earn extra income by sharing your home-cooked meals',
            'Ensure your loved ones eat healthy, home-made food',
            'Flexible schedule - cook when convenient for you',
            'Share your traditional recipes and cooking with others',
            'Build stronger family bonds through regular meal sharing'
        ],
        steps: [
            'Register as a home kitchen on HomeTaste Flavours',
            'Upload your daily menu with photos and descriptions',
            'Set your preferred delivery times and locations',
            'Receive orders from your family members at work',
            'Our delivery partner picks up the meal from your home',
            'Your loved one gets fresh, homemade food at their office!'
        ],
        stats: '💚 200+ families are already sending love through meals daily'
    },
    delivery: {
        icon: '🚴‍♂️',
        title: 'Delivery Partners',
        tagline: 'Earn on your own schedule while serving your community',
        benefits: [
            'Flexible working hours - work when it suits you',
            'Earn competitive income with transparent pricing',
            'No special skills required - just be reliable and friendly',
            'Support local families and office workers in your area',
            'Get paid instantly after each delivery',
            'Be part of a growing community of partners'
        ],
        steps: [
            'Sign up as a delivery partner through our app',
            'Complete a quick verification process',
            'Set your availability and preferred delivery areas',
            'Receive delivery requests when orders are placed',
            'Pick up meals from home kitchens in your area',
            'Deliver fresh food to offices and earn money!'
        ],
        stats: '🚀 50+ active delivery partners making ₹15,000-30,000/month'
    }
};

function openUserModal(userType) {
    const data = userModalData[userType];
    if (!data) return;
    
    const modal = document.getElementById('userModal');
    
    // Populate modal content
    document.getElementById('userModalIcon').textContent = data.icon;
    document.getElementById('userModalTitle').textContent = data.title;
    document.getElementById('userModalTagline').textContent = data.tagline;
    
    // Create benefits list
    const benefitsList = data.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    document.getElementById('userModalBenefits').innerHTML = benefitsList;
    
    // Create steps list
    const stepsList = data.steps.map(step => `<li>${step}</li>`).join('');
    document.getElementById('userModalSteps').innerHTML = stepsList;
    
    // Add stats
    document.getElementById('userModalStats').textContent = data.stats;
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeUserModal() {
    const modal = document.getElementById('userModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function scrollToSection(sectionId) {
    closeUserModal();
    setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'start' 
            });
        }
    }, 300);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUserModal();
    }
});

// ===== ENTER KEY SUPPORT FOR CITY REQUEST =====
document.addEventListener('DOMContentLoaded', function() {
    const cityInput = document.getElementById('cityRequestInput');
    
    if (cityInput) {
        cityInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                submitCityRequest();
            }
        });
    }
});

// ===== SMOOTH SCROLL FOR ALL ANCHOR LINKS =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const target = document.querySelector(targetId);
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===== NAVBAR BACKGROUND CHANGE ON SCROLL =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
});

// ===== FORM SUBMISSION HANDLER =====
const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.form-button');
        const originalText = submitBtn.textContent;
        
        // Show loading state
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        try {
            const formData = new FormData(this);
            const response = await fetch(this.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                alert('✅ Thank you! Your message has been sent successfully.');
                this.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('❌ Something went wrong. Please try again or email us directly.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// ===== SCROLL ANIMATIONS FOR CARDS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                entry.target.style.transition = 'all 0.6s ease-out';
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, 100);
            
            fadeInObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll(
        '.user-card, .step-card, .feature-card, .city-card, .benefit-card'
    );
    
    cards.forEach(card => {
        fadeInObserver.observe(card);
    });
});

// ===== STATS COUNTER ANIMATION =====
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    const suffix = element.textContent.replace(/[0-9]/g, '');
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + suffix;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + suffix;
        }
    }, 16);
}

// Trigger counter animation when stats are visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = entry.target.querySelectorAll('.stat-number');
            statNumbers.forEach(stat => {
                const target = parseInt(stat.textContent.replace(/\D/g, ''));
                animateCounter(stat, target);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        statsObserver.observe(heroStats);
    }
});

// ===== DOWNLOAD BUTTON ALERTS =====
document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const platform = btn.querySelector('.download-large').textContent;
        alert(`📱 ${platform} app coming soon! We're working hard to bring HomeTaste Flavours to your device.`);
    });
});

// ===== ACTIVE NAV LINK HIGHLIGHTING =====
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-links a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
});

// ===== CONSOLE WELCOME MESSAGE =====
console.log(
    '%c🏠 Welcome to HomeTaste Flavours!',
    'background: linear-gradient(135deg, #FF6B35, #4CAF50); color: white; font-size: 24px; padding: 15px; border-radius: 8px; font-weight: bold;'
);

console.log(
    '%cYour Home, Your Flavours, Delivered. 🍛',
    'color: #FF6B35; font-size: 16px; font-weight: bold; margin-top: 10px;'
);

console.log(
    '%cInterested in working with us? Email: c.satendra1149@gmail.com',
    'color: #4CAF50; font-size: 14px; margin-top: 5px;'
);

// ===== POPUP FUNCTIONALITY =====
function openPopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
}

function closePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup) {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }
}

// Close popup when clicking outside the content
document.addEventListener('DOMContentLoaded', () => {
    const popups = document.querySelectorAll('.popup-overlay');
    
    popups.forEach(popup => {
        popup.addEventListener('click', (e) => {
            if (e.target === popup) {
                closePopup(popup.id);
            }
        });
    });
});

// Close popup with ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activePopup = document.querySelector('.popup-overlay.active');
        if (activePopup) {
            closePopup(activePopup.id);
        }
    }
});
