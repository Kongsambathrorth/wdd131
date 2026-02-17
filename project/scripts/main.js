// 1. Array of Objects (Requirement: Use objects/arrays)
const courseData = [
    { id: "html1", title: "HTML Basics", xp: 10 },
    { id: "css1", title: "Flexbox Fun", xp: 15 },
    { id: "js1", title: "JS Variables", xp: 20 }
];

// 2. DOM Selection (Requirement: Selecting an element)
const progressDisplay = document.querySelector("#progress-report");

function updateDashboard() {
    // 3. LocalStorage (Requirement: Use localStorage)
    const completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    
    // 4. Array Method (Requirement: Use array methods)
    const totalXP = completed.length * 10; 

    // 5. Conditional Branching (Requirement: Use conditional branching)
    let statusMsg = "";
    if (completed.length === 0) {
        statusMsg = "Start your first lesson today!";
    } else if (completed.length < courseData.length) {
        statusMsg = "Keep going! You're on a roll.";
    } else {
        statusMsg = "Master Level Achieved!";
    }

    // 6. Template Literals (Requirement: Exclusively use template literals)
    progressDisplay.innerHTML = `
        <div class="stats">
            <p>Lessons Completed: <strong>${completed.length}</strong></p>
            <p>Total XP: <strong>${totalXP}</strong></p>
            <p><em>${statusMsg}</em></p>
        </div>
    `;
}

// 7. Event Listener (Requirement: Listening/reacting to events)
// This would be called when a user clicks a 'Complete' button
function markAsComplete(lessonId) {
    let completed = JSON.parse(localStorage.getItem("completedLessons")) || [];
    
    if (!completed.includes(lessonId)) {
        completed.push(lessonId);
        localStorage.setItem("completedLessons", JSON.stringify(completed));
        updateDashboard();
    }
}

// Function 1: Generate the HTML for the courses
function displayLessons(filter = "all") {
    const container = document.querySelector("#course-container");
    container.innerHTML = ""; // Clear existing content

    // Use an Array Method (Requirement: Array methods)
    let filteredLessons = courseData;
    if (filter !== "all") {
        filteredLessons = courseData.filter(course => course.level === filter);
    }

    // Loop through the array to build the UI
    filteredLessons.forEach(course => {
        // Requirement: Exclusively use Template Literals for output
        const card = `
            <section class="card">
                <h3>${course.title}</h3>
                <p>XP Value: <span>${course.xp}</span></p>
                <p>Level: ${course.level}</p>
                <button onclick="markAsComplete('${course.id}')" class="btn-complete">
                    Mark as Finished
                </button>
            </section>
        `;
        
        // Requirement: DOM Interaction (modifying the element)
        container.innerHTML += card;
    });
}

// Function 2: Toggle Mobile Menu
const menuButton = document.querySelector("#menu-button");
const navList = document.querySelector("#nav-list");

menuButton.addEventListener("click", () => {
    // Requirement: DOM Interaction (modifying an element's class)
    navList.classList.toggle("show");
    
    // Requirement: Conditional Branching
    if (navList.classList.contains("show")) {
        menuButton.innerHTML = "&times;"; // Change to 'X'
    } else {
        menuButton.innerHTML = "&#9776;"; // Change back to Hamburger
    }
});

// Function 3: Update Footer Dates
function setupFooter() {
    const yearSpan = document.querySelector("#currentyear");
    const lastModSpan = document.querySelector("#lastModified");

    // Requirement: Use a Template Literal
    const now = new Date();
    yearSpan.textContent = `${now.getFullYear()}`;

    // Requirement: DOM Interaction (modifying element text)
    lastModSpan.textContent = document.lastModified;
}

// Call the function on page load
setupFooter();