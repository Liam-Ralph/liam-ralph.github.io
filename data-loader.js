// Classes

// Language

class Language {
    constructor(name, ext, color, shortComment = "//", longComment = ["/*", "*/"]) {
        this.name = name;
        this.ext = ext;
        this.color = color;
        this.shortComment = shortComment;
        this.longComment = longComment;
        this.projects = [];
        this.lines = 0;
    }
}

// Project

class Project {
    constructor(name, tagline, filePaths) {
        this.name = name;
        this.pathName = name.toLowerCase().replace(" ", "-").replace("--", "-");
        this.tagline = tagline;
        this.filePaths = filePaths;
        this.license = null;
        this.releaseDate = "Unknown Date";
        this.version = "1.0.0";
        this.languages = [];
        this.linesList = [];
        this.lines = 0;
    }
}

// Project License

class License {
    constructor(name, shortName, type, color) {
        this.name = name;
        this.shortName = shortName;
        this.type = type;
        /*
        1 - Free and Open Source Software
        2 - Public, Rights Reserved
        3 - Proprietary
        */
        this.color = color;
        this.projects = 0;
    }
}


// Data Loader

async function loadData() {

    // Languages

    var python = new Language("Python", "py", "#0000AA", "#", []);
    // var java = new Language("Java", "java", "#AA0000");
    var html = new Language("HTML", "html", "#DD4000", "None", ["<!--", "-->"]);
    var css = new Language("CSS", "css", "#600090");
    var javaScript = new Language("JavaScript", "js", "#DDAA00");
    var c = new Language("C", "c", "#050520");
    // var cpp = new Language("C++", "cpp", "#101040");
    // var cSharp = new Language("C#", "cs", "#151560");
    var languages = [python, html, css, javaScript, c];

    // Projects

    var biomeGen = new Project("BiomeGen", "A map generation and visualization tool.",
        ["main.py", "autorun.c"]);
    var pwrStatGUI =
        new Project("PwrStat GUI", "An app for viewing CyberPower UPS info.", ["main.py"]);
    var website = new Project("Website", "My personal website and project showcase.",
    [
        "index.html", "styles.css", "elements.html",
        "data-loader.js", "element-loader.js",
        "about-me/index.html", "about-me/styles.css", "about-me/script.js",
        "projects/index.html", "projects/styles.css", "projects/script.js",
        "projects/archived/index.html", "projects/archived/styles.css",
        "projects/biomegen/index.html", "projects/biomegen/styles.css",
        "projects/biomegen/script.js",
        "projects/pwrstat-gui/index.html",
        "projects/website/index.html",
        "statistics/index.html", "statistics/styles.css", "statistics/script.js"
    ]);
    var projects = [biomeGen, pwrStatGUI, website];

    // Licenses

    // var expat = new License("Expat/MIT License", "Expat", 0, "#00AA00");
    var gpl3 = new License("GNU General Public License v3.0", "GPLv3", 0, "#008000");
    var rightsReserved = new License("All Rights Reserved", "Rights Reserved", 1, "#DD8000");
    // var proprietary = new License("Proprietary", "Proprietary", 2, "#800000");
    var licenses = [gpl3, rightsReserved];

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

            var response = await fetch(urlName + "LICENSE");

            if (response.ok) {

                const licenseText = await response.text();

                if (licenseText.includes("GNU General Public License")) {
                    project.license = gpl3;
                }

            } else {

                project.license = rightsReserved;

            }

            project.license.projects += 1;

            // Finding Project Release Date and Version

            response = await fetch(urlName + "README.md");

            if (response.ok) {

                const readmeLines = (await response.text()).split("\n");

                for (let iii in readmeLines) {

                    if (readmeLines[iii].startsWith("### Released ")) {
                        project.releaseDate =
                            readmeLines[iii].replace("### Released ", "").replace(" (planned)", "");
                    } else if (readmeLines[iii].startsWith("### Version ")) {
                        project.version = readmeLines[iii].replace("### Version ", "");
                        break;
                    }

                }

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

            // Sort Project Languages

            var numLangs = project.languages.length

            for (let ii = 0; ii < numLangs - 1; ii++) {

                var swapped = false;

                for (let iii = 0; iii < numLangs - ii - 1; iii++) {

                    if (project.linesList[iii] < project.linesList[iii + 1]) {

                        var temp = project.languages[iii];
                        project.languages[iii] = project.languages[iii + 1];
                        project.languages[iii + 1] = temp;

                        temp = project.linesList[iii];
                        project.linesList[iii] = project.linesList[iii + 1];
                        project.linesList[iii + 1] = temp;

                        swapped = true;

                    }
                }

                if (!swapped) {
                    break;
                }

            }

        }

        // Sort Languages

        var numLangs = languages.length;

        for (let i = 0; i < numLangs - 1; i++) {

            var swapped = false;

            for (let ii = 0; ii < numLangs - i - 1; ii++) {

                if (languages[ii].lines < languages[ii + 1].lines) {

                    const temp = languages[ii];
                    languages[ii] = languages[ii + 1];
                    languages[ii + 1] = temp;

                    swapped = true;

                }
            }

            if (!swapped) {
                break;
            }

        }

    } catch (error) {
        console.log(error);
    }

    return [languages, projects, licenses];

}

// Start Time

const startTime = new Date();

// Load Data

const responses = await loadData();
const languages = responses[0];
const projects = responses[1];
const licenses = responses[2];

// Export Data

export { languages, projects, licenses };

// Log Script Time

console.log(
    ("/data-loader.js: ").padEnd(35) + // script path
    (new Date() - startTime).toString().padStart(4) + "ms" // path
);