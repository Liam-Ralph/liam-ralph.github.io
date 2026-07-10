// Commit Class

class File {
    constructor(path){
        this.path = path;
        this.sha = "";
        this.lines = 0;
    }
}

class Commit {
    constructor(id, mesg, filePaths) {
        this.id = id;
        this.mesg = mesg;
        this.files = [];
        for (let i in filePaths) {
            this.files.push(new File(filesPaths[i]));
        }
    }
}


// Project History Loader

export function loadProjectHistory(projectName) {

    // Start Time

    const startTime = new Date();

    // Import Cookie Reader

    import { readCookie } from "./global-functions.js";

    // Load isomorphic-get and Create Filesystem

    import http from "https://unpkg.com/isomorphic-git/https/web/index.js";
    window.fs = new LightningFS("fs");
    window.pfs = window.fs.promises;
    window.dir = "/isomorphic-git";
    await pfs.mkdir(dir);

    // Cloning Repository

    await git.clone({
        fs,
        http,
        dir: "/isomorphic-git",
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/isomorphic-git/isomorphic-git',
        ref: 'main',
        singleBranch: true
    });

    // Read Commit History

    historyRaw = git.log
    
    // Log Script Time

    const endTime = new Date();
    console.log(
        (`/project-history-loader (${projectName}) `).padEnd(60) + // script path
        (endTime - startTime).toString().padStart(4) + "ms" // time
    );

}