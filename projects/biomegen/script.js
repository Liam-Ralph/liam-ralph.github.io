import { projects } from "/data-loader.js";


// Test Result Class

class TestResult {
    constructor(version, width, height, processes, mean, std_dev, pix_per_sec, pct5, pct50, pct95){
        this.version = version;
        this.width = width;
        this.height = height;
        this.processes = processes;
        this.mean = mean;
        this.std_dev = std_dev;
        this.pix_per_sec = pix_per_sec;
        this.pct5 = pct5;
        this.pct50 = pct50;
        this.pct95 = pct95;
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

// Creating Test Results

var testResults = [];

for (let i in csvTextLines) {
   var textLine = csvTextLines[i].split(", ");
    testResults.push(
        new TestResult(
            textLine[0], Number(textLine[1]), Number(textLine[2]), // version, width, height
            Number(textLine[3]), // processes (reps ignored)
            Number(textLine[5]), Number(textLine[6]), // mean, standard_deviation
            Number(textLine[7]), // pixels per second
            Number(textLine[8]), Number(textLine[10]), Number(textLine[12])
            // 5th, 50th, and 95th percentiles (25th and 75th ignored)
        )
    );
}

// Getting Graph Values

var xValues = {
    "Version vs Time": [],
    "Version vs Pix Per Sec": [],
    "Version vs Std Dev": [],
    "Resolution vs Time": [],
    "Pixels vs Time": [],
    "Resolution vs Pix Per Sec": [],
    "Pixels vs Pix Per Sec": [],
    "Processes vs Time": [],
    "Processes vs Pix Per Sec": [],
    "Processes vs Std Dev": []
};
var yValues = {
    "Version vs Time": [[], [], [], []], // mean, 5th pct, 50th pct, 95th pct
    "Version vs Pix Per Sec": [[], [], []], // 1080p, 1440p, 4K
    "Version vs Std Dev": [[], [], []],
    "Resolution vs Time": [[], [], [], []],
    "Pixels vs Time": [[], [], [], []],
    "Resolution vs Pix Per Sec": [],
    "Pixels vs Pix Per Sec": [],
    "Processes vs Time": [[], [], [], []],
    "Processes vs Pix Per Sec": [[], [], []],
    "Processes vs Std Dev": [[], [], []]
};

for (let i in testResults) {

    var result = testResults[i];

    // Not in order

    if (result.processes === 8) {

        var index = 0;

        switch (result.width) {

            case 1920:

                xValues["Version vs Time"].push(result.version);
                yValues["Version vs Time"][0].push(result.mean);
                yValues["Version vs Time"][1].push(result.pct5);
                yValues["Version vs Time"][2].push(result.pct50);
                yValues["Version vs Time"][3].push(result.pct95);

                xValues["Version vs Pix Per Sec"].push(result.version);

                xValues["Version vs Std Dev"].push(result.version);

                break;

            case 2560:

                index = 1;

                break;

            case 3840:

                index = 2;

                break;

        }

        yValues["Version vs Pix Per Sec"][index].push(result.mean);

        yValues["Version vs Std Dev"][index].push(
            result.std_dev / (result.width * result.height)
        );

        if (result.version === testResults[0].version) {



        }

    }


}



/* Graphs

version vs time at 1080p (mean, median, 5th + 95th percentiles)
version vs pix_per_sec (one line for each resolution)
version vs std_dev / pixels (one line for each resolution)

resolution vs time (mean, median, etc.)
pixels vs time (mean, median, etc.)
resolution vs pix_per_sec
pixels vs pix_per_sec

processes vs time at 1080p (mean, median, etc.)
processes vs pix_per_sec (one line for each resolution)
processes vs std_dev (one line for each resolution)

*/