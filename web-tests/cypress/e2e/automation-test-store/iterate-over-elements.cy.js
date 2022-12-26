/// <reference types="cypress" />

describe('Iterate over elements', () => {
    it('Log information of all hair care products', () => {
        cy.visit('https://automationteststore.com/index.php?rt=content/contact')
        cy.get('a[href*="product/category&path="]')
            .contains('Hair Care')
            .click()

        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            cy.log('index: ' + index + ': ' + $el.text())
        })
    });

    it('Add specific product to basket', () => {
        cy.visit('https://automationteststore.com/index.php?rt=content/contact')
        cy.get('a[href*="product/category&path="]')
            .contains('Hair Care')
            .click()

        cy.get('.fixed_wrapper .prdocutname').each(($el, index, $list) => {
            if($el.text().includes('Curls to stright Shampoo')){
                cy.wrap($el).click()
            }
        })
        
    });
});