/// <reference types="cypress" />

describe('Inspect Automation Test Store items using chain of commands', () => {
    it('Click on the first item using item header', () => {
        cy.visit('http://www.automationteststore.com/')
        cy.get('#block_frame_featured_1769 > .thumbnails > :nth-child(1) > .fixed_wrapper > .fixed > .prdocutname')
            .click();
        //code prone to break if the developer changes something in the code by changing the ordination
    });

    it('Click on the first item using item text', () => {
        cy.visit('http://www.automationteststore.com/')
        cy.get('.prdocutname')
            .contains('text', 'Skinsheen Bronzer Stick')
            .click()
            .then(function(itemHeaderText) {
                console.log('Selected the following item:' + itemHeaderText.text())
            })
        //code prone to break if the developer changes something in the code by changing the name
    });

    it('Click on the first item using index', () => {
        cy.visit('http://www.automationteststore.com/')
        cy.get('.fixed_wrapper')
            .find('.prdocutname')
            .eq(0)
            .click()
    });
});