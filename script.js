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
    '.user-card, .feature-card, .usp-card, .step'
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
        alert(`Download for ${platform} coming soon! We're working hard to bring HomeTaste Flavours to your device.`);
        
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
    document.body.style.overflow = 'hidden';
}

function closeUSPModal() {
    const modal = document.getElementById('uspModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function scrollToDownload() {
    closeUSPModal();
    closeCityModal();
    setTimeout(() => {
        document.getElementById('download').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }, 300);
}

// ===== CITY MODAL FUNCTIONALITY =====
const cityData = {
    'Kathmandu': {
        icon: '🏛️',
        tagline: 'The Heart of Nepal - Where Tradition Meets Taste',
        stats: [
            { number: '50+', label: 'Home Kitchens' },
            { number: '200+', label: 'Daily Orders' },
            { number: '15', label: 'Areas Covered' }
        ],
        features: [
            'Thamel - Tourist hub with diverse food needs',
            'Bouddha - Traditional Nepali and Newari cuisine',
            'Patan - Heritage area with family kitchens',
            'Jorpati - Residential zones with office workers',
            'Baluwatar - Premium home-cooked meals',
            'Bhaktapur - Authentic Newari specialties'
        ],
        coverage: '🗺️ Covering 15 major areas across Kathmandu Valley'
    },
    'Birgunj': {
        icon: '🏭',
        tagline: 'Gateway to India - Industrial City with Home Flavours',
        stats: [
            { number: '30+', label: 'Home Kitchens' },
            { number: '150+', label: 'Daily Orders' },
            { number: '8', label: 'Areas Covered' }
        ],
        features: [
            'Ghantaghar - Central business district',
            'Adarsh Nagar - Residential family zones',
            'Industrial Area - Factory workers special meals',
            'Railway Station Area - Quick lunch deliveries',
            'College Road - Student-friendly meals',
            'Murli Chowk - Mix of office and home areas'
        ],
        coverage: '🗺️ Serving 8 zones across Birgunj municipality'
    },
    'Pokhara': {
        icon: '🏔️',
        tagline: 'City of Lakes - Fresh Mountain Home Cooking',
        stats: [
            { number: '40+', label: 'Home Kitchens' },
            { number: '180+', label: 'Daily Orders' },
            { number: '12', label: 'Areas Covered' }
        ],
        features: [
            'Lakeside - Tourist and expat community',
            'New Road - Business and shopping center',
            'Prithvi Chowk - Office worker hub',
            'Srijana Chowk - Educational institutions',
            'Chipledhunga - Residential family areas',
            'Bagar - Local authentic Nepali cuisine'
        ],
        coverage: '🗺️ Delivering across 12 beautiful areas of Pokhara'
    }
};

// Add click handlers to all city items
document.querySelectorAll('.city-item').forEach(item => {
    item.addEventListener('click', () => {
        const cityName = item.getAttribute('data-city');
        showCityModal(cityName);
    });
});

function showCityModal(cityName) {
    const data = cityData[cityName];
    if (!data) return;
    
    const modal = document.getElementById('cityModal');
    
    // Populate modal content
    document.getElementById('cityModalIcon').textContent = data.icon;
    document.getElementById('cityModalTitle').textContent = cityName;
    document.getElementById('cityTagline').textContent = data.tagline;
    document.getElementById('cityNameBtn').textContent = cityName;
    
    // Create stats cards
    const statsHTML = data.stats.map(stat => `
        <div class="city-stat-card">
            <span class="city-stat-number">${stat.number}</span>
            <span class="city-stat-label">${stat.label}</span>
        </div>
    `).join('');
    document.getElementById('cityStatsGrid').innerHTML = statsHTML;
    
    // Create features list
    const featuresHTML = `
        <h3>Areas We Cover:</h3>
        <ul>
            ${data.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    document.getElementById('cityFeatures').innerHTML = featuresHTML;
    
    // Add coverage info
    document.getElementById('cityCoverage').textContent = data.coverage;
    
    // Show modal with animation
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeCityModal() {
    const modal = document.getElementById('cityModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUSPModal();
        closeCityModal();
    }
});

// ===== QUICK LINKS MODAL FUNCTIONALITY =====
const quickLinkData = {
    'home': {
        icon: '🏠',
        title: 'Home',
        tagline: 'Your Gateway to Homemade Flavours',
        details: [
            'Discover HomeTaste Flavours - connecting families with professionals',
            'See our impressive statistics: 1000+ happy users, 3 cities covered',
            'Learn about our mission to bring home-cooked meals to offices',
            'Explore how we\'re revolutionizing food delivery in Nepal',
            'Get started with our simple download process'
        ]
    },
    'about': {
        icon: 'ℹ️',
        title: 'About Us',
        tagline: 'Revolutionizing Food Delivery in Nepal',
        details: [
            'Learn about our story and mission',
            'Discover how we connect home kitchens with workplaces',
            'Understand our commitment to fresh, homemade meals',
            'See who we serve: office workers, families, and delivery partners',
            'Find out why we\'re different from traditional food delivery'
        ]
    },
    'how-it-works': {
        icon: '⚙️',
        title: 'How It Works',
        tagline: 'Simple Steps to Home-Cooked Meals',
        details: [
            'Step-by-step guide to getting started',
            'Learn how to register and set up your account',
            'Understand the ordering and delivery process',
            'See how we connect home kitchens, customers, and delivery partners',
            'Discover our 6-step seamless delivery system'
        ]
    },
    'features': {
        icon: '✨',
        title: 'Features',
        tagline: 'Everything You Need for Meal Delivery',
        details: [
            'Secure login and user registration',
            'Easy meal addition from home kitchens',
            'Schedule and manage delivery orders',
            'Real-time GPS tracking of your delivery',
            'Dedicated partner dashboard',
            'Push notifications to keep you updated'
        ]
    },
    'contact': {
        icon: '📞',
        title: 'Contact Us',
        tagline: 'We\'d Love to Hear From You',
        details: [
            'Get in touch with our team',
            'Send us your questions, feedback, or suggestions',
            'Find our email, phone, and location details',
            'Fill out our contact form for quick response',
            'We typically respond within 24 hours'
        ]
    }
};

// Add click handlers to quick links
document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const linkType = link.getAttribute('data-link');
        showQuickLinkModal(linkType);
    });
});

let currentSection = '';

function showQuickLinkModal(linkType) {
    const data = quickLinkData[linkType];
    if (!data) return;
    
    currentSection = `#${linkType}`;
    const modal = document.getElementById('quickLinkModal');
    
    document.getElementById('quickLinkIcon').textContent = data.icon;
    document.getElementById('quickLinkTitle').textContent = data.title;
    document.getElementById('quickLinkTagline').textContent = data.tagline;
    document.getElementById('sectionName').textContent = data.title;
    
    const detailsList = data.details.map(detail => `<li>${detail}</li>`).join('');
    document.getElementById('quickLinkDetails').innerHTML = `<ul>${detailsList}</ul>`;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeQuickLinkModal() {
    const modal = document.getElementById('quickLinkModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function navigateToSection() {
    closeQuickLinkModal();
    setTimeout(() => {
        document.querySelector(currentSection).scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }, 300);
}


// ===== SOCIAL MEDIA MODAL FUNCTIONALITY =====
const socialData = {
    'facebook': {
        icon: '📘',
        title: 'Facebook',
        tagline: 'Connect With Us on Facebook',
        handle: '@HomeTasteFlavours',
        url: 'https://facebook.com/HomeTasteFlavours',
        details: [
            'Follow us for daily meal inspiration and home cooking tips',
            'See photos of delicious homemade meals from our community',
            'Get exclusive updates about new cities and features',
            'Join our community of food lovers and home chefs',
            'Participate in contests and giveaways',
            'Share your own HomeTaste experiences'
        ]
    },
    'instagram': {
        icon: '📷',
        title: 'Instagram',
        tagline: 'Follow Our Food Journey',
        handle: '@hometaste_flavours',
        url: 'https://instagram.com/hometaste_flavours',
        details: [
            'Beautiful food photography from home kitchens',
            'Behind-the-scenes looks at our delivery process',
            'Stories featuring our home chefs and their recipes',
            'Daily meal ideas and cooking inspiration',
            'User-generated content from happy customers',
            'Live sessions with featured home chefs'
        ]
    },
    'twitter': {
        icon: '🐦',
        title: 'Twitter',
        tagline: 'Stay Updated in Real-Time',
        handle: '@HomeTasteNP',
        url: 'https://twitter.com/HomeTasteNP',
        details: [
            'Real-time updates about our service',
            'Quick customer support and responses',
            'News about expansion to new cities',
            'Food trends and home cooking discussions',
            'Engage with our team and community',
            'Flash deals and limited-time offers'
        ]
    },
    'linkedin': {
        icon: '💼',
        title: 'LinkedIn',
        tagline: 'Professional Network & Careers',
        handle: 'HomeTaste Flavours Nepal',
        url: 'https://linkedin.com/company/hometaste-flavours',
        details: [
            'Learn about career opportunities at HomeTaste',
            'Connect with our professional team',
            'Read about our company mission and values',
            'Discover partnership opportunities',
            'See our impact on Nepal\'s food delivery industry',
            'Join us in revolutionizing home food delivery'
        ]
    }
};

let currentSocialURL = '';

// Add click handlers to social links
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const socialType = link.getAttribute('data-social');
        showSocialModal(socialType);
    });
});

