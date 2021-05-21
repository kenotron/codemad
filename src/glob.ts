import globLib from 'glob';

const options: globLib.IOptions = {
    ignore: ['**/node_modules/**']
};

export function glob(pattern: string) {
    return globLib.sync(pattern, options);
}