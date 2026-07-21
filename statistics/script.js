// Start Time

const startTime = new Date();

// Import From Data Loader

import { languages, projects, licenses } from "/data-loader.js";

// Summary Counters

document.getElementById("projects-counter").textContent = projects.length + " Projects";

document.getElementById("languages-counter").textContent = languages.length + " Languages";

let totLines = 0;
for (let i in projects) {
    totLines += projects[i].lines;
}
document.getElementById("loc-counter").textContent = totLines + " Lines of Code";

// Legend

for (let i in languages) {

    const language = languages[i];

    let legendItem = document.createElement("div");
    legendItem.className = "legend-item";
    legendItem.style.backgroundColor = language.color;
    legendItem.textContent = language.name;

    document.getElementById("legend-box").appendChild(legendItem);

}

// Sorting Languages and Projects

let languagesByProjects = languages.slice();

for (let i = 0; i < languagesByProjects.length - 1; i++) {
    for (let ii = 0; ii < languagesByProjects.length - i - 1; ii++) {
        if (languagesByProjects[ii].projects.length < languagesByProjects[ii + 1].projects.length) {
            const temp = languagesByProjects[ii];
            languagesByProjects[ii] = languagesByProjects[ii + 1];
            languagesByProjects[ii + 1] = temp;
        }
    }
}

let languagesByLines = languages.slice();

for (let i = 0; i < languagesByLines.length - 1; i++) {
    for (let ii = 0; ii < languagesByLines.length - i - 1; ii++) {
        if (languagesByLines[ii].lines < languagesByLines[ii + 1].lines) {
            const temp = languagesByLines[ii];
            languagesByLines[ii] = languagesByLines[ii + 1];
            languagesByLines[ii + 1] = temp;
        }
    }
}

let projectsByLines = projects.slice();

for (let i = 0; i < projectsByLines.length - 1; i++) {
    for (let ii = 0; ii < projectsByLines.length - i - 1; ii++) {
        if (projectsByLines[ii].lines < projectsByLines[ii + 1].lines) {
            const temp = projectsByLines[ii];
            projectsByLines[ii] = projectsByLines[ii + 1];
            projectsByLines[ii + 1] = temp;
        }
    }
}

// Projects Bar Chart

let barChart = document.getElementById("projects-bar-chart");
let maxWidth = (barChart.offsetWidth - 60) / projectsByLines[0].lines;

for (let i in projectsByLines) {

    const project = projectsByLines[i];

    let barsContainer = document.createElement("div");
    barsContainer.className = "bars-container";

    for (let ii in project.languages) {

        let bar = document.createElement("div");
        bar.className = "chart-bar";
        if (ii == 0) {
            bar.className = "chart-bar chart-first-bar";
        }
        bar.style.width = (project.linesList[ii] * maxWidth) + "px";
        bar.style.backgroundColor = project.languages[ii].color;
        if (window.innerWidth >= 1500) {
            if (ii == 0) {
                bar.textContent = "  " + project.name + ": " + project.lines +
                    " Lines of Code (" + Math.round(project.lines / totLines * 100) + "%)\n  " +
                    project.linesList[ii] + " LoC (" +
                    Math.round(project.linesList[ii] / project.lines * 100) + "%)";
            } else {
                bar.textContent = "\n  " + project.linesList[ii] + " LoC (" +
                    Math.round(project.linesList[ii] / project.lines * 100) + "%)";
            }
        } else {
            if (ii == 0) {
                bar.textContent = "\n  " + project.name + ": " + project.lines + " LoC";
                bar.style.textAlign = "left";
            }
        }

        barsContainer.appendChild(bar);

    }

    barChart.appendChild(barsContainer);

}

// Licenses Pie Chart

let pieChartBox = document.getElementsByClassName("large-pie-chart")[0];

let pieChart = document.createElement("div");
pieChart.className = "large-pie";
let backgroundImage = "conic-gradient(";
let currentPct = 0;
for (let i in licenses) {
    const licPct = Math.round(licenses[i].projects / projects.length * 100);
    backgroundImage += licenses[i].color + " " + currentPct + "% ";
    currentPct += licPct;
    backgroundImage += currentPct + "%";
    if (i != licenses.length - 1) {
        backgroundImage += ", ";
    }
}
backgroundImage += ")";
pieChart.style.backgroundImage = backgroundImage;

pieChartBox.appendChild(pieChart);

// Licenses Pie Chart Legend

