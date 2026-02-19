// 1. Data Object
const courseData = [
    { id: "html-01", title: "Leadership", level: "Beginner", xp: 2 },
    { id: "css-01", title: "Communication", level: "Beginner", xp: 2 },
    { id: "js-01", title: "Time management", level: "Advanced", xp: 4 },
    { id: "js-02", title: "HR management", level: "Advanced", xp: 4 }
];

document.addEventListener("DOMContentLoaded", () => {
    // Initial Load
    const courseContainer = document.querySelector("#course-container");
    if (courseContainer) {
        displayLessons("all");
        setupFilters(); 
    }

    if (document.querySelector("#progress-report")) {
        updateDashboard();
    }
    
    setupFooter();
    setupMenu();
});

// Mobile Menu
function setupMenu() {
    const menuButton = document.querySelector("#menu-button");
    const navList = document.querySelector("#nav-list");
    if (menuButton && navList) {
        menuButton.addEventListener("click", () => {
            navList.classList.toggle("show");
            menuButton.innerHTML = navList.classList.contains("show") ? `&times;` : `&#9776;`;
        });
    }
}

// Filter Logic
function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-controls button");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            displayLessons(button.textContent.toLowerCase());
        });
    });
}

// Dynamic Display (Requirement: Array Methods & Template Literals)
function displayLessons(filter = 'all') {
    const container = document.querySelector("#course-container");
    if (!container) return;

    const filteredData = filter === 'all' 
        ? courseData 
        : courseData.filter(course => course.level.toLowerCase() === filter);

    container.innerHTML = filteredData.map(course => `
        <section class="card">
            <h3>${course.title}</h3>
            <p>Level: ${course.level}</p>
            <p>Points: ${course.xp} XP</p>
            <button class="complete-btn" data-id="${course.id}">Complete Lesson</button>
        </section>
    `).join('');

    document.querySelectorAll(".complete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => markAsComplete(e.target.dataset.id));
    });
}

// Storage Logic
function markAsComplete(lessonId) {
    let completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(completed));
        alert(`Great job! Lesson completed.`);
        if (document.querySelector("#progress-report")) updateDashboard();
    }
}

function updateDashboard() {
    const progressArea = document.querySelector("#progress-report");
    const completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    progressArea.innerHTML = `
        <div class="stats-box">
            <h3>Progress Summary</h3>
            <p>Completed Bursts: <strong>${completed.length}</strong></p>
            <p>Rank: ${completed.length >= 3 ? `Master` : `Novice`}</p>
        </div>
    `;
}

function setupFooter() {
    const yearSpan = document.querySelector("#currentyear");
    const modifiedSpan = document.querySelector("#lastModified");
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) modifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
}