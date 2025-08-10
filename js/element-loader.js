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

// Getting Website Release Date and Version Data

const { projects } = await import("/js/data-loader.js");
for (let i in projects) {
    const project = projects[i];
    if (project.name === "Website"){
        document.getElementById("first-header-released").textContent =
            "Released " + project.releaseDate;
        document.getElementById("first-header-version").textContent = "Version " + project.version;
    }
}