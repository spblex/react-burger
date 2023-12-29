const COOKIE_EXPIRATION_TIME = 20 * 60 * 1000;

export function setCookie(name, value) {
    const date = new Date();
    date.setTime(date.getTime() + COOKIE_EXPIRATION_TIME);

    document.cookie =
        name + '=' + (value ? encodeURIComponent(value) : '') + ';' +
        'path=/;' +
        'expires=' + date.toUTCString() + ';';
}

export function deleteCookie(...names) {
    names.forEach((name) => {
        setCookie(name, null);
    });
}

export function getCookie(name) {
    const match = document.cookie?.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return match ? match[1] : null;
}