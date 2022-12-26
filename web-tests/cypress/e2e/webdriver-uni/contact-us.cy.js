/// <reference types="cypress" />

import {faker} from '@faker-js/faker'
import HomePage_PO from '../../support/pageObjects/webdriver-uni/Homepage_PO';
import Contact_Us_PO from '../../support/pageObjects/webdriver-uni/Contact_Us_PO';

describe('Test Contact Us form via WebdriverUni', () => {
    Cypress.config('defaultCommandTimeout', 20000);
    const randomData = {
        firstName: faker.name.firstName('male'),
        lastName: faker.name.lastName('male'),
        email: faker.internet.email(),
        randomText: faker.lorem.text()
    }

    before(function() {
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        const homepage_PO = new HomePage_PO();
        homepage_PO.visitHomePage();
        homepage_PO.clickOnContactUsButton();
    })

    it('should be able to submit a successful submission via contact us form', () => {
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        // cy.visit('http://www.webdriveruniversity.com')

        cy.document()
            .should('have.property', 'charset')
            .and('eq', 'UTF-8')
        cy.title()
            .should('include', 'WebDriver | Contact Us')

        const ContactUsPO = new Contact_Us_PO();
        ContactUsPO.contactForm_Submission(randomData.firstName, randomData.lastName, randomData.email, randomData.randomText);
        
        cy.url()
            .should('be.equal', 'http://www.webdriveruniversity.com/Contact-Us/contact-form-thank-you.html')
        cy.contains('Thank You for your Message!')
    });

    it('Should not be able to submit a successful submission via contact us form as all fields are required', () => {
        // email and textarea will not be filled
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        // cy.visit('http://www.webdriveruniversity.com')

        cy.get('[name="first_name"]')
            .should('be.empty')
            .type(randomData.firstName)
            .should('have.value', randomData.firstName)
        cy.get('[name="last_name"]')
            .should('be.empty')
            .type(randomData.lastName)
            .should('have.value', randomData.lastName)

        cy.get('[name="email"]')
            .should('be.empty')

        cy.get('[type="submit"]')
            .click();
        cy.url()
            .should('be.equal', 'http://www.webdriveruniversity.com/Contact-Us/contact_us.php')
        cy.contains('Error: all fields are required')
            .should('be.visible')
        cy.contains('Error: Invalid email address')
            .should('be.visible')
    });
});