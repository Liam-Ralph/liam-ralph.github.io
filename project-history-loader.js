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

    // Import from Globals

    import { languageDefs, readCookie } from "./globals.js";

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

    const historyRaw = await git.log({
        fs,
        dir: dir
    }).split("\n\n");
    let commits = []

    for (let i = 0; i < Math.floor(historyRaw.length / 2); i++) {

        const commitInfo = historyRaw[i * 2].split("\n");

        commits.push(new Commit(
            commitInfo[0].replace("commit ", ""),
            Date.parse(commitInfo[2].replace("Date:   ", "")),
            historyRaw[i * 2 + 1].strip()
        ));

    }

    // Analyzing Commits

    for (let i in commits) {

        let commit = commits[i];

        // Checkout Commit

        await git.checkout({
            fs,
            dir: dir,
            ref: commit.id
        });

        // Scan for Files

        allFiles = pfs.readdir(dir, recursive = true);

    }
    
    // Log Script Time

    const endTime = new Date();
    console.log(
        (endTime - startTime).toString().padStart(5) + "ms " + // script time
        (`/loadProjectHistory(${projectName})`) // script path
    );

    return commits;

}