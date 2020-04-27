module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'prettier --write',
        () => 'npm run lint', // lint all files
    ],
}
