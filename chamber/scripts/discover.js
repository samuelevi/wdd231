import { itemsOfInterest } from '../data/discover.mjs';

function displayVisitorMessage() {
    const messageDiv = document.getElementById('visitor-message');
    const lastVisit = localStorage.getItem('lastVisit');
    const now = Date.now();

    if (!lastVisit) {
        messageDiv.textContent = 'Welcome! Let us know if you have any questions.';
        messageDiv.classList.add('welcome-message');
    } else {
        const lastVisitTime = parseInt(lastVisit);
        const timeDifference = now - lastVisitTime;
        const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        if (daysDifference === 0) {
            messageDiv.textContent = 'Back so soon! Awesome!';
            messageDiv.classList.add('return-message');
        } else {
            const dayLabel = daysDifference === 1 ? 'day' : 'days';
            messageDiv.textContent = `You last visited ${daysDifference} ${dayLabel} ago.`;
            messageDiv.classList.add('return-message');
        }
    }

    localStorage.setItem('lastVisit', now.toString());
}

function displayGallery() {
    const galleryContainer = document.getElementById('gallery-container');
    galleryContainer.innerHTML = '';

    itemsOfInterest.forEach((item, index) => {
        const card = document.createElement('article');
        card.className = 'gallery-card';
        card.style.gridArea = `area${index + 1}`;

        card.innerHTML = `
            <h2>${item.name}</h2>
            <figure>
                <img src="images/${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
            </figure>
            <address>${item.address}</address>
            <p>${item.description}</p>
            <button type="button" class="learn-more-btn">Learn More</button>
        `;

        galleryContainer.appendChild(card);
    });
}

function setupMenuToggle() {
    const menuToggle = document.querySelector('#menu-toggle');
    const navMenu = document.querySelector('#nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });
}

function setupFooter() {
    document.querySelector('#current-year').textContent = new Date().getFullYear();
    document.querySelector('#last-modified').textContent = document.lastModified;
}

displayVisitorMessage();
displayGallery();
setupMenuToggle();
setupFooter();
