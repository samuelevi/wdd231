const url = 'data/members.json';
const cards = document.querySelector('#member-container');
const gridbutton = document.querySelector("#grid-view");
const listbutton = document.querySelector("#list-view");

async function getMemberData() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            displayMembers(data);
        } else {
            console.error("Failed to fetch member data");
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

const displayMembers = (members) => {
    cards.innerHTML = ""; 

    members.forEach((member) => {
        let card = document.createElement("section");
        let h3 = document.createElement("h3");
        let address = document.createElement("p");
        let phone = document.createElement("p");
        let website = document.createElement("a");
        let portrait = document.createElement("img");
        let level = document.createElement("p");

        h3.textContent = member.name;
        address.textContent = member.address;
        phone.textContent = member.phone;
        
        website.textContent = "Visit Website";
        website.setAttribute("href", member.website);
        website.setAttribute("target", "_blank");

        portrait.setAttribute("src", `images/${member.image}`);
        portrait.setAttribute("alt", `Logo of ${member.name}`);
        portrait.setAttribute("loading", "lazy");
        portrait.setAttribute("width", "200");
        portrait.setAttribute("height", "150");

        const levels = { 1: "Member", 2: "Silver", 3: "Gold" };
        level.textContent = `Membership: ${levels[member.membershipLevel] || "N/A"}`;
        level.classList.add("membership-level");

        card.appendChild(portrait);
        card.appendChild(h3);
        card.appendChild(address);
        card.appendChild(phone);
        card.appendChild(website);
        card.appendChild(level);

        cards.appendChild(card);
    });
};

gridbutton.addEventListener("click", () => {
    cards.classList.add("grid");
    cards.classList.remove("list");
});

listbutton.addEventListener("click", () => {
    cards.classList.add("list");
    cards.classList.remove("grid");
});

const menuToggle = document.querySelector('#menu-toggle');
const navMenu = document.querySelector('#nav-menu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('show');
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
document.querySelector('#last-modified').textContent = document.lastModified;

getMemberData();
