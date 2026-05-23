
const WEATHER_API_KEY = 'b6fd43b342138e4b5d64df8b06b0f914'; 
const LAT = 6.4655;
const LON = 3.1959;
const WEATHER_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;
const FORECAST_URL = `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=metric&appid=${WEATHER_API_KEY}`;

async function getWeather() {
    try {
        const response = await fetch(WEATHER_URL);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            console.error("Failed to fetch weather data");
            document.getElementById('current-weather-info').innerHTML = '<p>Unable to load weather data.</p>';
        }
    } catch (error) {
        console.error("Error fetching weather:", error);
        document.getElementById('current-weather-info').innerHTML = '<p>Error loading weather data.</p>';
    }
}

const displayCurrentWeather = (data) => {
    const weatherInfo = document.getElementById('current-weather-info');
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const feelsLike = Math.round(data.main.feels_like);
    const humidity = data.main.humidity;

    weatherInfo.innerHTML = `
        <div class="weather-info">
            <p><strong>Temperature:</strong> ${temp}°C</p>
            <p><strong>Condition:</strong> ${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <p><strong>Feels Like:</strong> ${feelsLike}°C</p>
            <p><strong>Humidity:</strong> ${humidity}%</p>
        </div>
    `;
};

async function getForecast() {
    try {
        const response = await fetch(FORECAST_URL);
        if (response.ok) {
            const data = await response.json();
            displayForecast(data);
        } else {
            console.error("Failed to fetch forecast data");
            document.getElementById('forecast-container').innerHTML = '<p>Unable to load forecast data.</p>';
        }
    } catch (error) {
        console.error("Error fetching forecast:", error);
        document.getElementById('forecast-container').innerHTML = '<p>Error loading forecast data.</p>';
    }
}

const displayForecast = (data) => {
    const forecastContainer = document.getElementById('forecast-container');
    const forecasts = data.list;
    
    const dailyForecasts = [];
    const seenDates = new Set();

    for (let i = 0; i < forecasts.length; i++) {
        const forecast = forecasts[i];
        const date = new Date(forecast.dt * 1000);
        const dateString = date.toLocaleDateString();

        if (!seenDates.has(dateString) && date.getHours() >= 10 && date.getHours() <= 14) {
            dailyForecasts.push(forecast);
            seenDates.add(dateString);
            if (dailyForecasts.length === 3) break;
        }
    }

    let forecastHTML = '<div class="forecast-items">';
    dailyForecasts.forEach((forecast, index) => {
        const date = new Date(forecast.dt * 1000);
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        const temp = Math.round(forecast.main.temp);
        const description = forecast.weather[0].description;

        forecastHTML += `
            <div class="forecast-item">
                <p><strong>${dayName}, ${dateStr}</strong></p>
                <p>Temp: ${temp}°C</p>
                <p>${description.charAt(0).toUpperCase() + description.slice(1)}</p>
            </div>
        `;
    });
    forecastHTML += '</div>';

    forecastContainer.innerHTML = forecastHTML;
};

const memberUrl = 'data/members.json';

async function getSpotlights() {
    try {
        const response = await fetch(memberUrl);
        if (response.ok) {
            const members = await response.json();
            const qualifiedMembers = members.filter(member => member.membershipLevel === 2 || member.membershipLevel === 3);
            
            const spotlightCount = Math.min(3, qualifiedMembers.length);
            const selectedSpotlights = [];
            const indices = new Set();

            while (selectedSpotlights.length < spotlightCount) {
                const randomIndex = Math.floor(Math.random() * qualifiedMembers.length);
                if (!indices.has(randomIndex)) {
                    indices.add(randomIndex);
                    selectedSpotlights.push(qualifiedMembers[randomIndex]);
                }
            }

            displaySpotlights(selectedSpotlights);
        } else {
            console.error("Failed to fetch member data");
            document.getElementById('spotlight-container').innerHTML = '<p>Unable to load member spotlights.</p>';
        }
    } catch (error) {
        console.error("Error fetching member data:", error);
        document.getElementById('spotlight-container').innerHTML = '<p>Error loading member spotlights.</p>';
    }
}

const displaySpotlights = (members) => {
    const spotlightContainer = document.getElementById('spotlight-container');
    spotlightContainer.innerHTML = '';

    members.forEach((member) => {
        const card = document.createElement('article');
        card.className = 'spotlight-card';

        const levels = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
        const membershipLevel = levels[member.membershipLevel] || 'N/A';
        const membershipClass = membershipLevel.toLowerCase();

        card.innerHTML = `
            <img src="images/${member.image}" alt="Logo of ${member.name}" class="spotlight-logo" loading="lazy">
            <h3>${member.name}</h3>
            <p class="membership-badge ${membershipClass}">${membershipLevel} Member</p>
            <p><strong>Phone:</strong> <a href="tel:${member.phone}">${member.phone}</a></p>
            <p><strong>Address:</strong> ${member.address}</p>
            <p><a href="https://${member.website}" target="_blank" class="website-link">Visit Website</a></p>
        `;

        spotlightContainer.appendChild(card);
    });
};

const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;

getWeather();
getForecast();
getSpotlights();
