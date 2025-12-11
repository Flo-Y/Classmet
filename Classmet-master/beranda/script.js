// ===== HERO CAROUSEL =====
let currentSlide = 0;
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const totalSlides = slides.length;
let autoPlayInterval;

// Function to show specific slide
function showSlide(index) {
    // Remove active class from all slides and indicators
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));

    // Add active class to current slide and indicator
    slides[index].classList.add('active');
    indicators[index].classList.add('active');

    currentSlide = index;
}

// Function to go to next slide
function nextSlide() {
    let next = (currentSlide + 1) % totalSlides; // Loop back to 0 after last slide
    showSlide(next);
}

// Function to go to previous slide
function prevSlide() {
    let prev = (currentSlide - 1 + totalSlides) % totalSlides; // Loop back to last slide
    showSlide(prev);
}

// Auto-play carousel
function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 3000); // Change slide every 2 seconds
}

function stopAutoPlay() {
    clearInterval(autoPlayInterval);
}

// Arrow button click events
document.getElementById('nextSlide').addEventListener('click', () => {
    nextSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart auto-play
});

document.getElementById('prevSlide').addEventListener('click', () => {
    prevSlide();
    stopAutoPlay();
    startAutoPlay(); // Restart auto-play
});

// Indicator click events
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play
    });
});

// Start auto-play on page load
startAutoPlay();

// Pause auto-play on hover
const heroBanner = document.querySelector('.hero-banner');
heroBanner.addEventListener('mouseenter', stopAutoPlay);
heroBanner.addEventListener('mouseleave', startAutoPlay);

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Dropdown menu functionality for mobile
const navDropdowns = document.querySelectorAll('.nav-dropdown');

navDropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');

    dropdownLink.addEventListener('click', (e) => {
        // On mobile, toggle dropdown instead of navigating
        if (window.innerWidth <= 968) {
            e.preventDefault();
            dropdown.classList.toggle('active');

            // Close other dropdowns
            navDropdowns.forEach(otherDropdown => {
                if (otherDropdown !== dropdown) {
                    otherDropdown.classList.remove('active');
                }
            });
        }
    });
});

// Close mobile menu when clicking a dropdown item
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        navDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});

// Close mobile menu when clicking a regular nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Sticky Shrinking Navbar
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;

    // Add 'scrolled' class when scrolled more than 50px
    if (scrollPosition > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Intersection Observer for fade-in animations
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

// Observe all cards for animation
const animatedElements = document.querySelectorAll('.kompetensi-card, .berita-card, .visi-card, .misi-card');
animatedElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');

    if (heroContent) {
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Back to Top Button
const backToTopButton = document.getElementById('backToTop');

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Scroll to top when clicked
backToTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===== BERITA CAROUSEL AUTO-LOOP =====
const initBeritaCarousel = () => {
    const beritaTrack = document.querySelector('.berita-carousel-track');

    // Clear existing clones if any (to prevent duplication on re-init)
    // We only want to keep the original cards.
    // However, since we don't have a reliable way to distinguish originals from clones without marking them,
    // and this function runs once on load, we assume logic below is fine.
    // If we re-run this function on resize, we might multiply clones unless we check.
    // Simplification: Run once on load.

    if (beritaTrack && !beritaTrack.dataset.initialized) {
        beritaTrack.dataset.initialized = "true";
        const beritaCards = Array.from(beritaTrack.children);

        // Clone all cards multiple times to ensure seamless loop on wide screens
        // Cloning 6 times to be safe for very wide screens vs small cards
        for (let i = 0; i < 6; i++) {
            beritaCards.forEach(card => {
                const clone = card.cloneNode(true);
                beritaTrack.appendChild(clone);
            });
        }

        // Carousel auto-scroll variables
        let currentScroll = 0;
        let targetScroll = 0;
        const scrollSpeed = 0.5; // pixel per frame for auto-scroll
        let isPaused = false;

        let cardWidth = beritaCards[0].offsetWidth;
        let gap = 35; // must match CSS gap
        let oneSetWidth = (cardWidth + gap) * beritaCards.length;

        // Recalculate on resize
        window.addEventListener('resize', () => {
            cardWidth = beritaCards[0].offsetWidth;
            oneSetWidth = (cardWidth + gap) * beritaCards.length;
        });

        // Animation Loop
        function animate() {
            // Auto-increment target if not paused
            if (!isPaused) {
                targetScroll += scrollSpeed;
            }

            // Smoothly interpolate current towards target (Lerp)
            // Factor 0.1 determines smoothness/speed of ease-out
            currentScroll += (targetScroll - currentScroll) * 0.1;

            // Handle Infinite Wrapping logic
            // If we have scrolled past one full set, we reset both current and target
            // to maintain the illusion of seamlessness without visual jumps
            if (currentScroll >= oneSetWidth) {
                currentScroll -= oneSetWidth;
                targetScroll -= oneSetWidth;
            } else if (currentScroll < 0) {
                // For reverse scrolling (prev button)
                currentScroll += oneSetWidth;
                targetScroll += oneSetWidth;
            }

            beritaTrack.style.transform = `translateX(-${currentScroll}px)`;
            requestAnimationFrame(animate);
        }

        // Pause on hover
        beritaTrack.addEventListener('mouseenter', () => {
            isPaused = true;
        });

        beritaTrack.addEventListener('mouseleave', () => {
            isPaused = false;
        });

        // Arrow button handlers with Smooth Target Update
        const beritaPrevBtn = document.getElementById('beritaPrev');
        const beritaNextBtn = document.getElementById('beritaNext');

        if (beritaPrevBtn) {
            beritaPrevBtn.addEventListener('click', () => {
                // Move target back by one card
                targetScroll -= (cardWidth + gap);
            });
        }

        if (beritaNextBtn) {
            beritaNextBtn.addEventListener('click', () => {
                // Move target forward by one card
                targetScroll += (cardWidth + gap);
            });
        }

        // Start animation loop
        animate();
    }
};

// Run initialization when window is fully loaded to ensure styles/dimensions are ready
window.addEventListener('load', initBeritaCarousel);

console.log('SMKN 2 Mojokerto - Website loaded successfully!');

