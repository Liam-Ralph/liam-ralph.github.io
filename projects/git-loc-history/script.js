// Start Time

const startTime = new Date();

// Find PwrStat GUI Version

import { projects } from "/data-loader.js";

let version;
for (let i in projects) {
    const project = projects[i];
    if (project.name === "Git LoC History") {
        version = project.version;
        break;
    }
}

// Load Download Links

document.getElementById("download-link-deb").href =
    "https://github.com/Liam-Ralph/git-loc-history/releases/download/v" +
    `${version}/git-loc-history_${version}_x86_64.deb`;
document.getElementById("download-link-rpm").href =
    "https://github.com/Liam-Ralph/git-loc-history/releases/download/v" +
    `${version}/git-loc-history_${version}_x86_64.rpm`;
document.getElementById("download-link-pacman").href =
    "https://github.com/Liam-Ralph/git-loc-history/releases/download/v" +
    `${version}/git-loc-history_${version}_x86_64.pkg.tar.zst`;

// Log Script Time

const endTime = new Date();
console.log(
    (endTime - startTime).toString().padStart(5) + "ms " + // script time
    ("/projects/git-loc-history/script.js") // script path
);