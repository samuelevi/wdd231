const courses = [
    {
        subject: "CSE",
        number: 110,
        title: "Introduction to Programming",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Learn the fundamentals of programming with Python or JavaScript",
        technology: ["Python", "JavaScript"],
        completed: false,
    },
    {
        subject: "WDD",
        number: 130,
        title: "Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Master HTML, CSS, and responsive web design basics",
        technology: ["HTML", "CSS", "Responsive Design"],
        completed: false,
    },
    {
        subject: "CSE",
        number: 111,
        title: "Programming with Functions",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Advance your programming skills with functions and modular code",
        technology: ["Python", "Functions"],
        completed: false,
    },
    {
        subject: "WDD",
        number: 131,
        title: "Dynamic Web Fundamentals",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Add interactivity to web pages with JavaScript",
        technology: ["JavaScript", "DOM", "Events"],
        completed: false,
    },
    {
        subject: "CSE",
        number: 210,
        title: "Programming with Classes",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Learn object-oriented programming with classes and inheritance",
        technology: ["Python", "OOP", "Classes"],
        completed: false,
    },
    {
        subject: "WDD",
        number: 231,
        title: "Web Frontend Development I",
        credits: 2,
        certificate: "Web and Computer Programming",
        description: "Build modern web applications with advanced JavaScript frameworks",
        technology: ["JavaScript", "React", "Frontend"],
        completed: false,
    },
];

document.addEventListener("DOMContentLoaded", () => {
    
    const menuToggle = document.getElementById("menu-toggle");
    const mainNav = document.getElementById("main-nav");
    const iconMenu = menuToggle.querySelector(".icon-menu");
    const iconClose = menuToggle.querySelector(".icon-close");

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        menuToggle.setAttribute("aria-expanded", !isExpanded);
        mainNav.classList.toggle("hidden-mobile");
        iconMenu.classList.toggle("hidden");
        iconClose.classList.toggle("hidden");
    });

    
    const currentYearSpan = document.getElementById("current-year");
    const lastModifiedSpan = document.getElementById("last-modified");
    
    currentYearSpan.textContent = new Date().getFullYear();
    lastModifiedSpan.textContent = `Last Modified: ${document.lastModified}`;

    
    const courseListContainer = document.getElementById("course-list");
    const totalCreditsSpan = document.getElementById("total-credits");
    const filterButtons = document.querySelectorAll(".filter-btn");

    const renderCourses = (filter = "all") => {
        
        const filteredCourses = courses.filter(course => {
            if (filter === "all") return true;
            return course.subject.toLowerCase() === filter.toLowerCase();
        });

    
        courseListContainer.innerHTML = "";

    
        const totalCredits = filteredCourses.reduce((sum, course) => sum + course.credits, 0);
        totalCreditsSpan.textContent = totalCredits;

    
        filteredCourses.forEach(course => {
            const courseCard = document.createElement("div");
            courseCard.className = `course-card ${course.completed ? 'completed' : ''}`;
            
            courseCard.innerHTML = `
                <div class="course-info">
                    <h3>${course.subject} ${course.number}</h3>
                    <p>${course.title}</p>
                </div>
                <div class="course-meta">
                    <span class="credits-badge">${course.credits} credits</span>
                    ${course.completed ? '<span class="completed-badge">✓ Completed</span>' : ''}
                </div>
            `;
            
            courseListContainer.appendChild(courseCard);
        });
    };

    
    renderCourses();

    
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
        
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

        
            const filterValue = button.getAttribute("data-filter");
            renderCourses(filterValue);
        });
    });
});
