// Start Time

const startTime = new Date();

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


// Statistics

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
            Number(textLine[5]), Number(textLine[6]), // mean, standard_deviation
            Number(textLine[7]), // pixels per second
            Number(textLine[8]), Number(textLine[10]), Number(textLine[12])
            // 5th, 50th, and 95th percentiles (25th and 75th ignored)
        )
    );
}

const newestVersion = testResults[testResults.length - 1].version;

// Getting Graph Values

let xValues = {
    "Version": [],
    "Resolution": [],
    "Pixels": [],
    "Processes": []
};
let yValues = {
    "Version vs Time": [[], [], [], []], // mean, 5th pct, 50th pct, 95th pct
    "Version vs Pix Per Sec": [[], [], [], [], []], // 1080p, 1440p, 4K
    "Version vs Std Dev": [[], [], [], [], []],
    "Resolution vs Time": [[], [], [], []],
    "Pixels vs Time": [[], [], [], []],
    "Resolution vs Pix Per Sec": [],
    "Pixels vs Pix Per Sec": [],
    "Processes vs Time": [[], [], [], []],
    "Processes vs Pix Per Sec": [[], [], [], [], []],
    "Processes vs Std Dev": [[], [], [], [], []]
};

for (let i in testResults) {

    let result = testResults[i];

    // Not in order

    if (
        (result.version != "3.0.1" && result.processes === 8) ||
        (result.version === "3.0.1" && result.processes === 16)
    ) {

        let index = 0;

        switch (result.width) {

            case 1920:

                xValues["Version"].push(result.version);

                yValues["Version vs Time"][0].push(result.mean);
                yValues["Version vs Time"][1].push(result.pct5);
                yValues["Version vs Time"][2].push(result.pct50);
                yValues["Version vs Time"][3].push(result.pct95);

                break;

            case 2560:

                index = 1;

                break;

            case 3840:

                index = 2;

                break;

            case 7680:

                index = 3;

                break;

            case 10000:

                index = 4;

                break;

        }

        yValues["Version vs Pix Per Sec"][index].push(result.pix_per_sec);

        yValues["Version vs Std Dev"][index].push(
            result.std_dev / result.mean * 100
        );

        if (result.version === newestVersion) {

            xValues["Resolution"].push(result.width + "x" + result.height);
            xValues["Pixels"].push(result.width * result.height);

            yValues["Resolution vs Time"][0].push(result.mean);
            yValues["Resolution vs Time"][1].push(result.pct5);
            yValues["Resolution vs Time"][2].push(result.pct50);
            yValues["Resolution vs Time"][3].push(result.pct95);

            yValues["Pixels vs Time"][0].push(result.mean);
            yValues["Pixels vs Time"][1].push(result.pct5);
            yValues["Pixels vs Time"][2].push(result.pct50);
            yValues["Pixels vs Time"][3].push(result.pct95);

            yValues["Resolution vs Pix Per Sec"].push(result.pix_per_sec);

            yValues["Pixels vs Pix Per Sec"].push(result.pix_per_sec);

        }

    }

    if (result.version === newestVersion) {

        let index = 0;

        switch (result.width) {

            case 1920:

                xValues["Processes"].push(result.processes.toString());

                yValues["Processes vs Time"][0].push(result.mean);
                yValues["Processes vs Time"][1].push(result.pct5);
                yValues["Processes vs Time"][2].push(result.pct50);
                yValues["Processes vs Time"][3].push(result.pct95);

                break;

            case 2560:

                index = 1;

                break;

            case 3840:

                index = 2;

                break;

            case 7680:

                index = 3;

                break;

            case 10000:

                index = 4;

                break;

        }

        yValues["Processes vs Pix Per Sec"][index].push(result.pix_per_sec);

        yValues["Processes vs Std Dev"][index].push(
            result.std_dev / result.mean * 100
        );

    }

}

// Creating Graphs

let graph;

// Version vs Time

graph = document.getElementById("graph-version-time");

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

// Processes vs Standard Deviation

graph = document.getElementById("graph-version-std_dev");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Version"],
        datasets: [
            {
                label: "1080p",
                data: yValues["Version vs Std Dev"][0]
            },
            {
                label: "1440p",
                data: yValues["Version vs Std Dev"][1]
            },
            {
                label: "4K",
                data: yValues["Version vs Std Dev"][2]
            },
            {
                label: "8K",
                data: yValues["Version vs Std Dev"][3]
            },
            {
                label: "10K x 10K",
                data: yValues["Version vs Std Dev"][4]
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
                text: "Version vs Standard Deviation",
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

// Processes vs Standard Deviation

graph = document.getElementById("graph-processes-std_dev");

new Chart(graph, {
    type: "line",
    data: {
        labels: xValues["Processes"],
        datasets: [
            {
                label: "1080p",
                data: yValues["Processes vs Std Dev"][0]
            },
            {
                label: "1440p",
                data: yValues["Processes vs Std Dev"][1]
            },
            {
                label: "4K",
                data: yValues["Processes vs Std Dev"][2]
            },
            {
                label: "8K",
                data: yValues["Processes vs Std Dev"][3]
            },
            {
                label: "10K x 10K",
                data: yValues["Processes vs Std Dev"][4]
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
                text: "Processes vs Standard Deviation (Percent of Mean Time)",
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
    ("/projects/biomegen/script.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);