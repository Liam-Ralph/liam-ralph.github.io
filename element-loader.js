// Start Time

const startTime = new Date();

// Attempting to Read Cookie

let text;

if (document.cookie.indexOf("elements=") != -1) {

    const cookie = document.cookie.split(";")[0].replace("elements=", "");
    text = cookie.replaceAll("/n", "\n").replaceAll("?", " ")
        .replaceAll("^", ",").replaceAll("%", ";").trim();

} else {

    // Fetching Elements

    const response = await fetch('/elements.html');
    text = await response.text();

    // Saving Cookie

    document.cookie = 
        "elements=" + text.replaceAll("    ", "").replaceAll("\n\n", "\n")
        .replaceAll("\n", "/n").replaceAll(" ", "?").replaceAll(",", "^").replaceAll(";", "%") +
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
if (document.cookie.indexOf("projects=") != -1) {
    websiteVersion = document.cookie.split(";")[1].split("_")[6];
} else {
    const { projects } = await import("/data-loader.js");
    websiteVersion = projects[2].version;
}
document.getElementById("first-header-version").textContent = "Version " + websiteVersion;

// Log Script Time

const endTime = new Date();
console.log(
    ("/element-loader.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);