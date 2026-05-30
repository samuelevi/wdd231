const params = new URLSearchParams(window.location.search);

const firstName = params.get('first-name') || 'N/A';
const lastName = params.get('last-name') || 'N/A';
const email = params.get('email') || 'N/A';
const phone = params.get('phone') || 'N/A';
const businessName = params.get('business-name') || 'N/A';
const timestamp = params.get('timestamp') || 'N/A';

document.getElementById('display-first-name').textContent = firstName;
document.getElementById('display-last-name').textContent = lastName;
document.getElementById('display-email').textContent = email;
document.getElementById('display-phone').textContent = phone;
document.getElementById('display-business-name').textContent = businessName;

if (timestamp !== 'N/A') {
    const date = new Date(timestamp);
    const formattedDate = date.toLocaleString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
    document.getElementById('display-timestamp').textContent = formattedDate;
} else {
    document.getElementById('display-timestamp').textContent = timestamp;
}

const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;
