import { projects } from "/js/data-loader.js";

const pinnedProjectNames = ["PwrStat GUI"];

for (let i = projects.length - 1; i >= 0; i--) {

    const project = projects[i];

    // Project Box

    var projectBox = document.createElement("div");
    projectBox.className = "project-box";

    // Project Logo

    var projectLogo = document.createElement("img");
    projectLogo.className = "project-logo";
    projectLogo.src = "/images/project-logos/" + project.pathName + ".png";
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

    // Project Tags

    var projectTags = [];

    var projectTagLang = document.createElement("p");
    projectTagLang.className = "project-tag";
    projectTagLang.textContent = project.languages[0].name;
    projectTagLang.style.backgroundColor = project.languages[0].color;
    if (project.languages[0].whiteText) {
        projectTagLang.style.color = "#C0C0C0";
    }
    projectTags.push(projectTagLang);

    var projectTagLic = document.createElement("p");
    projectTagLic.className = "project-tag";
    projectTagLic.textContent = project.license;
    switch (project.licenseType) {
        case "FOSS":
            projectTagLic.style.backgroundColor = "#00FF00";
            break;
        case "Source Available":
            projectTagLic.style.backgroundColor = "#FF8800";
            break;
        default:
            projectTagLic.style.backgroundColor = "#FF0000";
    }
    projectTags.push(projectTagLic);

    for (let ii in projectTags) {
        projectBox.appendChild(projectTags[ii]);
    }

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
        const width = project.linesList[ii] / project.lines * 400;
        var languageBar = document.createElement("div");
        languageBar.className = "language-bar";
        languageBar.textContent = language.name.replace("JavaScript", "Java\u00ADScript");
        languageBar.style.width = width.toString() + "px";
        languageBar.style.backgroundColor = language.color;
        if (language.whiteText) {
            languageBar.style.color = "#C0C0C0";
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
