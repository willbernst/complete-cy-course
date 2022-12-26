/// <reference types="cypress" />

describe('Verify autocomplete dropdown list via webdriveruni', () => {
    it('Select specific product via autocomplete list', () => {
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#autocomplete-textfield')
            .invoke('removeAttr', 'target')
            .click({ force: true })

        cy.get('myInput')
            .type('A')

        cy.get('#myInputautocomplete-list > *')
            .each(($element, index, $list) => {
                const product = $element.text()
                const productToSelect = 'Avacado';

                if (product == productToSelect) {
                    $element.trigger('click')

                    cy.get('#submit-button')
                        .click()
                    cy.url()
                        .should('include', produc)
                }
            }).then(() => {
                cy.get('myInput')
                    .type('g')
                
                cy.get('#myInputautocomplete-list > *')
                    .each(($element, index, $list) => {
                        const product = $element.text()
                        const productSelect = 'Grapes'

                        if(product == productSelect){
                            $element.trigger('click')

                            cy.get('#submit-button')
                                .click();
                            cy.url()
                                .should('include', productSelect)
                        }
                    })
            });
    });
});