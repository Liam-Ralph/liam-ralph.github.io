// Start Time

const startTime = new Date();

// Attempting to Read Cookie

import { readCookie } from "/cookie-reader.js";

const elementsCookie = readCookie("elements");
let text;

if (elementsCookie != "") {

    text = elementsCookie.replaceAll("?", " ").replaceAll("^", ",").replaceAll("%", ";").trim();

} else {

    // Fetching Elements

    const response = await fetch('/elements.html');
    text = await response.text();

    // Removing Comments, Indents, and Empty Lines

    while (true) {
        const startIndex = text.indexOf("<!--")
        if (startIndex == -1) break;
        const endIndex = text.indexOf("-->", startIndex + 4);
        if (endIndex == -1) break;
        text = text.substring(0, startIndex) + text.substring(endIndex + 4);
    }

    text = text.replaceAll("    ", "").replaceAll("\n", "");

    // Saving Cookie

    document.cookie = 
        "elements=" +
        text.replaceAll(" ", "?").replaceAll(",", "^").replaceAll(";", "%") +
        "; path=/;";

}

// Loading Elements

const parser = new DOMParser();
const documentElements = parser.parseFromString(text, 'text/html');

const elements = ['first-header', 'second-header', 'footer'];

for (let i in elements) {
    const elementId = elements[i];
    document.getElementById(elementId + '-loader').innerHTML =
        documentElements.getElementById(elementId).outerHTML;
}

// Getting Website Version Data

let websiteVersion;
const projectsCookie = readCookie("projects");
if (projectsCookie != "") {
    websiteVersion = projectsCookie.split("_")[6];
} else {
    const { projects } = await import("/data-loader.js");
    websiteVersion = projects[2].version;
}
document.getElementById("first-header-version").textContent = "Version " + websiteVersion;

// Log Script Time

const endTime = new Date();
console.log(
    (endTime - startTime).toString().padStart(5) + "ms " + // script time
    ("/element-loader.js") // script path
);