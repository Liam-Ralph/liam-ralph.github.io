// Start Time

const startTime = new Date();

// Test Result Class

class TestResult {
    constructor(version, width, height, processes, mean, pixPerSec, pct5, pct50, pct95){
        this.version = version;
        this.width = width;
        this.height = height;
        this.processes = processes;
        this.mean = mean;
        this.pixPerSec = pixPerSec;
        this.pct5 = pct5;
        this.pct50 = pct50;
        this.pct95 = pct95;
    }
}


// Statistics

// Creating Empty Graph Value Lists

let xValues = {
    "Version": [],
    "Resolution": ["1920x1080", "2560x1440", "3840x2160", "7680x4320", "10000x10000"],
    "Pixels": [2073600, 3686400, 8294400, 33177600, 100000000],
    "Processes": []
};
let yValues = {
    "Version vs Time": [[], [], [], []], // mean, 5th pct, 50th pct, 95th pct
    "Version vs Pix Per Sec": [[], [], [], [], []], // 1080p, 1440p, 4K, 8K, 10K
    "Resolution vs Time": [[], [], [], []],
    "Pixels vs Time": [[], [], [], []],
    "Resolution vs Pix Per Sec": [],
    "Pixels vs Pix Per Sec": [],
    "Processes vs Time": [[], [], [], []],
    "Processes vs Pix Per Sec": [[], [], [], [], []]
};

// Attempting to Read Cookie

import { readCookie } from "/global-functions.js";
let cookie = readCookie("biomegen-graphs");

