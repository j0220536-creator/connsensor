/* ========================================
   CONNSENSOR Website JavaScript
   Interactive Functionality
   ======================================== */

// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-links li a');

    if (burger) {
        burger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            
            // Animate burger lines
            this.classList.toggle('toggle');
        });
    }

    // Close mobile menu when clicking on a link
    navLinksItems.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.classList.remove('active');
            }
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Form validation and enhancement
    const quoteForm = document.getElementById('quoteForm');
    if (quoteForm) {
        quoteForm.addEventListener('submit', function(e) {
            const name = document.getElementById('name').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const email = document.getElementById('email').value.trim();

            if (!name || !phone || !email) {
                e.preventDefault();
                alert('Please fill in all required fields (Name, Phone, Email).');
                return false;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }

            // Phone validation (basic)
            const phoneRegex = /^[\d\s\+\-\(\)]{10,}$/;
            if (!phoneRegex.test(phone)) {
                e.preventDefault();
                alert('Please enter a valid phone number.');
                return false;
            }

            // Show success message before form submission
            setTimeout(() => {
                alert('Thank you for your inquiry! Your email client will open to send the request to j0220536@gmail.com');
            }, 100);
        });
    }

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            const email = this.querySelector('input[type="email"]').value.trim();
            
            if (!email) {
                e.preventDefault();
                alert('Please enter your email address.');
                return false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                e.preventDefault();
                alert('Please enter a valid email address.');
                return false;
            }

            setTimeout(() => {
                alert('Thank you for subscribing to our newsletter!');
            }, 100);
        });
    }

    // Video placeholder click handler
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            alert('Video playback would be implemented here. In production, this would embed a YouTube/Vimeo video or play a hosted product video file.');
        });
    });

    // Add scroll animation to navbar
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }

        lastScroll = currentScroll;
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe cards and sections for animation
    const animateElements = document.querySelectorAll('.advantage-card, .category-card, .product-card, .blog-card, .cert-item, .faq-item');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Active navigation highlighting based on current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinksArray = document.querySelectorAll('.nav-links a');
    
    navLinksArray.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Product category smooth scroll from homepage
    const productLinks = document.querySelectorAll('a[href^="products.html#"]');
    productLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetHash = this.getAttribute('href').split('#')[1];
            if (targetHash) {
                // Store the target for the products page
                sessionStorage.setItem('scrollToCategory', targetHash);
            }
        });
    });

    // Scroll to category on products page if hash is present
    if (currentPage === 'products.html') {
        const hash = window.location.hash.substring(1);
        const storedCategory = sessionStorage.getItem('scrollToCategory');
        
        const scrollToTarget = hash || storedCategory;
        
        if (scrollToTarget) {
            const targetElement = document.getElementById(scrollToTarget);
            if (targetElement) {
                setTimeout(() => {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Highlight the target section
                    targetElement.style.scrollMarginTop = '80px';
                    
                    // Clear stored category
                    sessionStorage.removeItem('scrollToCategory');
                }, 500);
            }
        }
    }

    // Dynamic year in footer
    const yearElements = document.querySelectorAll('.footer-bottom p');
    yearElements.forEach(el => {
        const currentYear = new Date().getFullYear();
        el.innerHTML = el.innerHTML.replace('2026', currentYear);
    });

    // Console welcome message
    console.log('%c Welcome to CONNSENSOR! ', 'background: #0066CC; color: white; font-size: 16px; padding: 10px;');
    console.log('Looking for custom sensor solutions? Contact us at j0220536@gmail.com or +86 159 1342 3526');
});

// Utility function for email validation
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for phone validation
function validatePhone(phone) {
    const re = /^[\d\s\+\-\(\)]{10,}$/;
    return re.test(phone);
}

// Export functions for potential external use
window.CONNSENSOR = {
    validateEmail,
    validatePhone
};
