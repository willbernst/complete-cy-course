/// <reference types="cypress" />

describe('Interact with dropdown lists via webdriveruni', () => {
    it('Select specific values via select dropdown list', () => {
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#dropdown-checkboxes-radiobuttons')
            .invoke('removeAttr', 'target')
            .click({force: true})

        cy.get('#dropdown-menu-1')
            .select('C#')
            .should('have.value', 'c#')

        cy.get('#dropdown-menu-2')
            .select('JUnit')
            .should('have.value', 'junit')

        cy.get('#dropdown-menu-3')
            .select('JQuery')
            .should('have.value', 'jquery')
    });
});