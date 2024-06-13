module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:react-hooks/recommended',
        'google',
        'prettier',
    ],
    globals: {
        Atomics: 'readonly',
        SharedArrayBuffer: 'readonly',
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2018,
        sourceType: 'module',
    },
    plugins: ['prettier', 'react', 'react-hooks'],
    rules: {
        'prettier/prettier': 'error',
        'require-jsdoc': 0,
        'valid-jsdoc': 0,
        'new-cap': 0,
        'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
        'react/prop-types': 'off',
    },
    settings: {
        react: {
            version: '18.2',
        },
    },
    ignorePatterns: ['dist', '.eslintrc.cjs'],
}
