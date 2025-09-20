// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Navigation mobile
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.right = '0';
            navMenu.style.background = 'var(--bg-white)';
            navMenu.style.padding = 'var(--spacing-md)';
            navMenu.style.boxShadow = 'var(--shadow-md)';
        });
    }

    // Smooth scroll pour les liens de navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animation au scroll
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

    // Observer les éléments à animer
    document.querySelectorAll('.feature-card, .testimonial-card, .faq-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s ease';
        observer.observe(el);
    });

    // Compteur pour le nombre d'exemplaires vendus (effet visuel)
    const updateCounter = () => {
        const counter = document.getElementById('sales-counter');
        if (counter) {
            let count = 1247;
            const target = 1500;
            const duration = 3000;
            const increment = target / (duration / 16);
            
            const update = () => {
                count += increment;
                if (count < target) {
                    counter.textContent = Math.floor(count) + '+';
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target + '+';
                }
            };
            update();
        }
    };

    // Lancer le compteur quand la section est visible
    const salesObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                updateCounter();
                salesObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const salesSection = document.querySelector('.cta-final');
    if (salesSection) {
        salesObserver.observe(salesSection);
    }

    // Effet de vibration pour les boutons CTA
    const vibrateButtons = document.querySelectorAll('.vibrate');
    vibrateButtons.forEach(button => {
        button.addEventListener('mouseover', () => {
            button.style.animation = 'vibrate 0.3s linear infinite both';
        });
        
        button.addEventListener('mouseout', () => {
            button.style.animation = 'none';
        });
        
        button.addEventListener('click', (e) => {
            e.preventDefault();
            // Simulation de redirection vers la page de paiement
            alert('Redirection vers la page de paiement sécurisée...');
            // window.location.href = 'https://votre-lien-de-paiement.com';
        });
    });

    // Gestionnaire pour le formulaire de contact
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Merci pour votre message ! Nous vous répondrons rapidement.');
            contactForm.reset();
        });
    }

    // Horloge pour l'offre limitée
    const updateCountdown = () => {
        const countdown = document.getElementById('countdown');
        if (countdown) {
            const now = new Date();
            const endOfDay = new Date();
            endOfDay.setHours(23, 59, 59, 999);
            
            const diff = endOfDay - now;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            countdown.textContent = `${hours}h ${minutes}m ${seconds}s`;
        }
    };

    // Mettre à jour le compte à rebours toutes les secondes
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Chargement lazy des images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => {
            img.src = img.src;
        });
    }

    console.log('Site "Les Secrets de l\'Informatique" chargé avec succès !');
});

// Gestion du scroll pour la navigation
let lastScrollY = window.scrollY;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > lastScrollY && window.scrollY > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    lastScrollY = window.scrollY;
    
    // Ajouter une ombre à la navbar quand on scroll
    if (window.scrollY > 50) {
        navbar.style.boxShadow = 'var(--shadow-md)';
    } else {
        navbar.style.boxShadow = 'var(--shadow-sm)';
    }
});