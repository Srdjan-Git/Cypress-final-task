/// <reference types="cypress"/>

import { articlesPageElements } from '../../../cypress/support/POM/articlesPageElements';

let mockingAssertData;

before(() => {
    cy.fixture('mockingData/assertMockingJsonData').then((data) => {
        mockingAssertData = data.assertMockingData;
    });
});

describe('Mocking data', () => {

    const credentials = Cypress.env("credentials");
    const url = Cypress.env("url");


    it('Mocking articles and assert articless titles', () => {

        cy.intercept('GET', 'https://conduit-api.bondaracademy.com/api/articles?limit=10&offset=0', { fixture: 'mockingData/mockingJsonData.json' }).as('waitArticles')

        cy.LoginWithIncorrectCredentialsOrCorrectLogin(url, credentials.email, credentials.password)

        cy.wait('@waitArticles').its('response.statusCode')
            .should('eq', 200)

        cy.get(articlesPageElements.singleArticle).should('have.length', mockingAssertData.totalNumberOfArticles)

        const expectedTitles = Object.values(mockingAssertData)
            .filter(value => typeof value === 'string')
            .slice(0, mockingAssertData.totalNumberOfArticles);

        cy.get(articlesPageElements.articleName).each(($h1, index) => {
            cy.wrap($h1).should('have.text', expectedTitles[index])
        });
    });
});

