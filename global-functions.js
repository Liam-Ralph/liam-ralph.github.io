export function readCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i in cookies) {
        const cookie = cookies[i];
        if (cookie.startsWith(name + "=")) {
            const cookieValue = cookie.replace(name + "=", "").trim();
            if (cookieValue.length < 100) {
                console.log(`Cookie ${name}: ${cookieValue}`);
            } else {
                console.log(`Cookie ${name} length: ${cookieValue.length}`);
            }
            return cookieValue;
        }
    }
    console.log(`Cookie ${name} not found.`);
    return "";
}


export function loadProjectHistory(projectName) {

    // Start Time

    const startTime = new Date();

    // Load isomorphic-get and Create Filesystem

    import http from "https://unpkg.com/isomorphic-git/https/web/index.js";
    window.fs = new LightningFS("fs");
    window.pfs = window.fs.promises;
    window.dir = "/isomorphic-git/" + projectName;
    await pfs.mkdir(dir);

    // Cloning Repository

    await git.clone({
        fs,
        http,
        dir: "/isomorphic-git/" + projectName,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/isomorphic-git/isomorphic-git',
        ref: 'main',
        singleBranch: true
    });

    // Log Script Time

    const endTime = new Date();
    console.log(
        (`loadProjectHistory - ${projectName}: `).padEnd(60) + // script path
        (endTime - startTime).toString().padStart(4) + "ms" // time
    );

}