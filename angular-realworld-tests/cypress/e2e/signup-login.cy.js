/// <reference types="cypress" />

import {faker} from '@faker-js/faker'

describe('Signup & Login', () => {
    const firstName = faker.name.firstName('male')
    const lastName = faker.name.lastName('male')
    const randomEmail = faker.internet.email(firstName)
    const password = faker.internet.password(15, true)

    const userName = firstName + ' ' + lastName;

    it('Test Valid Signup', () => {
        cy.intercept('POST', '**/*/.realworld.io/api/users')
            .as('newUser')

        cy.visit('http://localhost:4200/')

        cy.get('.nav')
            .contains('Sign up')
            .click();
        
        cy.url()
            .should('contain', 'register')

        cy.get('[placeholder="Username"]')
            .type(userName)
        cy.get('[placeholder="Email"')
            .type(randomEmail)
        cy.get('[placeholder="Password"]')
            .type(password)

        cy.get('button')
            .contains('Sign up')
            .click()

        cy.wait('@newUser')
            .should(({request, response}) =>{
                cy.log('Request:' + JSON.stringify(request))
                cy.log('Response:' + json.stringify(response))

                expect(response.statusCode).to.equal(200)
                expect(request.body.user.username).to.equal(userName)
                expect(request.body.user.email).to.equal(randomEmail)
        })
    });

    it('Test Valid Login & Mock Popular Tags', () => {
        cy.intercept('GET', '**/tags', {fixture: 'popularTags.json'})

        cy.visit('http://localhost:4200/')

        cy.get('.nav')
            .contains('Sign in')
            .click();
        cy.get('[placeholder="Email"')
            .type(randomEmail)
        cy.get('[placeholder="Password"]')
            .type(password)

        cy.get('button')
            .contains('Sign in')
            .click()

        cy.get(':nth-child(4) > .nav-link')
            .contains(userName)

        cy.get('.tag-list')
            .should('contain', 'JavaScript')
            .and('contain', 'Cypress')
    });
});