function showSocialModal(socialType) {
    const data = socialData[socialType];
    if (!data) return;
    
    currentSocialURL = data.url;
    const modal = document.getElementById('socialModal');
    
    document.getElementById('socialIcon').textContent = data.icon;
    document.getElementById('socialTitle').textContent = data.title;
    document.getElementById('socialTagline').textContent = data.tagline;
    document.getElementById('platformName').textContent = data.title;
    document.getElementById('socialHandleDisplay').textContent = data.handle;
    
    const detailsList = data.details.map(detail => `<li>${detail}</li>`).join('');
    document.getElementById('socialDetails').innerHTML = `<ul>${detailsList}</ul>`;
    
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeSocialModal() {
    const modal = document.getElementById('socialModal');
    modal.classList.remove('show');
    document.body.style.overflow = '';
}

function visitSocialMedia() {
    window.open(currentSocialURL, '_blank');
    closeSocialModal();
}

// Update escape key handler to close all modals
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeUSPModal();
        closeCityModal();
        closeQuickLinkModal();
        closeSocialModal();
    }
});


// ===== CONSOLE WELCOME MESSAGE =====
console.log(
    '%c🏠 Welcome to HomeTaste Flavours! ',
    'background: linear-gradient(135deg, #FF6B35, #4CAF50); color: white; font-size: 20px; padding: 10px; border-radius: 5px;'
);
console.log(
    '%cYour Home, Your Flavours, Delivered.',
    'color: #FF6B35; font-size: 16px; font-weight: bold;'
);
