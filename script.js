document.addEventListener("DOMContentLoaded", function() {
    emailjs.init('UvZUDizlyHQy-CaUP'); // Initialize EmailJS once

    const preloader = document.querySelector('.preloader');
    if (preloader) preloader.style.display = 'none'; // Hide preloader safely

    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Toggle menu visibility
    menuToggle.addEventListener('click', function() {
        navLinks.classList.toggle('active');
    });

    // Close menu when clicking on a nav link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            navLinks.classList.remove('active'); // Close the menu
        });
    });
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Collect form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;

    // Send the email using EmailJS
    emailjs.send("service_uc9g23v", "template_j3ze692", {
            from_name: name,
            from_email: email,
            subject: subject,
            message: message
        })
        .then(function(response) {
            console.log('Email sent successfully!', response.status, response.text);
            alert('Your message has been sent successfully!');
            document.getElementById('contactForm').reset();
        })
        .catch(function(error) {
            console.error('Failed to send email. Error:', error);
            alert('There was an error sending your message. Please try again later.');
        });
});

window.addEventListener("scroll", function() {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.backgroundImage = "linear-gradient(135deg, #2563eb 0%,rgb(30, 175, 78) 100%)";
    } else {
        header.style.backgroundImage = "none";
    }
});

// Project filtering functionality
document.addEventListener("DOMContentLoaded", function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const loadMoreBtn = document.getElementById('loadMoreBtn');

    // Initialize the page state
    initializeProjects();

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            projectCards.forEach((card, index) => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                    //  Add animation class
                    card.style.animation = 'fadeInUp 0.5s ease forwards';

                    // Hide projects beyond the first 3 unless they're already shown
                    if (index >= 3 && !card.classList.contains('show')) {
                        card.classList.remove('show');
                    }
                } else {
                    card.style.display = 'none';
                    card.classList.remove('show');
                }
            });

            // Update Load More button visibility and text based on current state
            updateLoadMoreButton();
        });
    });

    // Function to initialize projects on page load
    function initializeProjects() {
        // Set "All Projects" as active by default
        const allProjectsBtn = document.querySelector('.filter-btn[data-filter="all"]');
        if (allProjectsBtn) {
            allProjectsBtn.classList.add('active');
        }

        // Show only first 3 projects initially
        projectCards.forEach((card, index) => {
            if (index < 3) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
                card.classList.remove('show');
            }
        });

        // Update Load More button - ensure it's visible if there are hidden projects
        updateLoadMoreButton();

        // Debug: Log button state
        console.log('Load More button:', loadMoreBtn);
        console.log('Hidden projects count:', projectCards.length - 3);
    }

    // Function to update Load More button state
    function updateLoadMoreButton() {
        if (!loadMoreBtn) return;

        const hiddenProjects = Array.from(projectCards).filter((card, index) => {
            return index >= 3 && card.style.display === 'none';
        });

        // Show button if there are hidden projects
        if (hiddenProjects.length > 0) {
            loadMoreBtn.style.display = 'inline-block';
            loadMoreBtn.textContent = 'Load More Projects';
        } else {
            loadMoreBtn.style.display = 'none';
        }
    }
});

// Load More Projects functionality
document.addEventListener("DOMContentLoaded", function() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    const projectCards = document.querySelectorAll('.project-card');

    if (loadMoreBtn && projectCards.length > 0) {
        let projectsVisible = false; // Track if projects are currently visible

        loadMoreBtn.addEventListener('click', function() {
            const hiddenProjects = Array.from(projectCards).filter((card, index) => {
                return index >= 3 && card.style.display === 'none';
            });

            if (!projectsVisible) {
                // Show hidden projects with animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.add('show');
                    }, index * 100); // Stagger the animation
                });

                // Change button text to "Show Less Projects"
                this.textContent = 'Show Less Projects';
                projectsVisible = true;
            } else {
                // Hide projects with animation
                hiddenProjects.forEach((project, index) => {
                    setTimeout(() => {
                        project.classList.remove('show');
                    }, index * 50); // Faster animation for hiding
                });

                // Change button text back to "Load More Projects"
                this.textContent = 'Load More Projects';
                projectsVisible = false;
            }
        });
    }
});
