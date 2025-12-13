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
const nextSlideBtn = document.getElementById('nextSlide');
if (nextSlideBtn) {
    nextSlideBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play
    });
}

const prevSlideBtn = document.getElementById('prevSlide');
if (prevSlideBtn) {
    prevSlideBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoPlay();
        startAutoPlay(); // Restart auto-play
    });
}

// Indicator click events
if (indicators.length > 0) {
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play
        });
    });
}

// Start auto-play on page load if slides exist
if (slides.length > 0) {
    startAutoPlay();
}

// Pause auto-play on hover
const heroBanner = document.querySelector('.hero-banner');
if (heroBanner) {
    heroBanner.addEventListener('mouseenter', stopAutoPlay);
    heroBanner.addEventListener('mouseleave', startAutoPlay);
}

// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Dropdown menu functionality for mobile
const navDropdowns = document.querySelectorAll('.nav-dropdown');

navDropdowns.forEach(dropdown => {
    const dropdownLink = dropdown.querySelector('.nav-link');

    if (dropdownLink) {
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
    }
});

// Close mobile menu when clicking a dropdown item
const dropdownLinks = document.querySelectorAll('.dropdown-content a');
dropdownLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
        navDropdowns.forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    });
});

// Close mobile menu when clicking a regular nav link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// Sticky Shrinking Navbar
const navbar = document.querySelector('.navbar');

if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;

        // Add 'scrolled' class when scrolled more than 50px
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

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

                // Highlight "Informasi" when viewing akreditasi, lokasi, or berita sections
                const informasiSections = ['akreditasi', 'lokasi', 'berita'];
                if (informasiSections.includes(sectionId)) {
                    if (link.getAttribute('href') === '#informasi') {
                        link.classList.add('active');
                    }
                } else if (link.getAttribute('href') === `#${sectionId}`) {
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
const animatedElements = document.querySelectorAll('.kompetensi-card, .visi-card, .misi-card');
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

if (backToTopButton) {
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
}



console.log('SMKN 2 Mojokerto - Website loaded successfully!');

 
 / /   = = = = =   F L O A T I N G   C O N T A C T   B U T T O N   = = = = =  
 d o c u m e n t . a d d E v e n t L i s t e n e r ( ' D O M C o n t e n t L o a d e d ' ,   ( )   = >   {  
         / /   C h e c k   i f   b u t t o n   a l r e a d y   e x i s t s  
         i f   ( ! d o c u m e n t . q u e r y S e l e c t o r ( ' . f l o a t i n g - c o n t a c t - b t n ' ) )   {  
                 c o n s t   c o n t a c t B t n   =   d o c u m e n t . c r e a t e E l e m e n t ( ' a ' ) ;  
                 c o n t a c t B t n . h r e f   =   ' t e l : 0 3 2 1 3 8 7 3 5 6 ' ;  
                 c o n t a c t B t n . c l a s s N a m e   =   ' f l o a t i n g - c o n t a c t - b t n ' ;  
                 c o n t a c t B t n . s e t A t t r i b u t e ( ' a r i a - l a b e l ' ,   ' H u b u n g i   K a m i ' ) ;  
                  
                 c o n t a c t B t n . i n n e r H T M L   =   `  
                         < s v g   v i e w B o x = " 0   0   2 4   2 4 " >  
                                 < p a t h   d = " M 2 0 . 0 1   1 5 . 3 8 c - 1 . 2 3   0 - 2 . 4 2 - . 2 - 3 . 5 3 - . 5 6 a . 9 7 7 . 9 7 7   0   0   0 - 1 . 0 1 . 2 4 l - 1 . 5 7   1 . 9 7 c - 2 . 8 3 - 1 . 4 9 - 5 . 4 1 - 4 . 0 8 - 6 . 9 - 6 . 9 l 1 . 9 7 - 1 . 5 6 c . 2 6 - . 2 6 . 3 5 - . 6 4 . 2 4 - 1 . 0 1 - . 3 7 - 1 . 1 1 - . 5 6 - 2 . 3 - . 5 6 - 3 . 5 3   0 - . 5 4 - . 4 5 - . 9 9 - . 9 9 - . 9 9 H 4 . 1 9 C 3 . 6 5   3   3   3 . 2 4   3   3 . 9 9   3   1 3 . 2 8   1 0 . 7 3   2 1   2 0 . 0 1   2 1 c . 7 1   0   . 9 9 - . 6 3 . 9 9 - 1 . 1 8 v - 3 . 4 5 c 0 - . 5 4 - . 4 5 - . 9 9 - . 9 9 - . 9 9 z " / >  
                         < / s v g >  
                 ` ;  
                  
                 d o c u m e n t . b o d y . a p p e n d C h i l d ( c o n t a c t B t n ) ;  
         }  
 } ) ;  
 