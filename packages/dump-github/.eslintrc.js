module.exports = {
    env: {
        commonjs: true,
        es6: true,
        node: true,
        'jest/globals': true,
    },
    extends: ['airbnb-base'],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
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
    },
    plugins: ['jest'],
}
