// Start Time

const startTime = new Date();

// Import From Data Loader

import { projects } from "/data-loader.js";

const pinnedProjectNames = [];

for (let i = projects.length - 1; i >= 0; i--) {

    const project = projects[i];

    // Project Box

    var projectBox = document.createElement("div");
    projectBox.className = "project-box";

    // Project Logo

    var projectLogo = document.createElement("img");
    projectLogo.className = "project-logo";
    projectLogo.src = "/images/projects/" + project.pathName + "/logo.png";
    projectLogo.alt = project.name + " Logo";

    projectBox.appendChild(projectLogo);

    // Project Link

    var projectLink = document.createElement("a");
    projectLink.href = "/projects/" + project.pathName;

    // Project Title

    var projectTitle = document.createElement("p");
    projectTitle.className = "project-title offwhite-hover";
    projectTitle.textContent = project.name;

    projectLink.appendChild(projectTitle);
    projectBox.appendChild(projectLink);

    // Project Tagline

    var projectTagline = document.createElement("p");
    projectTagline.className = "project-tagline";
    projectTagline.textContent = project.tagline;

    projectBox.appendChild(projectTagline);

    // Project Tags

    var projectTagLang = document.createElement("p");
    projectTagLang.className = "project-tag";
    projectTagLang.textContent = project.languages[0].name;
    projectTagLang.style.backgroundColor = project.languages[0].color;

    projectBox.appendChild(projectTagLang);

    var projectTagLic = document.createElement("p");
    projectTagLic.className = "project-tag";
    projectTagLic.textContent = project.license.shortName;
    projectTagLic.style.backgroundColor = project.license.color;

    projectBox.appendChild(projectTagLic);

    // Project Release Date and Version

    var projectDate = document.createElement("p");
    projectDate.className = "project-text";
    projectDate.textContent = "Released " + project.releaseDate;

    projectBox.appendChild(projectDate);

    var projectVersion = document.createElement("p");
    projectVersion.className = "project-text";
    projectVersion.textContent = "Version " + project.version;

    projectBox.appendChild(projectVersion);

    // Project Lines of Code

    var projectLoc = document.createElement("p");
    projectLoc.className = "project-text";
    projectLoc.textContent = "Lines of Code: " + project.lines;

    projectBox.appendChild(projectLoc);

    for (let ii in project.languages) {

        const language = project.languages[ii];
        const width = project.linesList[ii] / project.lines * 350;
        var languageBar = document.createElement("div");
        languageBar.className = "language-bar";
        languageBar.textContent = language.name.replace("JavaScript", "Java\u00ADScript");
        languageBar.style.width = width.toString() + "px";
        languageBar.style.backgroundColor = language.color;
        if (width < 75) {
            languageBar.style.direction = "rtl";
        }

        projectBox.appendChild(languageBar);

    }

    // Append Children

    document.getElementById("section-recent").appendChild(projectBox);
    if (pinnedProjectNames.includes(project.name)) {
        document.getElementById("section-pinned").appendChild(projectBox.cloneNode(true));
    }

}

document.getElementById("projects-counter").textContent = projects.length + " Projects";

// Log Script Time

const endTime = new Date();
console.log(
    ("/projects/script.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);