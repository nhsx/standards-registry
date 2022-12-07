const htmlvalidate = require('cypress-html-validate/plugin');
const { defineConfig } = require('cypress');

// https://www.npmjs.com/package/cypress-html-validate#configuration
const htmlValidationConfig = {
  rules: {
    // Avoid nextjs markup causing an error
    'attribute-allowed-values': 'off',
    'valid-id': 'off',
    'require-sri': 'off',
    // Prevents issues relating to 'script type="application/json"' for nextjs data
    'script-type': 'off',
  },
};

const htmlValidateOptions = { include: ['body'] };

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      htmlvalidate.install(on, htmlValidationConfig, htmlValidateOptions);
      return require('./cypress/plugins/index.js')(on, config);
    },
    baseUrl: 'http://localhost:3000',
  },

  component: {
    devServer: {
      framework: 'next',
      bundler: 'webpack',
    },
  },
});
