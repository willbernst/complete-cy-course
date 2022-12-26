/// <reference types="cypress" />

describe('Test file upload via webdriveruni', () => {
    it('Upload a file', () => {
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#file-upload')
            .invoke('removeAttr', 'target')
            .click({ force: true })

        cy.get('#myFile')
            .selectFile("cypress/fixtures/png.png")

        cy.get('#submit-button')
            .click()
    });

    it('Upload no file', () => {
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#file-upload')
            .invoke('removeAttr', 'target')
            .click({ force: true })

        cy.get('#submit-button')
            .click()
    });
});