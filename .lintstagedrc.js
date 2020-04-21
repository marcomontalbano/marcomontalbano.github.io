module.exports = {
    '*.{j,t}s{,x}': [
        'prettier --write',
        () => 'npm run lint', // lint all files
    ],
}
