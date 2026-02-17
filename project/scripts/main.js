// 1. Data Object (Requirement: Use objects/arrays)
const courseData = [
    { id: "html-01", title: "HTML Semantic Tags", level: "Beginner", xp: 20 },
    { id: "css-01", title: "Flexbox Layouts", level: "Beginner", xp: 25 },
    { id: "js-01", title: "Understanding Objects", level: "Advanced", xp: 50 },
    { id: "js-02", title: "LocalStorage API", level: "Advanced", xp: 40 }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // Determine which page we are on and run the relevant code
    if (document.querySelector("#course-container")) {
        displayLessons();
    }
    if (document.querySelector("#progress-report")) {
        updateDashboard();
    }
    
    setupFooter();
    setupMenu();
});

// --- FUNCTION 1: MOBILE MENU (Requirement: Events & Branching) ---
function setupMenu() {
    const menuButton = document.querySelector("#menu-button");
    const navList = document.querySelector("#nav-list");

    menuButton.addEventListener("click", () => {
        navList.classList.toggle("show");
        menuButton.innerHTML = navList.classList.contains("show") ? "&times;" : "&#9776;";
    });
}

// --- FUNCTION 2: LOCAL STORAGE LOGIC (Requirement: localStorage) ---
function markAsComplete(lessonId) {
    // Get existing data from localStorage or create an empty array
    let completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    
    // Check if it's already there (Requirement: Conditional Branching)
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        // Save back to localStorage
        localStorage.setItem("completedLessons", JSON.stringify(completed));
        alert("Lesson marked as complete! XP added.");
        
        // If we're on the dashboard, update it immediately
        if (document.querySelector("#progress-report")) {
            updateDashboard();
        }
    } else {
        alert("You have already completed this lesson!");
    }
}

// --- FUNCTION 3: DASHBOARD UPDATE (Requirement: Template Literals) ---
function updateDashboard() {
    const progressArea = document.querySelector("#progress-report");
    const completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    
    // Requirement: Use Template Literals
    progressArea.innerHTML = `
        <div class="stats-box">
            <h3>Your Progress</h3>
            <p>Lessons Finished: <strong>${completed.length}</strong></p>
            <p>Status: ${completed.length >= 3 ? "Master" : "Novice"}</p>
        </div>
    `;
}

// --- FUNCTION 4: DYNAMIC CARDS (Requirement: Array Methods) ---

function displayLessons(filter = 'all') { // Add the filter parameter
    const container = document.querySelector("#course-container");
    container.innerHTML = "";
    const filteredData = filter === 'all' 
        ? courseData 
        : courseData.filter(course => course.level === filter);

    filteredData.forEach(course => {
        const card = document.createElement("section");
        card.className = "card";
        // Requirement: Template Literals
        card.innerHTML = `
            <h3>${course.title}</h3>
            <p>Level: ${course.level}</p>
            <p>Points: ${course.xp} XP</p>
            <button class="complete-btn" data-id="${course.id}">Complete Lesson</button>
        `;
        container.appendChild(card);
    });

    // Add event listeners to the new buttons
    document.querySelectorAll(".complete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            markAsComplete(e.target.dataset.id);
        });
    });
}

// --- FUNCTION 5: FOOTER (Standard requirement) ---
function setupFooter() {
    document.querySelector("#currentyear").textContent = new Date().getFullYear();
    document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;
}