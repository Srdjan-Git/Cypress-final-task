/// <reference types="cypress"/>

import { singInPageElements } from "../../../cypress/support/POM/singInPageElements"

describe('Login', () => {

    let loginData

    before(() => {
        cy.fixture('uiLoginData/loginJsonData').then((data) => { loginData = data.dataForLogin; });
    });

    const credentials = Cypress.env("credentials")
    const url = Cypress.env("url")

    it('Login without credentials', () => {
        cy.LoginWithoutCredentialsOrWithOneMissingCredential(url, loginData.withoutCredentialEmailAndPassword, '')
        cy.get(singInPageElements.signInButton).should(loginData.attribute) // Assert if the button "Sign in" is disabled
    });

    it('Login without email', () => {
        cy.LoginWithoutCredentialsOrWithOneMissingCredential(url, loginData.withoutCredentialEmail, credentials.password)
        cy.get(singInPageElements.signInButton).should(loginData.attribute) // Assert if the button "Sign in" is disabled
    });

    it('Login without password', () => {
        cy.LoginWithoutCredentialsOrWithOneMissingCredential(url, loginData.withoutCredentialPassword, credentials.email)
        cy.get(singInPageElements.signInButton).should(loginData.attribute) // Assert if the button "Sign in" is disabled
    });

    it('Login with incorrect email', () => {
        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, loginData.wrongEmail, credentials.password)
        cy.get(singInPageElements.errorMessage).should('have.text', loginData.errorMessage) // Assert error message and text color
            .and('have.css', 'color', loginData.color)
    });

    it('Login with incorrect password', () => {
        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, credentials.email, loginData.wrongPassword)
        cy.get(singInPageElements.errorMessage).should('have.text', loginData.errorMessage) // Assert error message and text color
            .and('have.css', 'color', loginData.color)
    });

    it('Login with correct credentials', () => {
        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, credentials.email, credentials.password)
        cy.url().should('eq', url) // Assert URL, if the login was successful
    });
});
