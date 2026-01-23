// Responsive hamburger menu functionality
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.getElementById('hamburger');
    const headerLinks = document.querySelectorAll('.header-link');
    const headerButton = document.querySelector('.header-button');
    const header = document.querySelector('.header');
    
    // Fade in main text overlay on page load
    const mainTextOverlay = document.querySelector('.MainTextOverlay');
    
    if (mainTextOverlay) {
        // Add slight delay for smooth animation on page load
        setTimeout(function() {
            mainTextOverlay.classList.add('visible');
        }, 300);
    }
    
    // Toggle hamburger menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            headerLinks.forEach(link => {
                link.classList.toggle('active');
            });
            if (headerButton) {
                headerButton.classList.toggle('active');
            }
        });
    }
    
    // Close menu when a link is clicked
    headerLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            headerLinks.forEach(l => {
                l.classList.remove('active');
            });
            if (headerButton) {
                headerButton.classList.remove('active');
            }
        });
    });
    
    // Close menu when book now button is clicked
    if (headerButton) {
        headerButton.addEventListener('click', function() {
            if (hamburger) {
                hamburger.classList.remove('active');
            }
            headerLinks.forEach(link => {
                link.classList.remove('active');
            });
            headerButton.classList.remove('active');
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768) {
                if (hamburger) {
                    hamburger.classList.remove('active');
                }
                headerLinks.forEach(link => {
                    link.classList.remove('active');
                });
                if (headerButton) {
                    headerButton.classList.remove('active');
                }
            }
        }, 250);
    });
    
    // Smooth scrolling for anchor links
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

    // Scroll animation for fade-in elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const cards = element.querySelectorAll('.fade-in-on-scroll');
                
                cards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100); // Stagger animation by 100ms for each card
                });
                
                // Stop observing after animation is triggered
                observer.unobserve(element);
            }
        });
    }, observerOptions);

    // Observe all sections with fade-in cards
    const scienceSection = document.querySelector('.scienceIceBaths');
    if (scienceSection) {
        observer.observe(scienceSection);
    }
    
    // Scroll animation for comparison cards (Heat vs Cold Therapy)
    const comparisonObserverOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    };

    const comparisonObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const heatTherapy = entry.target.querySelector('.heatTherapy');
                const coldTherapy1 = entry.target.querySelector('.coldTherapy1');
                
                if (heatTherapy) {
                    heatTherapy.classList.add('slide-in');
                }
                if (coldTherapy1) {
                    setTimeout(() => {
                        coldTherapy1.classList.add('slide-in');
                    }, 100);
                }
                
                // Stop observing after animation is triggered
                comparisonObserver.unobserve(entry.target);
            }
        });
    }, comparisonObserverOptions);

    // Observe comparison container
    const comparisonContainer = document.querySelector('.comparisonContainer');
    if (comparisonContainer) {
        comparisonObserver.observe(comparisonContainer);
    }

    // Observe Cold Therapy section for animation
    const coldTherapySection = document.querySelector('.coldTherapy');
    if (coldTherapySection) {
        const coldTherapyObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    coldTherapyObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        coldTherapyObserver.observe(coldTherapySection);
    }

    // Accordion functionality for myths and facts
    const mythButtons = document.querySelectorAll('.mythButton');
    
    mythButtons.forEach(button => {
        button.addEventListener('click', function() {
            const mythItem = this.closest('.mythItem');
            const dropdownIcon = this.querySelector('.dropdownIcon');
            
            // Close all other myth items
            document.querySelectorAll('.mythItem').forEach(item => {
                if (item !== mythItem) {
                    item.classList.remove('active');
                    const otherIcon = item.querySelector('.dropdownIcon');
                    if (otherIcon) {
                        otherIcon.textContent = '+';
                    }
                }
            });
            
            // Toggle current myth item
            mythItem.classList.toggle('active');
            
            // Change icon based on active state
            if (mythItem.classList.contains('active')) {
                dropdownIcon.textContent = '-';
            } else {
                dropdownIcon.textContent = '+';
            }
        });
    });

    // Founder Page Scroll Animations
    const founderContent = document.querySelector('.founderDetail');
    if (founderContent) {
        const founderObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    founderObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        const animatedElements = document.querySelectorAll('h1, .sub, .img, .founderDetail, .vision, .quote');
        animatedElements.forEach(el => {
            if (el) founderObserver.observe(el);
        });
    }

    // Home Page Scroll Animations
    const homeElements = document.querySelectorAll('.subHeading, .whyIntro, .ServiceCard, .whyCard, .reviewCard, .book, center .link');
    if (homeElements.length > 0) {
        const homeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    homeObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        homeElements.forEach(el => {
            homeObserver.observe(el);
        });
    }
});
