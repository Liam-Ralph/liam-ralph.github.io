// Loading Version Data

fetch("/data/website-data.txt")
    .then((res) => res.text())
    .then((text) => {
        document.getElementById("first-header-version").innerHTML = "Version " + text.replace("Version: ", "");
    })
    .catch((e) => console.error(e));