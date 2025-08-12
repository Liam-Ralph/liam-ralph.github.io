import { languages, projects } from "/js/data-loader.js"

// Legend

for (let i in languages) {

    const language = languages[i];

    var legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    legendItem.style.backgroundColor = language.color;
    legendItem.textContent = language.name;
    if (language.whiteText) {
        legendItem.style.color = "#C0C0C0";
    }

    document.getElementById("legend-box").appendChild(legendItem);

}

// Sorting Languages and Projects

var languagesByLines = languages.slice();

for (let i = 0; i < languagesByLines.length - 1; i++) {
    for (let ii = 0; ii < languagesByLines.length - i - 1; ii++) {
        if (languagesByLines[ii].lines > languagesByLines[ii + 1].lines) {
            const temp = languagesByLines[ii];
            languagesByLines[ii] = languagesByLines[ii + 1];
            languagesByLines[ii + 1] = temp;
        }
    }
}

var projectsByLines = projects.slice();

for (let i = 0; i < projectsByLines.length - 1; i++) {
    for (let ii = 0; ii < projectsByLines.length - i - 1; ii++) {
        if (projectsByLines[ii].lines < projectsByLines[ii + 1].lines) {
            const temp = projectsByLines[ii];
            projectsByLines[ii] = projectsByLines[ii + 1];
            projectsByLines[ii + 1] = temp;
        }
    }
}

// Projects bar Chart

const barChart = document.getElementById("projects-bar-chart");
const maxWidth = barChart.offsetWidth / projectsByLines[0].lines;

for (let i in projectsByLines) {

    const project = projectsByLines[i];

    var barsContainer = document.createElement("div");
    barsContainer.className = "bars-container";

    for (let ii in project.languages) {

        var bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.width = (project.linesList[ii] * maxWidth) + "px";
        bar.style.backgroundColor = project.languages[ii].color;
        if (window.innerWidth >= 1500) {
            if (ii == 0) {
                bar.textContent = project.name + "\n" +
                    project.linesList[ii] + " LoC (" +
                    Math.round(project.linesList[ii] / project.lines * 100) + "%)";
            } else {
                bar.textContent = "\n" + project.linesList[ii] + " LoC (" +
                    Math.round(project.linesList[ii] / project.lines * 100) + "%)";
            }
        } else {
            if (ii == 0) {
                bar.textContent = "\n\r  " + project.name;
                bar.style.textAlign = "left";
            }
        }
        if (project.languages[ii].whiteText) {
            bar.style.color = "#C0C0C0";
        }

        barsContainer.appendChild(bar);

    }

    barChart.appendChild(barsContainer);

}

// Project Tiles

for (let i = projects.length - 1; i >= 0; i--) {

    const project = projects[i];

    // Project Box

    var projectBox = document.createElement("div");
    projectBox.className = "stats-box";

    // Project Title
    
    var projectTitle = document.createElement("p");
    projectTitle.className = "stats-title";
    projectTitle.textContent = project.name;

    projectBox.appendChild(projectTitle);

    // Project Pie Chart

    var projectPie = document.createElement("div");
    projectPie.className = "stats-pie";
    var backgroundImage = "conic-gradient(";
    var currentPct = 0;
    for (let ii in project.languages) {
        const langPct = Math.round(project.linesList[ii] / project.lines * 100);
        backgroundImage += project.languages[ii].color + " " + currentPct + "% ";
        currentPct += langPct;
        backgroundImage += currentPct + "%";
        if (ii != project.languages.length - 1) {
            backgroundImage += ", ";
        }
    }
    backgroundImage += ")";
    projectPie.style.backgroundImage = backgroundImage

    projectBox.appendChild(projectPie);

    // Project Pie Chart Legend

    for (let ii in project.languages) {

        const language = project.languages[ii];
        
        var projectLegend = document.createElement("p");
        projectLegend.className = "stats-legend";
        projectLegend.style.backgroundColor = language.color;
        if (language.whiteText) {
            projectLegend.style.color = "#C0C0C0"
        }
        projectLegend.textContent = language.name + ": " +
            project.linesList[ii] + " LoC (" +
            Math.round(project.linesList[ii] / project.lines * 100) + "%)";

        projectBox.appendChild(projectLegend);

    }

    document.getElementById("projects-tile-container").appendChild(projectBox);

}
