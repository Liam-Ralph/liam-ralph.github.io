async function getDownloadLinks() {

    const response = await fetch("/downloads/projects/pwrstat-gui/");
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    const links = Array.from(doc.querySelectorAll("a"));
    const debLink = links.map(a => a.getAttribute("href"))
        .find(href => /*\.deb$/.test(href));

    console.log(debLink);

}

getDownloadLinks();