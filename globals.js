// Classes

class LanguageDef {
    constructor(name, ext, shortComment = "//", longComment = ["/*", "*/"]) {
        this.name = name;
        this.ext = ext;
        this.shortComment = shortComment;
        this.longComment = longComment;
    }
}

// Variables

const python = new LanguageDef("Python", "py", "#", ["\"\"\"", "\"\"\""]);
// const java = new LanguageDef("Java", "java");
const html = new LanguageDef("HTML", "html", "", ["<!--", "-->"]);
const css = new LanguageDef("CSS", "css", "");
const javaScript = new LanguageDef("JavaScript", "js");
const c = new LanguageDef("C", "c");
// const cpp = new LanguageDef("C++", "cpp");
//const cSharp = new LanguageDef("C#", "cs");
const shell = new LanguageDef("Shell", "sh", "#");

export const languageDefs = [python, html, css, javaScript, c, shell];


// Functions

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