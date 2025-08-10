// Classes

// Language

class Language {
    constructor(name, ext, color, whiteText = false,
    shortComment = "//", longComment = ["/*", "*/"]) {
        this.name = name;
        this.ext = ext;
        this.color = color;
        this.whiteText = whiteText;
        this.shortComment = shortComment;
        this.longComment = longComment;
        this.projects = [];
        this.lines = 0;
    }
}

// Project

class Project {
    constructor(name, filePaths) {
        this.name = name;
        this.pathName = name.toLowerCase().replace(" ", "-").replace("--", "-");
        this.filePaths = filePaths;
        this.license = "N/A";
        this.licenseType = "N/A";
        this.languages = [];
        this.linesList = [];
        this.lines = 0;
    }
}


// Data Loader

async function loadData() {

    // Variables

    var python = new Language("Python", "py", "#0000AA", true, "#", []);
    var java = new Language("Java", "java", "#AA0000", true);
    var cSharp = new Language("C#", "cs", "#400070", true);
    var html = new Language("HTML", "html", "#FF4000", false, "None", ["<!--", "-->"]);
    var css = new Language("CSS", "css", "#600090", true);
    var javaScript = new Language("JavaScript", "js", "#FFDD00");
    var languages = [python, java, cSharp, html, css, javaScript];

    var biomeGen = new Project("BiomeGen", ["main.py"]);
    var pwrStatGUI = new Project("PwrStat GUI", ["main.py"]);
    var website = new Project("Website", [
        "index.html", "styles.css", "elements.html",
        "about-me/index.html", "about-me/styles.css",
        "js/data-loader.js", "js/element-loader.js", "js/page-about-me.js", "js/page-projects.js",
        "projects/index.html", "projects/styles.css",
        "projects/archived/index.html", "projects/archived/styles.css",
        "projects/biomegen/index.html",
        "projects/pwrstat-gui/index.html", "projects/pwrstat-gui/styles.css",
        "statistics/index.html", "statistics/styles.css"
    ]);
    var projects = [biomeGen, pwrStatGUI, website];

    // Getting Data on Projects

    try {

        for (let i in projects) {

            var project = projects[i]

            // Project URL Path Name

            var urlName = "https://raw.githubusercontent.com/Liam-Ralph/" + project.pathName +
                "/refs/heads/main/";
            if (project.name === "Website") {
                urlName = "/";
            }

            // Finding Project License

            const response = await fetch(urlName + "LICENSE");

            if (response.ok) {

                const licenseText = await response.text();

                if (licenseText.includes("GNU General Public License")) {
                    project.license = "GPLv3";
                    project.licenseType = "FOSS";
                }

            } else {

                // LICENSE file not found, all rights reserved

                project.license = "Rights Reserved";
                project.licenseType = "Source Available";

            }

            for (let ii in project.filePaths) {

                // Fetch File Contents

                const response = await fetch(urlName + project.filePaths[ii]);
                var fileText = await response.text();

                // Remove Empty Lines and Indentation

                while (fileText.includes("    ")) {
                    fileText = fileText.replace("    ", "");
                }
                while (fileText.includes("\n\n")) {
                    fileText = fileText.replace("\n\n", "\n");
                }
                fileText = fileText.trim();

                // Detect Language

                var fileLanguage;
                for (let iii in languages) {
                    if (languages[iii].ext === project.filePaths[ii].split(".")[1]) {
                        fileLanguage = languages[iii];
                    }
                }

                // Remove Single-Line Comments

                if (fileLanguage.shortComment != "None") {

                    var fileLinesList = fileText.split("\n");

                    for (let iii = 0; iii < fileLinesList.length; iii++) {
                        var line = fileLinesList[iii].trim();
                        if (line.startsWith(fileLanguage.shortComment) || line === "") {
                            fileLinesList.splice(iii, 1);
                            iii--;
                        }
                    }

                    fileText = fileLinesList.join("\n");

                }

                // Remove Multi-Line Comments

                if (fileLanguage.longComment.length === 2) {

                    let result = fileText;

                    while (true) {
                        const startIndex = result.indexOf(fileLanguage.longComment[0]);

                        if (startIndex === -1) {
                            break;
                        }

                        const searchStart = startIndex + fileLanguage.longComment[0].length;
                        const endIndex = result.indexOf(fileLanguage.longComment[1], searchStart);

                        if (endIndex === -1) {
                            result = result.substring(0, startIndex);
                            break;
                        }

                        result = result.substring(0, startIndex) +
                            result.substring(endIndex + fileLanguage.longComment[1].length);
                    }

                    fileText = result;

                }

                // Finish Cleaning File, Calculate Lines

                fileText = fileText.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

                while (fileText.includes("\n\n")) {
                    fileText = fileText.replace("\n\n", "\n");
                }
                fileText = fileText.trim();

                const fileLines = fileText.split("\n").length;

                if (fileLanguage.name === "HTML") {
                    console.log(project.filePaths[ii] + ": " + fileLines);
                }

                // Add Data to Project, Language

                fileLanguage.lines += fileLines;
                project.lines += fileLines;

                if (!fileLanguage.projects.includes(project)) {
                    fileLanguage.projects.push(project);
                }
                if (!project.languages.includes(fileLanguage)) {
                    project.languages.push(fileLanguage);
                    project.linesList.push(0);
                }

                project.linesList[project.languages.indexOf(fileLanguage)] += fileLines;

            }

        }

    } catch (error) {
        console.log(error);
    }

    return [languages, projects];

}

const responses = await loadData();
const languages = responses[0];
const projects = responses[1];
export { languages, projects };
