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