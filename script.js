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