if (cookie != "") {

    let cookieSections = cookie.split("_");

    // Get Graph X Values

    xValues["Version"] = cookieSections[0].split("-");
    let processesRaw = cookieSections[1].split("-");
    for (let i in processesRaw) {
        xValues["Processes"][i] = processesRaw[i];
    }

    // Get Graph Y Values

    const numVersions = xValues["Version"].length;
    const numResolutions = xValues["Resolution"].length;
    const numProcesses = xValues["Processes"].length;

    let yValuesCookie = cookieSections[2].split("-");
    for (let i in yValuesCookie){
        yValuesCookie[i] = parseFloat(yValuesCookie[i]);
    }
    let index = 0;


    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numVersions; ii++) {
            yValues["Version vs Time"][i][ii] = yValuesCookie[index++];
        }
    }
    for (let i = 0; i < numResolutions; i++) {
        for (let ii = 0; ii < numVersions; ii++) {
            yValues["Version vs Pix Per Sec"][i][ii] = yValuesCookie[index++];
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numResolutions; ii++) {
            yValues["Resolution vs Time"][i][ii] = yValuesCookie[index++];
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numResolutions; ii++) {
            yValues["Pixels vs Time"][i][ii] = yValuesCookie[index++];
        }
    }
    for (let i = 0; i < numResolutions; i++) {
        yValues["Resolution vs Pix Per Sec"][i] = yValuesCookie[index++];
    }
    for (let i = 0; i < numResolutions; i++) {
        yValues["Pixels vs Pix Per Sec"][i] = yValuesCookie[index++];
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numProcesses; ii++) {
            yValues["Processes vs Time"][i][ii] = yValuesCookie[index++];
        }
    }
    for (let i = 0; i < numResolutions; i++) {
        for (let ii = 0; ii < numProcesses; ii++) {
            yValues["Processes vs Pix Per Sec"][i][ii] = yValuesCookie[index++];
        }
    }

} else {

    // Getting CSV Data

    let urlName =
        "https://raw.githubusercontent.com/Liam-Ralph/biomegen/refs/heads/main/autorun_results.csv";
    let response = await fetch(urlName);
    const csvLines = await response.text();
    let csvTextLines = csvLines.trim().split("\n");
    csvTextLines = csvTextLines.splice(1, csvTextLines.length - 1);

    // Creating Test Results

    let testResults = [];

    for (let i in csvTextLines) {
        let textLine = csvTextLines[i].split(", ");
        testResults.push(
            new TestResult(
                textLine[0], Number(textLine[1]), Number(textLine[2]), // version, width, height
                Number(textLine[3]), // processes (reps ignored)
                Number(textLine[5]), Number(textLine[7]),
                // mean (standard deviation ignored), pixels per second
                Number(textLine[8]), Number(textLine[10]), Number(textLine[12])
                // 5th, 50th, and 95th percentiles (25th and 75th ignored)
            )
        );
    }

    const newestVersion = testResults[testResults.length - 1].version;

    let bestProcesses = {1920: 8, 2560: 8, 3840: 8, 7680: 8, 10000: 8};
    let result8 = 0;
    for (let i in testResults) {
        let result = testResults[i];
        if (result.version == newestVersion) {
            if (result.processes == 8) {
                result8 = result.mean;
            } else if (result.processes == 16 && result.mean < result8) {
                bestProcesses[result.width] = 16;
            }
        }
    }

    // Getting Graph Values

    const resolutions = [1920, 2560, 3840, 7680, 10000];

    for (let i in testResults) {

        let result = testResults[i];

        // Not in order

        if (
            result.version != newestVersion ||
            (result.version == newestVersion && (bestProcesses[result.width] == result.processes))
        ) {

            let index = resolutions.indexOf(result.width);

            if (index == 0) {

                xValues["Version"].push(result.version);

                yValues["Version vs Time"][0].push(result.mean);
                yValues["Version vs Time"][1].push(result.pct5);
                yValues["Version vs Time"][2].push(result.pct50);
                yValues["Version vs Time"][3].push(result.pct95);

            }

            yValues["Version vs Pix Per Sec"][index].push(result.pixPerSec);

            if (result.version == newestVersion) {

                yValues["Resolution vs Time"][0].push(result.mean);
                yValues["Resolution vs Time"][1].push(result.pct5);
                yValues["Resolution vs Time"][2].push(result.pct50);
                yValues["Resolution vs Time"][3].push(result.pct95);

                yValues["Pixels vs Time"][0].push(result.mean);
                yValues["Pixels vs Time"][1].push(result.pct5);
                yValues["Pixels vs Time"][2].push(result.pct50);
                yValues["Pixels vs Time"][3].push(result.pct95);

                yValues["Resolution vs Pix Per Sec"].push(result.pixPerSec);

                yValues["Pixels vs Pix Per Sec"].push(result.pixPerSec);

            }

        }

        if (result.version == newestVersion) {

            let index = resolutions.indexOf(result.width);

            if (index == 0) {

                xValues["Processes"].push(result.processes.toString());

                yValues["Processes vs Time"][0].push(result.mean);
                yValues["Processes vs Time"][1].push(result.pct5);
                yValues["Processes vs Time"][2].push(result.pct50);
                yValues["Processes vs Time"][3].push(result.pct95);

            }

            yValues["Processes vs Pix Per Sec"][index].push(result.pixPerSec);

        }

    }

    // Create BiomeGen Graphs Cookie

    const numVersions = xValues["Version"].length;
    const numResolutions = xValues["Resolution"].length;
    const numProcesses = xValues["Processes"].length;

    let cookie = "";

    for (let i = 0; i < numVersions; i++) {
        cookie += xValues["Version"][i];
        if (i != numVersions - 1) {
            cookie += "-";
        }
    }
    cookie += "_";

    for (let i = 0; i < numProcesses; i++) {
        cookie += xValues["Processes"][i].toString();
        if (i != numProcesses - 1) {
            cookie += "-";
        }
    }
    cookie += "_";

    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numVersions; ii++) {
            cookie += yValues["Version vs Time"][i][ii] + "-";
        }
    }
    for (let i = 0; i < numResolutions; i++) {
        for (let ii = 0; ii < numVersions; ii++) {
            cookie += yValues["Version vs Pix Per Sec"][i][ii] + "-";
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numResolutions; ii++) {
            cookie += yValues["Resolution vs Time"][i][ii] + "-";
        }
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numResolutions; ii++) {
            cookie += yValues["Pixels vs Time"][i][ii] + "-";
        }
    }
    for (let i = 0; i < numResolutions; i++) {
        cookie += yValues["Resolution vs Pix Per Sec"][i] + "-";
    }
    for (let i = 0; i < numResolutions; i++) {
        cookie += yValues["Pixels vs Pix Per Sec"][i] + "-";
    }
    for (let i = 0; i < 4; i++) {
        for (let ii = 0; ii < numProcesses; ii++) {
            cookie += yValues["Processes vs Time"][i][ii] + "-";
        }
    }
    for (let i = 0; i < numResolutions; i++) {
        for (let ii = 0; ii < numProcesses; ii++) {
            cookie += yValues["Processes vs Pix Per Sec"][i][ii];
            if (i != numResolutions - 1 || ii != numProcesses - 1) {
                cookie += "-";
            }
        }
    }

    document.cookie = `biomegen-graphs=${cookie}; path=/;`;

}

// Creating Graphs

// Version vs Time

let graph = document.getElementById("graph-version-time");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Version"],
        datasets: [
            {
                label: "5th Percentile",
                backgroundColor: "#808080",
                borderColor: "#808080",
                data: yValues["Version vs Time"][1]
            },
            {
                label: "Mean",
                backgroundColor: "#0000FF",
                borderColor: "#0000FF",
                data: yValues["Version vs Time"][0]
            },
            {
                label: "50th Percentile",
                backgroundColor: "#00FF00",
                borderColor: "#00FF00",
                data: yValues["Version vs Time"][2]
            },
            {
                label: "95th Percentile",
                backgroundColor: "#808080",
                borderColor: "#808080",
                data: yValues["Version vs Time"][3]
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Version vs Time",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"},
                min: 0
            }
        }
    }
});

// Version vs Pixels per Second

