const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    supportFile: 'tests/cypress/support/index.js',
    specPattern: 'tests/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    baseUrl: 'http://pipeline.test',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', require('./swap-env'));
    },
  },
});
