module.exports = {
  env: {
    browser: true,
    node: true,
    es2021: true,
  },
  extends: ['eslint:recommended'],
  parserOptions: {
    ecmaFeatures: {},
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['node'],
  rules: {
    'no-console': [2, { allow: ['warn', 'error'] }],
  },
};
