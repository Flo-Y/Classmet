// ===== HERO CAROUSEL =====
const slides = document.querySelectorAll('.hero-slide');
const indicators = document.querySelectorAll('.indicator');
const heroBanner = document.querySelector('.hero-banner');

// Only run carousel code if carousel elements exist
if (slides.length > 0 && indicators.length > 0 && heroBanner) {
    let currentSlide = 0;
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
    const nextSlideBtn = document.getElementById('nextSlide');
    const prevSlideBtn = document.getElementById('prevSlide');

    if (nextSlideBtn) {
        nextSlideBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play
        });
    }

    if (prevSlideBtn) {
        prevSlideBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play
        });
    }

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
    heroBanner.addEventListener('mouseenter', stopAutoPlay);
    heroBanner.addEventListener('mouseleave', startAutoPlay);
}

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
const heroContent = document.querySelector('.hero-content');

if (heroContent) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.3}px)`;
        heroContent.style.opacity = 1 - (scrolled / 600);
    });
}

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

// ===== HISTORY TIMELINE ANIMATION =====
const maskPath = document.querySelector('.arrow-mask-path');

if (maskPath) {
    // Get total length of the path
    const pathLength = maskPath.getTotalLength();

    // Set Up dash array and offset to hide the path initially
    maskPath.style.strokeDasharray = pathLength;
    maskPath.style.strokeDashoffset = pathLength;

    // Function to update path drawing on scroll
    function animateArrowOnScroll() {
        const timelineSection = document.querySelector('.history-timeline');
        const sectionTop = timelineSection.offsetTop;
        const sectionHeight = timelineSection.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollY = window.pageYOffset;

        // Calculate start and end points for animation
        // Start animating when section enters view
        const start = sectionTop - windowHeight + 100;

        // Finish animating much earlier (at 60% of section height)
        // This makes the arrow complete faster
        const end = sectionTop + (sectionHeight * 0.6) - 100;

        // Calculate scroll percentage
        let percentage = (scrollY - start) / (end - start);

        // Clamp percentage between 0 and 1
        percentage = Math.max(0, Math.min(1, percentage));

        // Calculate new offset
        // offset goes from pathLength (hidden) to 0 (fully drawn)
        const drawLength = pathLength * (1 - percentage);
        maskPath.style.strokeDashoffset = drawLength;
    }

    // Add scroll listener
    window.addEventListener('scroll', animateArrowOnScroll);

    // Initial call to set state
    animateArrowOnScroll();
}

// ===== DENAH LIGHTBOX =====
const modal = document.getElementById('mapModal');
const imgResult = document.getElementById('fullMapImage');
const denahContainers = document.querySelectorAll('.denah-image-container'); // Use class to be safe
const span = document.getElementsByClassName("close-modal")[0];

if (modal && denahContainers.length > 0) {
    // Open Modal
    denahContainers.forEach(container => {
        container.addEventListener('click', function () {
            modal.style.display = "block";
            const img = this.querySelector('img');
            imgResult.src = img.src;
        });
    });

    // Close Modal
    if (span) {
        span.onclick = function () {
            modal.style.display = "none";
        }
    }

    // Close on click outside
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Close on ESC key
    document.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            modal.style.display = "none";
        }
    });
}

console.log('SMKN 2 Mojokerto - Website loaded successfully!');
