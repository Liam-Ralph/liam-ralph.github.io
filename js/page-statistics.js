import { languages, projects } from "/js/data-loader.js"

// Sorting Languages and Projects

var languagesByLines = languages.slice();

for (let i = 0; i < languagesByLines.length - 1; i++) {
    for (let ii = 0; ii < languagesByLines.length - i - 1; ii++){
        if (languagesByLines[ii].lines > languagesByLines[ii + 1].lines){
            const temp = languagesByLines[ii];
            languagesByLines[ii] = languagesByLines[ii + 1];
            languagesByLines[ii + 1] = temp;
        }
    }
}

var projectsByLines = projects.slice();

for (let i = 0; i < projectsByLines.length - 1; i++) {
    for (let ii = 0; ii < projectsByLines.length - i - 1; ii++){
        if (projectsByLines[ii].lines < projectsByLines[ii + 1].lines){
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

    var barHeader = document.createElement("p");
    barHeader.className = "bar-header";
    barHeader.textContent = project.name + ": " + project.lines + " Lines of Code";

    var barsContainer = document.createElement("div");
    barsContainer.className = "bars-container";

    for (let ii in project.languages) {

        var bar = document.createElement("div");
        bar.className = "chart-bar";
        bar.style.width = (project.linesList[ii] * maxWidth) + "px";
        bar.style.backgroundColor = project.languages[ii].color;
        bar.textContent = project.languages[ii].name + ": " +
            project.linesList[ii] + " Lines (" +
            Math.round(project.linesList[ii] / project.lines * 100) + "%)";
        if (project.languages[ii].whiteText) {
            bar.style.color = "#C0C0C0";
        }

        barsContainer.appendChild(bar);

    }

    barChart.appendChild(barHeader);
    barChart.appendChild(barsContainer);

}