/// <reference types="cypress" />

import { faker } from '@faker-js/faker'

describe('Signup Test', () => {
    const email = faker.internet.email('william')
    const password = faker.internet.password(8)
    const securityAnswer = faker.random.words(4)

    describe('UI tests', () => {
        beforeEach(() => {
            cy.visit('http://localhost:3000/#/')

            cy.get('.cdk-overlay-backdrop')
                .click(-50, -50, { force: true })

            cy.get('#navbarAccount')
                .click()
            cy.get('#navbarLoginButton')
                .click()
        })

        it('Test valid signup', () => {
            cy.get('#newCustomerLink')
                .contains('Not yet a customer?')
                .click({ force: true })

            cy.url()
                .should('be.equal', 'http://localhost:3000/#/register')

            cy.get('#emailControl')
                .type(email)
            cy.get('#passwordControl')
                .type(password)
            cy.get('#repeatPasswordControl')
                .type(password)

            cy.get('.mat-form-field-type-mat-select > .mat-form-field-wrapper > .mat-form-field-flex > .mat-form-field-infix')
                .click()
            cy.get('#mat-option-3 > mat-option-text')
                .click()
            cy.get('#securityAnswerControl')
                .type(securityAnswer)
            cy.get('#registerButton')
                .click()
            cy.get('.mat-snack-bar-container')
                .contains('Registration completed successfully')
        });

        it('Test valid login', () => {
            cy.get('#email')
                .type(email)
            cy.get('#password')
                .type(password)
            cy.get('#loginButton')
                .click()
        });
    });

    describe('API Tests', () => {
        const userCredentials = {
            "email": email,
            "password": password
        }
        it('Test login via API (Non UI)', () => {
            cy.request('POST', 'http://localhost:3000/rest/user/login', userCredentials).then(response => {
                expect(response.status).to.equal(200)
            })
        });

        it('Login via Token (Non Ui)', () => {
            cy.request('POST', 'http://localhost:3000/rest/user/login', userCredentials)
            .its('body').then(body => {
                const token = body.authentication.token
                cy.wrap(token).as('userToken')
                cy.log('@userToken')

                const userToken = cy.get('@userToken')
                cy.visit('http://localhost:3000', {
                    onBeforeLoad(browser){
                        browser.localStorage.setItem("token", userToken)
                    }
                })
                cy.wait(1000)
                cy.get('.cdk-overlay-backdrop')
                    .click(-50, -50, {force: true})
            })
        })
    })
});