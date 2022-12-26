class Contact_Us_PO {
    contactForm_Submission(firstName, lastName, email, randomText){
        cy.get('[name="first_name"]')
            .should('be.empty')
            .type(firstName)
            .should('have.value', firstName)
        cy.get('[name="last_name"]')
            .should('be.empty')
            .type(lastName)
            .should('have.value', lastName)
        cy.get('[name="email"]')
            .should('be.empty')
            .type(email)
            .should('have.value', email)
        cy.get('textarea.feedback-input')
            .should('be.empty')
            .type(randomText)
            .should('have.value', randomText)
        cy.get('[type="submit"]')
            .click();
        }   
}

export default Contact_Us_PO