module.exports = {
    root: true,
    env: {
        commonjs: true,
        es6: true,
        node: true,
        'jest/globals': true,
    },
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2018,
    },
    rules: {
        indent: 'off',
        'max-len': 'off',
        semi: 'off',
        'operator-linebreak': 'off',
        'implicit-arrow-linebreak': 'off',
        'comma-dangle': 'off',
        'function-paren-newline': 'off',
        'object-curly-newline': 'off',
        'import/prefer-default-export': 'off',
    },
    plugins: ['jest', '@typescript-eslint'],
}
