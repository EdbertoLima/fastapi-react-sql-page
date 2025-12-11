// .eslintrc.js
/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
    project: ['./tsconfig.json'],
  },
  env: {
    browser: true,
    node: true,
    es2023: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect', // auto-detect React 19
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        paths: ['src'],
      },
    },
  },
  plugins: ['react', 'react-hooks', 'jsx-a11y', '@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb-typescript',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    // keep your previous custom rules, adjusted for TS
    'max-len': ['error', 100, 2, { ignoreUrls: true }], // align with Prettier 100 cols
    'no-console': 'off',
    'no-restricted-syntax': 'off',
    'no-continue': 'off',
    'no-underscore-dangle': 'off',

    'import/extensions': 'off',
    'import/no-unresolved': 'off',

    'operator-linebreak': 'off',
    'implicit-arrow-linebreak': 'off',

    'react/destructuring-assignment': 'off',

    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',

    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.jsx', '.tsx'] },
    ],

    'lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
  },
};
