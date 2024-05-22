module.exports = {
  'env': {
    'browser': true,
    'es6': true
  },
  'extends': [
    'google',
    'prettier',
    'plugin:react/recommended'
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly'
  },
  'parser': 'babel-eslint',
  'parserOptions': {
    'ecmaFeatures': {
      'jsx': true
    },
    'ecmaVersion': 2018,
    'sourceType': 'module'
  },
  'plugins': [
    'prettier',
    'react'
  ],
  'rules': {
    'prettier/prettier': 'error'
  },
  'settings': {
    'react': {
      'version': '^16.8.6'
    }
  },
};
