// ===== NAVBAR FUNCTIONALITY =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');
const navDropdowns = document.querySelectorAll('.nav-dropdown');
const navbar = document.querySelector('.navbar');

// Hamburger menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Mobile dropdown functionality
navDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('.nav-link');
    link.addEventListener('click', (e) => {
        if (window.innerWidth <= 968) {
            e.preventDefault();
            dropdown.classList.toggle('active');
        }
    });
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ===== BACK TO TOP BUTTON =====
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== SMOOTH SCROLLING =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 100;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== RESPONSIVE HANDLER =====
window.addEventListener('resize', () => {
    if (window.innerWidth > 968) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});
