document.addEventListener('DOMContentLoaded', async function() {
    const response = await fetch('/elements.html');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    const elements = ['first-header', 'second-header', 'footer'];
    
    elements.forEach(id => {
        const source = doc.getElementById(id);
        const target = document.getElementById(id + '-loader');
        target.innerHTML = source.outerHTML;
    });
});