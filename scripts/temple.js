document.addEventListener('DOMContentLoaded', () => {
            
 
            const menuButton = document.getElementById('menu-button');
            const navMenu = document.getElementById('nav-menu');

            if (menuButton && navMenu) {
                menuButton.addEventListener('click', () => {
                 
                    navMenu.classList.toggle('open');
                    
            
                    if (navMenu.classList.contains('open')) {
                        menuButton.textContent = '×'; 
                        menuButton.textContent = '☰'; 
                    }
                });
            }

            // --- Footer Dynamic Content ---
            try {
       
                const currentYear = new Date().getFullYear();
                document.getElementById('copyright-year').textContent = currentYear;

           
                const lastModified = document.lastModified;
                document.getElementById('last-modified').textContent = lastModified;
                
            } catch (e) {
                console.error("Error setting footer content:", e);
            }
        });
   