let typeIndex = -1;
let typeNames = ["Free and Open Source Software", "Public, Rights Reserved", "Proprietary"];
let typeColors = ["#00FF00", "#FF8000", "#FF0000"];

for (let i in licenses) {

    const license = licenses[i];

    if (license.type > typeIndex) {

        typeIndex += 1;
        let typeLegend = document.createElement("p");
        typeLegend.className = "legend-category";
        typeLegend.style.color = typeColors[typeIndex];
        typeLegend.textContent = typeNames[typeIndex];
        
        pieChartBox.appendChild(typeLegend);

    }

    let licenseLegend = document.createElement("p");
    licenseLegend.className = "stats-legend";
    licenseLegend.style.backgroundColor = license.color;
    licenseLegend.textContent = license.name + ": " +
        license.projects + " Projects (" +
        Math.round(license.projects / projects.length * 100) + "%)";
    if (license.projects == 1) {
        licenseLegend.textContent = licenseLegend.textContent.replace("Projects", "Project");
    }

    pieChartBox.appendChild(licenseLegend);

}

// Project Tiles

for (let i = projects.length - 1; i >= 0; i--) {

    const project = projects[i];

    if (project.languages.length > 1) {

        // Project Box

        let projectBox = document.createElement("div");
        projectBox.className = "stats-box";

        // Project Title

        let projectTitle = document.createElement("p");
        projectTitle.className = "stats-title";
        projectTitle.textContent = project.name;

        projectBox.appendChild(projectTitle);

        // Project Pie Chart

        let projectPie = document.createElement("div");
        projectPie.className = "stats-pie";
        let backgroundImage = "conic-gradient(";
        let currentPct = 0;
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
        projectPie.style.backgroundImage = backgroundImage;

        projectBox.appendChild(projectPie);

        // Project Pie Chart Legend

        for (let ii in project.languages) {

            const language = project.languages[ii];

            let languageLegend = document.createElement("p");
            languageLegend.className = "stats-legend";
            languageLegend.style.backgroundColor = language.color;
            languageLegend.textContent = language.name + ": " +
                project.linesList[ii] + " LoC (" +
                Math.round(project.linesList[ii] / project.lines * 100) + "%)";

            projectBox.appendChild(languageLegend);

        }

        document.getElementById("projects-tile-container").appendChild(projectBox);

    }

}

// Languages Bar Chart 1

barChart = document.getElementById("languages-bar-chart-1");
maxWidth = (barChart.offsetWidth - 60) / languagesByLines[0].lines;

for (let i in languagesByLines) {

    const language = languagesByLines[i];

    let bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.width = (language.lines * maxWidth) + "px";
    bar.style.backgroundColor = language.color;
    bar.textContent = "  " + language.name + "\n  " +
        language.lines + " LoC (" +
        Math.round(language.lines / totLines * 100) + "%)";

    barChart.appendChild(bar);

}

// Languages Pie Chart

pieChartBox = document.getElementsByClassName("large-pie-chart")[1];

pieChart = document.createElement("div");
pieChart.className = "large-pie";
backgroundImage = "conic-gradient(";
currentPct = 0;
for (let i in languagesByLines) {
    const langPct = Math.round(languagesByLines[i].lines / totLines * 100);
    backgroundImage += languagesByLines[i].color + " " + currentPct + "% ";
    currentPct += langPct;
    backgroundImage += currentPct + "%";
    if (i != languages.length - 1) {
        backgroundImage += ", ";
    }
}
backgroundImage += ")";
pieChart.style.backgroundImage = backgroundImage;

pieChartBox.appendChild(pieChart);

// Languages Bar Chart 2

barChart = document.getElementById("languages-bar-chart-2");
maxWidth = (barChart.offsetWidth - 60) / languagesByProjects[0].projects.length;

for (let i in languagesByProjects) {

    const language = languagesByProjects[i];
    const projectsLength = language.projects.length;

    let bar = document.createElement("div");
    bar.className = "chart-bar";
    bar.style.width = (projectsLength * maxWidth) + "px";
    bar.style.backgroundColor = language.color;
    bar.textContent = "  " + language.name + "\n  " +
        projectsLength + " Projects (" +
        Math.round(projectsLength / projects.length * 100) + "%)";
    if (projectsLength == 1) {
        bar.textContent = bar.textContent.replace("Projects", "Project");
    }

    barChart.appendChild(bar);

}

// Log Script Time

const endTime = new Date();
console.log(
    (endTime - startTime).toString().padStart(5) + "ms " + // script time
    ("/statistics/script.js") // script path
);