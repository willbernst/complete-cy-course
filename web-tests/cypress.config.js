const { defineConfig } = require('cypress')
const fs = require('fs-extra');
const path = require('path')
const cucumber = require('cypress-cucumber-preprocessor').default

function getConfigurationByFile(file){
  const pathToConfigFile = path.resolve('cypress\\config', `${file}.json`)

  if(!fs.existsSync(pathToConfigFile)){
    console.log('No custom config file found')
    return {}
  }

  return fs.readJSON(pathToConfigFile)
}

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('file:preprocessor', cucumber())
      
      // implement node event listeners here
      const file = config.env.configFile || ''
      return getConfigurationByFile(file)
    },
    chromeWebSecurity: false,
    specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx,feature}",
    excludeSpecPattern: "cypress/e2e/automation-test-store/*.js",
    defaultCommandTimeout: 10000,
    viewportHeight: 1080,
    viewportWidth: 768,
    videoUploadOnPasses: true,
    video: true,
    reporter: 'cypress-multi-reporters',
    reporterOptions: {
      configFile: 'reporter-config.json'
    },
    retries:{
      runMode: 0,
      openMode: 1
    },
    "experimentalStudio": true
  }
})