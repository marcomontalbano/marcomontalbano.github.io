module.exports = {
    '*.{js,jsx,ts,tsx}': [
        'prettier --write',
        () => 'yarn lint', // lint all files
    ],
}
