// 1. Data Object (Requirement: Use objects/arrays)
const courseData = [
    { id: "html-01", title: "HTML Semantic Tags", level: "Beginner", xp: 20 },
    { id: "css-01", title: "Flexbox Layouts", level: "Beginner", xp: 25 },
    { id: "js-01", title: "Understanding Objects", level: "Advanced", xp: 50 },
    { id: "js-02", title: "LocalStorage API", level: "Advanced", xp: 40 }
];

// --- INITIALIZATION ---
document.addEventListener("DOMContentLoaded", () => {
    // 2. Setup Page Specific Logic (Requirement: DOM interaction)
    const courseContainer = document.querySelector("#course-container");
    if (courseContainer) {
        displayLessons("all");
        setupFilters(); // New function to handle filter button clicks
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

    if (menuButton && navList) {
        menuButton.addEventListener("click", () => {
            navList.classList.toggle("show");
            // Requirement: Conditional Branching & Template Literals
            menuButton.innerHTML = navList.classList.contains("show") ? `&times;` : `&#9776;`;
        });
    }
}

// --- FUNCTION 2: FILTER LOGIC (Requirement: Events & DOM selection) ---
function setupFilters() {
    const filterButtons = document.querySelectorAll(".filter-controls button");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Passes the text (All, Beginner, Advanced) to the display function
            displayLessons(button.textContent.toLowerCase());
        });
    });
}

// --- FUNCTION 3: LOCAL STORAGE (Requirement: localStorage & Branching) ---
function markAsComplete(lessonId) {
    let completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(completed));
        alert(`Lesson ${lessonId} marked as complete!`);
        
        if (document.querySelector("#progress-report")) {
            updateDashboard();
        }
    } else {
        alert(`You have already completed this lesson!`);
    }
}

// --- FUNCTION 4: DASHBOARD (Requirement: Template Literals & Branching) ---
function updateDashboard() {
    const progressArea = document.querySelector("#progress-report");
    const completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    
    // Requirement: Exclusively use template literals for HTML output
    progressArea.innerHTML = `
        <div class="stats-box">
            <h3>Your Progress</h3>
            <p>Lessons Finished: <strong>${completed.length}</strong></p>
            <p>Status: ${completed.length >= 3 ? `Master` : `Novice`}</p>
        </div>
    `;
}

// --- FUNCTION 5: DYNAMIC CARDS (Requirement: Array Methods & Template Literals) ---
function displayLessons(filter = 'all') {
    const container = document.querySelector("#course-container");
    if (!container) return;

    // Requirement: Use Array Filter method
    const filteredData = filter === 'all' 
        ? courseData 
        : courseData.filter(course => course.level.toLowerCase() === filter);

    // Requirement: Use Array Map method and Template Literals for string building
    container.innerHTML = filteredData.map(course => `
        <section class="card">
            <h3>${course.title}</h3>
            <p>Level: ${course.level}</p>
            <p>Points: ${course.xp} XP</p>
            <button class="complete-btn" data-id="${course.id}">Complete Lesson</button>
        </section>
    `).join('');

    // Re-attach event listeners to buttons generated dynamically
    document.querySelectorAll(".complete-btn").forEach(btn => {
        btn.addEventListener("click", (e) => {
            markAsComplete(e.target.dataset.id);
        });
    });
}

// --- FUNCTION 6: FOOTER (Requirement: Template Literals) ---
function setupFooter() {
    const yearSpan = document.querySelector("#currentyear");
    const modifiedSpan = document.querySelector("#lastModified");
    
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    if (modifiedSpan) {
        // Requirement: Use Template Literals for output strings
        modifiedSpan.textContent = `Last Modified: ${document.lastModified}`;
    }
}