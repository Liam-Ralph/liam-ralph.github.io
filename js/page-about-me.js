import { languages, projects } from "./data-loader.js";

document.getElementById("projects-counter").textContent = projects.length + " Projects";

var sum = 0;
for (let i in languages) {
    sum += languages[i].lines;
}
document.getElementById("loc-counter").textContent = sum + " Lines of Code";