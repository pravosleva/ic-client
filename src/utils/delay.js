export const delay = (ms = 500) =>
    new Promise((res, _rej) => {
        setTimeout(res, ms);
    });
