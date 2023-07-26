const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    baseUrl:
      'https://fi.sandbox.sapia.ai/ap-southeast-2/cohorts/623a9ab72ad0b2561fecc7ae',
    // "retries": 1,
  },
})
