import { projects } from "/data-loader.js";


// Test Result Class

class TestResult {
    constructor(
        version, width, height, processes, reps,
        mean, std_dev, pix_per_sec, pct5, pct25, pct50, pct75, pct95
    ){
        this.version = version;
        this.width = width;
        this.height = height;
        this.processes = processes;
        this.reps = reps;
        this.mean = mean;
        this.std_dev = std_dev;
        this.pix_per_sec = pix_per_sec;
        this.percentiles = [pct5, pct25, pct50, pct75, pct95];
    }
}


// C Rerwite Progress Bar

// Getting Number of Lines Left

var urlName =
    "https://raw.githubusercontent.com/Liam-Ralph/biomegen/refs/heads/c-rewrite/main_left.txt";
var response = await fetch(urlName);
const fileText = await response.text();
const linesLeft = fileText.split("\n").length;

// Calculating Progress Percentage

const linesTotal = projects[0].linesList[0];
const progress = (linesTotal - linesLeft) / linesTotal;

// Updating Progress bar

var barInner = document.getElementById("c-rewrite-progress-bar-inner");
barInner.textContent =
    "C Rewrite Progress: " + Math.round(progress * 1000) / 10 + "%";
barInner.style.width =
    (document.getElementById("c-rewrite-progress-bar").offsetWidth * progress - 20) + "px";


// Statistics

// Getting CSV Data

urlName = "https://raw.githubusercontent.com/Liam-Ralph/biomegen/refs/heads/main/autorun_results.csv";
response = await fetch(urlName);
const csvLines = await response.text()
var csvTextLines = csvLines.split("\n");
csvTextLines = csvTextLines.splice(1, csvTextLines.length - 1);
for(let i in csvTextLines) {
    console.log(csvTextLines[i]);
}

// Creating Test Results

var testResults = [];

for (let i in csvTextLines) {
   var textLine = csvTextLines[i].split(", ");
    testResults.push(
        new TestResult(
            textLine[0], Number(textLine[1]), Number(textLine[2]), // version, width, height
            Number(textLine[3]), Number(textLine[4]), // processes, reps
            Number(textLine[5]), Number(textLine[6]), // mean, standard_deviation
            Number(textLine[7]), // pixels per second
            Number(textLine[8]), Number(textLine[9]), // 5th and 25th percentiles
            Number(textLine[10]), Number(textLine[11]), Number(textLine[12]) // 50th, 75th, 95th
        )
    );
}

// Getting Graph Values

var xValues = {
    "Version vs Time": [],
    "Version vs Pix Per Sec": [],
    "Version vs Std Dev": [],
    "Version vs Std Dev Pct": [],
    "Resolution vs Time": [],
    "Pixels vs Time": [],
    "Resolution vs Pix Per Sec": [],
    "Pixels vs Pix Per Sec": [],
    "Processes vs Time": [],
    "Processes vs Pix Per Sec": []
};
var yValues = {
    "Version vs Time": [],
    "Version vs Pix Per Sec": [],
    "Version vs Std Dev": [],
    "Version vs Std Dev Pct": [],
    "Resolution vs Time": [],
    "Pixels vs Time": [],
    "Resolution vs Pix Per Sec": [],
    "Pixels vs Pix Per Sec": [],
    "Processes vs Time": [],
    "Processes vs Pix Per Sec": []
};

for (let i in testResults) {

    var result = testResults[i];

}

// Version vs Time at 1080p



/* Graphs

version vs time at 1080p (mean, median, 5th + 95th percentiles)
version vs pix_per_sec (one line for each resolution)
version vs std_dev
version vs std_dev / resolution (one line for each resolution)

resolution vs time (mean, median, etc.)
pixels vs time (mean, median, etc.)
resolution vs pix_per_sec
pixels vs pix_per_sec

processes vs time at 1080p (mean, median, etc.)
processes vs pix_per_sec (one line for each resolution)

*/