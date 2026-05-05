// Portfolio JavaScript - Enhanced with Animations

document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate Skill Progress Bars on Scroll
    const skillSection = document.querySelector('#skills');
    const progressFills = document.querySelectorAll('.fill');
    let skillsAnimated = false;

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !skillsAnimated) {
                skillsAnimated = true;
                progressFills.forEach((fill, index) => {
                    setTimeout(() => {
                        fill.style.width = fill.getAttribute('data-width');
                    }, index * 150);
                });
            }
        });
    }, { threshold: 0.3 });

    if (skillSection) {
        skillsObserver.observe(skillSection);
    }

    // Animate elements on scroll with fade-in effect
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-box, .project-card, .cert-card, .achievement-item, .gallery-item, .contact-card, .social-card');
        
        elements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 100;
            
            if (elementTop < window.innerHeight - elementVisible) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initialize fade-in styles
    const initFadeIn = () => {
        const elements = document.querySelectorAll('.skill-box, .project-card, .cert-card, .achievement-item, .gallery-item, .contact-card, .social-card');
        elements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        });
    };

    initFadeIn();
    window.addEventListener('scroll', animateOnScroll);
    // Trigger once on load
    setTimeout(animateOnScroll, 100);

    // Image Placeholder Click Handler
    document.querySelectorAll('.img-placeholder, .gallery-img-placeholder').forEach(placeholder => {
        placeholder.addEventListener('click', () => {
            const span = placeholder.querySelector('span');
            if (span) {
                span.textContent = 'Add your image here!';
                setTimeout(() => {
                    span.textContent = placeholder.classList.contains('gallery-img-placeholder') 
                        ? placeholder.querySelector('span').textContent.replace('Add your image here!', 'Gallery Image') 
                        : 'Add Screenshot';
                }, 2000);
            }
        });
    });

    // Profile Photo Ripple Effect on Click
    const profilePhoto = document.querySelector('.profile-photo');
    if (profilePhoto) {
        profilePhoto.addEventListener('click', (e) => {
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255,255,255,0.4);
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;
            
            const rect = profilePhoto.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            
            profilePhoto.style.position = 'relative';
            profilePhoto.style.overflow = 'hidden';
            profilePhoto.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // Add ripple keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(2);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Navbar background on scroll
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            nav.style.background = 'linear-gradient(90deg, rgba(38,198,218,0.95) 0%, rgba(77,182,172,0.95) 100%)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.style.background = 'linear-gradient(90deg, #26c6da 0%, #4db6ac 100%)';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Simple alert for buttons that don't have links yet
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Coming soon! Add your link here.');
            }
        });
    });

    console.log('Portfolio loaded! Welcome to my website.');
});