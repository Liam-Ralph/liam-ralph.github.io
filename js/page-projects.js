import { projects } from "./data-loader.js";

const pinned_project_names = ["PwrStat GUI"];

for (let i in projects) {

    const project = projects[i];

    // Project Box

    var projectBox = document.createElement("div");
    projectBox.className = "project-box";

    // Project Logo

    var projectLogo = document.createElement("img");
    projectLogo.className = "project-logo";
    if (project.name === "Website") {
        projectLogo.src = "/images/project-logos/website.png";
    } else {
        projectLogo.src = "/images/project-logos/" + project.pathName + ".png";
    }
    projectLogo.alt = project.name + " Logo";

    // Append Children

    projectBox.appendChild(projectLogo);
    document.getElementById("section-recent").appendChild(projectBox);
    if (pinned_project_names.includes(project.name)) {
        document.getElementById("section-pinned").appendChild(projectBox.cloneNode(true));
    }

}
