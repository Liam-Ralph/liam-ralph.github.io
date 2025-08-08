import { projects } from "./data-loader.js";

const pinned_project_names = ["PwrStat GUI"];

for (let i in projects) {

    const project = projects[i];

    // Project Box

    var projectBox = document.createElement("div");
    projectBox.className = "project-box";

    // Project Link

    var projectLink = document.createElement("a");
    if (project.name === "Website") {
        projectLink.href = "/projects/website";
    } else {
        projectLink.href = "/projects/" + project.pathName;
    }

    // Project Logo

    var projectLogo = document.createElement("img");
    projectLogo.className = "project-logo";
    if (project.name === "Website") {
        projectLogo.src = "/images/project-logos/website.png";
    } else {
        projectLogo.src = "/images/project-logos/" + project.pathName + ".png";
    }
    projectLogo.alt = project.name + " Logo";

    // Project Title

    var projectTitle = document.createElement("p");
    projectTitle.className = "project-title offwhite-hover";
    projectTitle.textContent = project.name;

    projectLink.appendChild(projectLogo);
    projectLink.appendChild(projectTitle);
    projectBox.appendChild(projectLink);

    // Project Tags

    var projectTags = [];

    var projectTagLang = document.createElement("p");
    projectTagLang.className = "project-tag";
    projectTagLang.textContent = project.languages[0].name;
    projectTagLang.style.backgroundColor = project.languages[0].color;
    projectTags.push(projectTagLang);

    for (let i in projectTags) {
        projectBox.appendChild(projectTags[i]);
    }

    // Append Children
    document.getElementById("section-recent").appendChild(projectBox);
    if (pinned_project_names.includes(project.name)) {
        document.getElementById("section-pinned").appendChild(projectBox.cloneNode(true));
    }

}
