/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

describe('Test Contact Us form via Automation Test Store', () => {
    before(()=>{
        cy.viewport(550,750)
    })
    const randomData = {
        firstName: faker.name.firstName('male'),
        email: faker.internet.email(),
        randomText: faker.lorem.text()
    }
    it('Should be able to submit a successful submission via contact us form', () => {
        cy.visit('http://www.automationteststore.com/')
        cy.get('a[href$="contact"]')
            .click()
            .then(function(linkText) {
                cy.log('Clicked on link using text:' + linkText.text())
            })

        cy.get('#ContactUsFrm_first_name')
            .type(randomData.firstName)
        cy.get('#ContactUsFrm_email')
            .should('have.attr', 'name', 'email')
        cy.get('#ContactUsFrm_email')
            .type(randomData.email)
        cy.get('#ContactUsFrm_enquiry')
            .type(randomData.randomText)

        cy.get('button[title="Submit"]')
            .click();

        cy.get('.contentpanel')
            .should('contain', 'Your enquiry has been successfully sent to the store owner!')
    });
});