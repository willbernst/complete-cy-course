/// <reference types="cypress" />

describe('Test Datepicker via webdriveruni', () => {
    it('Select date from the datepicker', () => {
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#datepicker')
            .invoke('removeAttr', 'target')
            .click({ force: true })
        cy.get('#datepicker')
            .click()

        // creating a future day, month and year.
        var date = new Date();
        date.setDate(date.getDate() + 360)

        var futureYear = date.getFullYear();
        var futureMonth = date.toLocaleString('default', { month: 'long' }) //changing month for the correct way, using long
        var futureDay = date.getDate();

        cy.log('the future year is: ' + futureYear)
        cy.log('the future month is: ' + futureMonth)
        cy.log('the future day is:' + futureDay)

        function selectMonthAndyear() {
            cy.get('.datepicker-dropdown')
                .find('.datepicker-switch')
                .first()
                .then(currentDate => {
                    if (!currentDate.text().includes(futureYear)) {
                        cy.get('.next')
                            .first()
                            .click()

                        selectMonthAndyear()
                    }
                }).then(() => {
                    cy.get('.datepicker-dropdown')
                        .find('.datepicker-switch')
                        .first()
                        .then(currentDate => {
                            if (!currentDate.text().includes(futureMonth)) {
                                cy.get('.next')
                                    .first()
                                    .click()

                                selectMonthAndyear()
                            }
                        })
                })
        }

        function selectFutureDay() {
            cy.get('[class="day"]')
                .contains(futureDay)
                .click()
        }

        selectMonthAndyear()
        selectFutureDay()
    });
});