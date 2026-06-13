// Plant Directory Functionality
const plantGrid = document.getElementById('plant-grid');
const modal = document.getElementById('plant-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');
const filterBtns = document.querySelectorAll('.filter-btn');

let allPlants = [];

// Fetch data from JSON
async function fetchPlants() {
    try {
        const response = await fetch('data/plants.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        allPlants = await response.json();
        displayPlants(allPlants);
    } catch (error) {
        console.error('Error fetching plants:', error);
        plantGrid.innerHTML = `<p class="error">Sorry, we couldn't load the plants right now. Please try again later.</p>`;
    }
}

// Display plants in the grid
function displayPlants(plants) {
    plantGrid.innerHTML = '';
    
    plants.forEach(plant => {
        const card = document.createElement('div');
        card.className = 'plant-card';
        card.innerHTML = `
            <img src="${plant.image}" alt="${plant.name}" loading="lazy">
            <div class="plant-info">
                <h3>${plant.name}</h3>
                <p><em>${plant.scientificName}</em></p>
                <p><strong>Sun:</strong> ${plant.sunRequirement}</p>
                <p><strong>Harvest:</strong> ${plant.harvestSeason}</p>
            </div>
        `;
        
        card.addEventListener('click', () => openModal(plant));
        plantGrid.appendChild(card);
    });
}

// Modal functionality
function openModal(plant) {
    modalBody.innerHTML = `
        <h2>${plant.name}</h2>
        <img src="${plant.image}" alt="${plant.name}">
        <p><strong>Scientific Name:</strong> ${plant.scientificName}</p>
        <p><strong>Category:</strong> ${plant.category}</p>
        <p><strong>Sun Requirement:</strong> ${plant.sunRequirement}</p>
        <p><strong>Harvest Season:</strong> ${plant.harvestSeason}</p>
        <hr style="margin: 15px 0;">
        <h3>Care Instructions</h3>
        <p>${plant.careInstructions}</p>
        <button id="fav-btn" class="submit-btn" style="margin-top: 15px;">
            ${isFavorite(plant.id) ? 'Remove from My Garden' : 'Add to My Garden'}
        </button>
    `;
    
    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    
    // Local Storage integration (Favorites)
    const favBtn = document.getElementById('fav-btn');
    favBtn.addEventListener('click', () => {
        toggleFavorite(plant.id);
        favBtn.textContent = isFavorite(plant.id) ? 'Remove from My Garden' : 'Add to My Garden';
    });
}

// Close modal
if (closeModal) {
    closeModal.onclick = () => {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    };
}

window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }
};

// Filtering logic
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filterValue = btn.getAttribute('data-filter');
        const filteredPlants = filterValue === 'all' 
            ? allPlants 
            : allPlants.filter(p => p.category === filterValue);
        
        displayPlants(filteredPlants);
    });
});

// Local Storage Helpers
function toggleFavorite(id) {
    let favorites = JSON.parse(localStorage.getItem('gardenFavorites')) || [];
    if (favorites.includes(id)) {
        favorites = favorites.filter(favId => favId !== id);
    } else {
        favorites.push(id);
    }
    localStorage.setItem('gardenFavorites', JSON.stringify(favorites));
}

function isFavorite(id) {
    const favorites = JSON.parse(localStorage.getItem('gardenFavorites')) || [];
    return favorites.includes(id);
}

// Initialize
fetchPlants();
