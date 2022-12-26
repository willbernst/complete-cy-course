/// <reference types='cypress' />

describe('Validate webdriveruni homepage links', () => {
    it('Confirm link redirect to the correct pages', () => {
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#contact-us')
            .invoke('removeAttr', 'target')
            .click({force: true})
        cy.url()
            .should('include', 'contactus')
        cy.go('back')
        cy.reload()
        // cy.reload(true) RELOAD WITHOUT USING CACHE
        cy.url()
            .should('be.equal', 'http://www.webdriveruniversity.com')
            
        cy.go('forward')
        cy.url()
            .should('include', 'contactus')

        cy.go('back')
        cy.get('#login-portal')
            .invoke('removeAttr', 'target')
            .click({force: true})
        cy.go('back')

        cy.get('#to-do-list')
            .invoke('removeAttr', 'target')
            .click({force: true})
        cy.url()
            .should('include', 'To-Do-List')
        cy.go('back')
    });
});