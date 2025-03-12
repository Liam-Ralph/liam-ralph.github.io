// Project Class

class Project {
    constructor(name, date, tags, languages) {
        this.name = name;
        this.creationDate = date;
        this.tags = tags;
        this.languages = languages;
    }
}


// Creating Projects

var projects = [];

fetch("/data/project-data.txt")
    .then((res) => res.text())
    .then((text) => {

        /* var splitText = text.split("-".repeat(30));
        for (var i = 0; i < splitText.length; i++) {

            var projectRaw = splitText[i].trim().split("\n");
            var dateRaw = projectRaw[1].split("-");
            var date = [
                "January", "February", "March", "April", "May", "June", "July",
                "August", "September", "October", "November", "December"
            ][parseInt(dateRaw[1]) - 1] + " " + dateRaw[0];
            var languagesRaw = projectRaw.slice(3);
            var languages = [];
            for (var ii = 0; ii < languagesRaw.length; ii++) {
                var languageRaw = languagesRaw[ii].split("|");
                languages.push([languageRaw[0].trim(), parseInt(languageRaw[1])]);
            }

            projects.push(new Project(projectRaw[0], date, projectRaw[2].split(", "), languages));

            console.log(projects[i].name);
            console.log(projects[i].creationDate);
            for (var ii = 0; ii < projects[i].tags.length; ii++) {
                console.log(projects[i].tags[ii]);
            }
            for (var ii = 0; ii < projects[i].languages.length; ii++) {
                console.log(projects[i].languages[ii][0] + ":" + projects[i].languages[ii][1]);
            }
            console.log();

        } */

    })
    .catch((e) => console.error(e));