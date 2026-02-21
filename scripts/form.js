

// scripts/form.js

// 1. Set the current year for the copyright
const yearSpan = document.querySelector("#currentyear");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 2. Set the last modified date
const lastModElement = document.querySelector("#lastModified");
if (lastModElement) {
    lastModElement.textContent = `Last Modified: ${document.lastModified}`;
}

// 3. Optional: Populate the Product Name select list dynamically
// (This is common for this specific BYU-I assignment)
const products = [
    { id: "fc-100", name: "Flux Capacitor", avgRating: 4.5 },
    { id: "fc-200", name: "Power Converter", avgRating: 3.2 },
    { id: "fs-198", name: "Warp Drive", avgRating: 5.0 }
];

const productSelect = document.querySelector("#product-name");
if (productSelect) {
    products.forEach(product => {
        let option = document.createElement("option");
        option.value = product.id;
        option.textContent = product.name;
        productSelect.appendChild(option);
    });
}


const reviewsDisplay = document.querySelector("#review-count");


let numReviews = Number(window.localStorage.getItem("numReviews-ls")) || 0;


numReviews++;

window.localStorage.setItem("numReviews-ls", numReviews);


if (reviewsDisplay) {
    reviewsDisplay.textContent = numReviews;
}