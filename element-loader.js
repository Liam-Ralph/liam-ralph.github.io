// Start Time

const startTime = new Date();

// Loading Elements

const response = await fetch('/elements.html');
const html = await response.text();
const parser = new DOMParser();
const documentElements = parser.parseFromString(html, 'text/html');

const elements = ['first-header', 'second-header', 'footer'];

for (let i in elements) {
    const elementId = elements[i];
    document.getElementById(elementId + '-loader').innerHTML =
        documentElements.getElementById(elementId).outerHTML;
}

// Getting Website Version Data

const { projects } = await import("/data-loader.js");
for (let i in projects) {
    const project = projects[i];
    if (project.name === "Website"){
        document.getElementById("first-header-version").textContent = "Version " + project.version;
    }
}

// Log Script Time

const endTime = new Date();
console.log(
    ("/element-loader.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);