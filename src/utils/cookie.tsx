import {TGetCookieProps, TSetCookieProps} from "../types/props";

const COOKIE_EXPIRATION_TIME_DEFAULT = 20 * 60 * 1000;
const COOKIE_EXPIRATION_TIME_EXTENDED = 365 * 24 * 60 * 60 * 1000;

export const setCookie: TSetCookieProps = (name, value, canExpire, needDelete = false) => {
    const date = new Date();
    let time = 0;
    if (!needDelete) {
        time = canExpire ? COOKIE_EXPIRATION_TIME_DEFAULT : COOKIE_EXPIRATION_TIME_EXTENDED;
    }
    date.setTime(date.getTime() + time);

    document.cookie =
        name + '=' + (value ? value : '') + ';' +
        'path=/;' +
        'expires=' + date.toUTCString() + ';';
}

export const deleteCookie = (...names: string[]) => {
    names.forEach((name) => {
        setCookie(name, null, true, true);
    });
}

export const getCookie: TGetCookieProps = (name) => {
    const match = document.cookie?.match(RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
    return match ? match[1] : null;
}