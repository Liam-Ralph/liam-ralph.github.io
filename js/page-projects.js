import { projects } from "./data-loader.js";

const pinned_project_names = ["PwrStat GUI"];

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

    // Append Children
    document.getElementById("section-recent").appendChild(projectBox);
    if (pinned_project_names.includes(project.name)) {
        document.getElementById("section-pinned").appendChild(projectBox.cloneNode(true));
    }

}

document.getElementById("projects-counter").textContent = projects.length + " Projects";
