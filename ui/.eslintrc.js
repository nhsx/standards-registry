module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    '@next/next/no-document-import-in-page': 'off',
    'react/prop-types': [0],
    'react/react-in-jsx-scope': [0], // next puts react in global scope
    'no-console': [2, { allow: ['warn', 'error'] }],
    // Lint precommit hook is run from the root, which expects a "pages" directory
    // Our pages live in the ui folder, so let the linter know that.
    // https://nextjs.org/docs/messages/no-html-link-for-pages#options
    '@next/next/no-html-link-for-pages': ['error', 'ui/pages/'],
  },
  overrides: [
    {
      files: ['**/*.test.js'],
      env: {
        jest: true, // now **/*.test.js files' env has both es6 *and* jest
      },
      plugins: ['jest'],
    },
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
};
