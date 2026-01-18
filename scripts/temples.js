document.addEventListener('DOMContentLoaded', () => {
    
    const menuButton = document.getElementById('menu-button');
    const navMenu = document.getElementById('nav-menu');

    if (menuButton && navMenu) {
        menuButton.addEventListener('click', () => {
            // Toggle the 'open' class on the navigation menu
            navMenu.classList.toggle('open');
            
            // Check if the menu is now open and update the button text
            if (navMenu.classList.contains('open')) {
                menuButton.textContent = '×'; 
            } else {
                menuButton.textContent = '☰'; 
            }
        });
    }

    // --- Footer Dynamic Content ---
    try {
        // Set the current year for the copyright
        const currentYear = new Date().getFullYear();
        document.getElementById('copyright-year').textContent = currentYear;

        // Set the last modified date of the document
        const lastModified = document.lastModified;
        document.getElementById('last-modified').textContent = lastModified;
        
    } catch (e) {
        console.error("Error setting footer content:", e);
    }
});
