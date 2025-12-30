document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });

    // Slider Logic
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    
    if (sliderWrapper && slides.length > 0) {
        let currentSlide = 0;
        const totalSlides = slides.length;

        function updateSlider() {
            sliderWrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
            slides.forEach((slide, index) => {
                if (index === currentSlide) {
                    slide.classList.add('active');
                } else {
                    slide.classList.remove('active');
                }
            });
        }

        // Initialize first slide as active
        slides[0].classList.add('active');

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % totalSlides;
                updateSlider();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                updateSlider();
            });
        }

        // Auto play slider
        setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    }

    // Scroll Animations
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-section');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.hidden-section').forEach((el) => {
        observer.observe(el);
    });

    // Contact Form & Local Storage
    const contactForm = document.getElementById('contactForm');
    const successMsg = document.querySelector('.success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            const formData = {
                name,
                email,
                message,
                date: new Date().toISOString()
            };

            // Get existing data or init empty array
            let savedData = JSON.parse(localStorage.getItem('portfolioMessages')) || [];
            savedData.push(formData);

            // Save back to local storage
            localStorage.setItem('portfolioMessages', JSON.stringify(savedData));

            // Show success and reset
            if (successMsg) {
                successMsg.style.display = 'block';
                setTimeout(() => {
                    successMsg.style.display = 'none';
                }, 3000);
            }
            
            contactForm.reset();
            console.log('Message saved to Local Storage:', formData);
        });
    }
});
