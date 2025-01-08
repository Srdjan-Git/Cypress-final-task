const { defineConfig } = require("cypress");
const cucumber = require('cypress-cucumber-preprocessor').default

module.exports = defineConfig({
  e2e: {
    reporter: 'cypress-mochawesome-reporter',

    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('file:preprocessor', cucumber())
      require('cypress-mochawesome-reporter/plugin')(on);
    },

    "chromeWebSecurity": false,
    //specPattern: "cypress/e2e/**/*feature",

  },

  env: {
    credentials: {
      email: "srdjan82m@gmail.com",
      password: "srkiboy82"
    },
    url: "https://conduit.bondaracademy.com/",
    urlSingIn: "https://conduit.bondaracademy.com/login"
  }
});
