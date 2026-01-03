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
    "/downloads/projects/pwrstat-gui/pwrstat-gui_" + version + ".deb";
document.getElementById("download-link-dev-deb").href =
    "/downloads/projects/pwrstat-gui/dev-package_" + version + "_debian.tar.gz";
document.getElementById("download-link-rpm").href =
    "/downloads/projects/pwrstat-gui/pwrstat-gui-" + version + "-.fc43.x86_64.rpm";
document.getElementById("download-link-dev-fed").href =
    "/downloads/projects/pwrstat-gui/dev-package_" + version + "_fedora.tar.gz";

// Log Script Time

const endTime = new Date();
console.log(
    ("/projects/pwrstat-gui/script.js: ").padEnd(35) + // script path
    (endTime - startTime).toString().padStart(4) + "ms" // time
);