// Output the current copyright year
const currentYear = new Date().getFullYear();
document.getElementById("currentyear").textContent = currentYear;

// Output the date the document was last modified
document.getElementById("lastModified").textContent = `Last Modification: ${document.lastModified}`;
