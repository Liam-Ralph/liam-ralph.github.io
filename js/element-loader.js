document.addEventListener('DOMContentLoaded', async function() {

    const response = await fetch('/elements.html');
    const html = await response.text();
    const parser = new DOMParser();
    const documentElements = parser.parseFromString(html, 'text/html');

    const elements = ['first-header', 'second-header', 'footer'];

    elements.forEach(id => {
        document.getElementById(id + '-loader').innerHTML =
            documentElements.getElementById(id).outerHTML;
    });

});