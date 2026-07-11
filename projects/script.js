// Start Time

const startTime = new Date();

// Import From Data Loader

import { projects } from "/data-loader.js";

const pinnedProjectNames = [];

for (let i = projects.length - 1; i >= 0; i--) {

    const project = projects[i];

    // Project Box

    let projectBox = document.createElement("div");
    projectBox.className = "project-box";

    // Project Logo

    let projectLogo = document.createElement("img");
    projectLogo.className = "project-logo";
    projectLogo.src = `/images/projects/${project.pathName}/logo.png`;
    projectLogo.alt = project.name + " Logo";

    projectBox.appendChild(projectLogo);

    // Project Link

    let projectLink = document.createElement("a");
    projectLink.href = "/projects/" + project.pathName;

    // Project Title

    let projectTitle = document.createElement("p");
    projectTitle.className = "project-title offwhite-hover";
    projectTitle.textContent = project.name;

    projectLink.appendChild(projectTitle);
    projectBox.appendChild(projectLink);

    // Project Tagline

    let projectTagline = document.createElement("p");
    projectTagline.className = "project-tagline";
    projectTagline.textContent = project.tagline;

    projectBox.appendChild(projectTagline);

    // Project Tags

    if (project.languages.length != 0) {

        let projectTagLang = document.createElement("p");
        projectTagLang.className = "project-tag";
        projectTagLang.textContent = project.languages[0].name;
        projectTagLang.style.backgroundColor = project.languages[0].color;

        projectBox.appendChild(projectTagLang);

    }

    let projectTagLic = document.createElement("p");
    projectTagLic.className = "project-tag";
    projectTagLic.textContent = project.license.shortName;
    projectTagLic.style.backgroundColor = project.license.color;

    projectBox.appendChild(projectTagLic);

    // Project Release Date and Version

    let projectDate = document.createElement("p");
    projectDate.className = "project-text";
    projectDate.textContent = "Released " + project.releaseDate;

    projectBox.appendChild(projectDate);

    let projectVersion = document.createElement("p");
    projectVersion.className = "project-text";
    projectVersion.textContent = "Version " + project.version;

    projectBox.appendChild(projectVersion);

    // Project Lines of Code

    let projectLoc = document.createElement("p");
    projectLoc.className = "project-text";
    projectLoc.textContent = "Lines of Code: " + project.lines;

    projectBox.appendChild(projectLoc);

    if (project.languages.length != 0) {

        for (let ii in project.languages) {

            const language = project.languages[ii];
            const width = project.linesList[ii] / project.lines * 350;
            let languageBar = document.createElement("div");
            languageBar.className = "language-bar";
            languageBar.textContent = language.name.replace("JavaScript", "Java\u00ADScript");
            languageBar.style.width = width.toString() + "px";
            languageBar.style.backgroundColor = language.color;
            if (width < 75) {
                languageBar.style.direction = "rtl";
            }

            projectBox.appendChild(languageBar);

        }

    } else {

        let bufferBar = document.createElement("div");
        bufferBar.className = "language-bar";
        bufferBar.style.width = "100px";
        
        projectBox.appendChild(bufferBar);

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
    (endTime - startTime).toString().padStart(5) + "ms " + // script time
    ("/projects/script.js") // script path
);