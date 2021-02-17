export const log = (arg) => {
    switch (true) {
        case arg instanceof Error:
            console.log(arg.message);
            break;
        case typeof arg === 'object':
            console.table(arg);
            break;
        case typeof arg === 'string':
        default:
            console.log(arg);
    }
};
