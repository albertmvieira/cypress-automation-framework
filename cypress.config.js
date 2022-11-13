const { defineConfig } = require('cypress');
const fs = require('fs-extra');
const path = require('path');

function getConfigurationByFile(file) {
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`);

  if(!fs.existsSync(pathToConfigFile)) {
    console.log("No custom config file found.");
    return {};
  }

  return fs.readJson(pathToConfigFile);
}

module.exports = defineConfig({
  experimentalStudio: true,
  chromeWebSecurity: false,
  defaultCommandTimeout: 10000,
  pageLoadTimeout: 30000,
  viewportHeight: 1080,
  viewportWidth: 1920,
  screenshotOnRunFailure: true,
  screenshotsFolder: 'mochawesome-report/assets',
  retries: {
    runMode: 1,
    openMode: 1,
  },
  env: {
    webdriveruni_homepage: 'http://www.webdriveruniversity.com',
    first_name: 'Sarah',
  },
  projectId: 'r66cs9',
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    configFile: 'reporter-config.json',
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      const file = config.env.configFile || ''
      return getConfigurationByFile(file)
    },
    baseUrl: 'http://www.webdriveruniversity.com',
    //excludeSpecPattern: '**/other/**',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
    chromeWebSecurity: false,
    experimentalSessionAndOrigin: true
  },
})
