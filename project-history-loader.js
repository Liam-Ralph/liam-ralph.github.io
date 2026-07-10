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

import { languageDefs, readCookie } from "/globals.js";
import http from "https://unpkg.com/isomorphic-git/http/web/index.js";

export async function loadProjectHistory(projectName) {

    // Start Time

    const startTime = new Date();

    // Load isomorphic-get and Create Filesystem

    window.fs = new LightningFS("fs");
    window.pfs = window.fs.promises;
    window.dir = "/isomorphic-git";

    let clone = true;
    try {
        const stat = await pfs.stat(dir);
        clone = !stat.isDirectory()
    } catch (error) {}

    if (clone) {

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

    }

    let gitDir = dir + projectName;

    // Read Commit History

    let commits = [];

    const readCommitResults = await git.log({
        fs,
        dir: dir
    });

    for (let i in readCommitResults) {
        const readCommitResult = readCommitResults[i];
        const commit = readCommitResult.commit;
        commits.push(new Commit(
            readCommitResult.oid,
            new Date(commit.author["timestamp"]),
            commit.message
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

        allFiles = pfs.readdir(gitDir, recursive = true);
        for (let i in allFiles) {
            path = allFiles[i];

        }

    }
    
    // Log Script Time

    const endTime = new Date();
    console.log(
        (endTime - startTime).toString().padStart(5) + "ms " + // script time
        (`loadProjectHistory(${projectName})`) // script path
    );

    return commits;

}