graph = document.getElementById("graph-version-pix_per_sec");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Version"],
        datasets: [
            {
                label: "1080p",
                data: yValues["Version vs Pix Per Sec"][0]
            },
            {
                label: "1440p",
                data: yValues["Version vs Pix Per Sec"][1]
            },
            {
                label: "4K",
                data: yValues["Version vs Pix Per Sec"][2]
            },
            {
                label: "8K",
                data: yValues["Version vs Pix Per Sec"][3]
            },
            {
                label: "10K x 10K",
                data: yValues["Version vs Pix Per Sec"][4]
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Version vs Pixels per Second",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"},
                min: 0
            }
        }
    }
});

// Resolution vs Time

graph = document.getElementById("graph-resolution-time");

new Chart(graph, {
    type: "bar",
    data: {
        labels: xValues["Resolution"],
        datasets: [
            {
                label: "5th Percentile",
                backgroundColor: "#808080",
                data: yValues["Resolution vs Time"][1]
            },
            {
                label: "Mean",
                backgroundColor: "#0000FF",
                data: yValues["Resolution vs Time"][0]
            },
            {
                label: "50th Percentile",
                backgroundColor: "#00FF00",
                data: yValues["Resolution vs Time"][2]
            },
            {
                label: "95th Percentile",
                backgroundColor: "#808080",
                data: yValues["Resolution vs Time"][3]
            },
        ]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Resolution vs Time",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"}
            }
        }
    }
});

// Pixels vs Time

graph = document.getElementById("graph-pixels-time");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Pixels"],
        datasets: [
            {
                label: "5th Percentile",
                borderColor: "#808080",
                data: yValues["Resolution vs Time"][1]
            },
            {
                label: "Mean",
                borderColor: "#0000FF",
                data: yValues["Resolution vs Time"][0]
            },
            {
                label: "50th Percentile",
                borderColor: "#00FF00",
                data: yValues["Resolution vs Time"][2]
            },
            {
                label: "95th Percentile",
                borderColor: "#808080",
                data: yValues["Resolution vs Time"][3]
            },
        ]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Pixels vs Time",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                type: "linear",
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"},
                min: 0
            }
        }
    }
});

// Resolution vs Pixels per Second

graph = document.getElementById("graph-resolution-pix_per_sec");

new Chart(graph, {
    type: "bar",
    data: {
        labels: xValues["Resolution"],
        datasets: [
            {
                data: yValues["Resolution vs Pix Per Sec"]
            },
        ]
    },
    options: {
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: "Resolution vs Pixels per Second",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"}
            }
        }
    }
});

// Pixels vs Pixels per Second

graph = document.getElementById("graph-pixels-pix_per_sec");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Pixels"],
        datasets: [
            {
                data: yValues["Resolution vs Pix Per Sec"]
            }
        ]
    },
    options: {
        plugins: {
            legend: {display: false},
            title: {
                display: true,
                text: "Pixels vs Pixels per Second",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                type: "linear",
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"},
                min: 0
            }
        }
    }
});

// Processes vs Time

graph = document.getElementById("graph-processes-time");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Processes"],
        datasets: [
            {
                label: "5th Percentile",
                borderColor: "#808080",
                data: yValues["Processes vs Time"][1]
            },
            {
                label: "Mean",
                borderColor: "#0000FF",
                data: yValues["Processes vs Time"][0]
            },
            {
                label: "50th Percentile",
                borderColor: "#00FF00",
                data: yValues["Processes vs Time"][2]
            },
            {
                label: "95th Percentile",
                borderColor: "#808080",
                data: yValues["Processes vs Time"][3]
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Processes vs Time",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"},
                min: 0
            }
        }
    }
});

// Processes vs Pixels per Second

graph = document.getElementById("graph-processes-pix_per_sec");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Processes"],
        datasets: [
            {
                label: "1080p",
                data: yValues["Processes vs Pix Per Sec"][0]
            },
            {
                label: "1440p",
                data: yValues["Processes vs Pix Per Sec"][1]
            },
            {
                label: "4K",
                data: yValues["Processes vs Pix Per Sec"][2]
            },
            {
                label: "8K",
                data: yValues["Processes vs Pix Per Sec"][3]
            },
            {
                label: "10K x 10K",
                data: yValues["Processes vs Pix Per Sec"][4]
            }
        ]
    },
    options: {
        plugins: {
            legend: {
                display: true,
                position: "bottom",
            },
            title: {
                display: true,
                text: "Processes vs Pixels per Second",
                font: {size: 26}
            }
        },
        scales: {
            x: {
                grid: {color: "#606060"}
            },
            y: {
                grid: {color: "#606060"},
                min: 0
            }
        }
    }
});

// Log Script Time

const endTime = new Date();
console.log(
    (endTime - startTime).toString().padStart(5) + "ms " + // script time
    ("/projects/biomegen/script.js: ") // script path
);