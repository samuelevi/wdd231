// Shared functionality for all pages
document.addEventListener('DOMContentLoaded', () => {
    // Hamburger menu toggle
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Display current year in footer if needed (optional but good practice)
    // const yearSpan = document.querySelector('#current-year');
    // if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});
