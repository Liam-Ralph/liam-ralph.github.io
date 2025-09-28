// Start Time

const startTime = new Date();

// Import From Data Loader

import { projects } from "/data-loader.js";

// Update Counters

document.getElementById("projects-counter").textContent = projects.length + " Projects";

var sum = 0;
for (let i in projects) {
    sum += projects[i].lines;
}
document.getElementById("loc-counter").textContent = sum + " Lines of Code";

// Log Script Time

const endTime = new Date();
console.log(
    ("/about-me/script.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);