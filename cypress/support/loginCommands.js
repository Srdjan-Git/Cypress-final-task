import { headersPageElements } from "../../cypress/support/POM/headersPageElements"
import { singInPageElements } from "../../cypress/support/POM/singInPageElements"

Cypress.Commands.add('LoginWithoutCredentialsOrWithOneMissingCredential', (url, missingField = '', credential) => {

    cy.visit(url)
    cy.get(headersPageElements.signIn).click() // Click on "Sign in"

    if (missingField === 'email') {
        cy.get(singInPageElements.email).clear()  // Clear email textbox
    } else if (credential !== ''){
        cy.get(singInPageElements.email).type(credential)
    }

    if (missingField === 'password') {
        cy.get(singInPageElements.password).clear()  // Clear password textbox
    } else if (credential !== '') {
        cy.get(singInPageElements.password).type(credential)
    }

    if (missingField === 'both') {
        cy.get(singInPageElements.email).clear()  // Clear email textbox
        cy.get(singInPageElements.password).clear()  // Clear password textbox
    }
})

Cypress.Commands.add('LoginWithIncorrectCredentialsOrCorrectLogin', (...arg) => {

    cy.visit(arg[0]) // URL
    cy.get(headersPageElements.signIn).click() // Click on "Sign in"
    cy.get(singInPageElements.email).type(arg[1]) // Email
    cy.get(singInPageElements.password).type(arg[2]) // Password
    cy.get(singInPageElements.signInButton).click() // Click on button "Sign in"
})