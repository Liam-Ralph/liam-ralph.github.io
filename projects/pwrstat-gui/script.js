// Start Time

const startTime = new Date();

// Find PwrStat GUI Version

import { projects } from "/data-loader.js"

let version;
for (let i in projects) {
    const project = projects[i];
    if (project.name === "PwrStat GUI") {
        version = project.version;
        break;
    }
}

// Load Download Links

document.getElementById("download-link-deb").href =
    "https://github.com/Liam-Ralph/pwrstat-gui/releases/download/v" +
    `${version}/pwrstat-gui_${version}_x86_64.deb`;
document.getElementById("download-link-rpm").href =
    "https://github.com/Liam-Ralph/pwrstat-gui/releases/download/v" +
    `${version}/pwrstat-gui_${version}_x86_64.rpm`;
document.getElementById("download-link-pacman").href =
    "https://github.com/Liam-Ralph/pwrstat-gui/releases/download/v" +
    `${version}/pwrstat-gui_${version}_x86_64.pkg.tar.zst`;

// Log Script Time

const endTime = new Date();
console.log(
    ("/projects/pwrstat-gui/script.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);