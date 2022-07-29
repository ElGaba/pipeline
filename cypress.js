const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'tests/cypress/support/index.js',
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://127.0.0.1:8000',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', require('./swap-env'));
    },
  },
});