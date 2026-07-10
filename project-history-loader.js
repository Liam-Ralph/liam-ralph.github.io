// Commit Class

class File {
    constructor(path){
        this.path = path;
        this.sha = "";
        this.lines = 0;
    }
}

class Commit {
    constructor(id, dateEpoch, mesg) {
        this.id = id;
        this.date = new Date(dateEpoch);
        this.mesg = mesg;
        this.files = [];
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
        dir: dir,
        corsProxy: 'https://cors.isomorphic-git.org',
        url: 'https://github.com/isomorphic-git/isomorphic-git',
        ref: 'main',
        singleBranch: true
    });

    // Read Commit History

    const historyRaw = git.log({
        fs,
        dir: dir
    }).split("\n\n");
    let commits = []

    for (let i in Math.floor(historyRaw.length / 2)) {

        const commitInfo = historyRaw[i * 2].split("\n");
        const mesgRaw = historyRaw[i * 2 + 1].split("\n");
        let mesg = [];
        for (let ii in mesgRaw) mesg.push[mesgRaw[ii].strip()];

        commits.push(new Commit(
            commitInfo[0].replace("commit ", ""),
            Date.parse(commitInfo[2].replace("Date:   ", "")),
            mesg
        ));

    }
    
    // Log Script Time

    const endTime = new Date();
    console.log(
        (endTime - startTime).toString().padStart(5) + "ms " + // script time
        (`/loadProjectHistory(${projectName})`) // script path
    );

    return commits;

}