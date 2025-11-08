export function readCookie(name) {
    let cookies = document.cookie.split("; ");
    for (let i in cookies) {
        const cookie = cookies[i];
        if (cookie.startsWith(name + "=")) {
            const cookieValue = cookie.replace(name + "=", "").trim();
            if (cookieValue.length < 100) {
                console.log("Cookie " + name + ": " + cookieValue);
            }
            return cookieValue;
        }
    }
    return "";
}