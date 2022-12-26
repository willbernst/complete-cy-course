/// <reference types="cypress" />

describe('Handle JS alerts', () => {
    it('Confirm js alert contains the correct text', () => {
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#popup-alerts')
            .invoke('removeAttr', 'target')
            .click({force: true})

        cy.get('#button1')
            .click();

        cy.on('window:alert', (string) => {
            expect(string).to.equal('I am an alert box!')
        })
    });

    it('Validate js confirm alert box works correctly when clicking OK', () => {
         // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
         cy.visit('http://www.webdriveruniversity.com')
         cy.get('#popup-alerts')
            .invoke('removeAttr', 'target')
            .click({force: true})

        cy.get('#button4')
            .click();
        cy.on('window:alert', (string) => {
            return true; //clicking OK
        })
        cy.get('#confirm-alert-text')
            .contains('You pressed OK!')
    });

    it('Validate js confirm alert box works correctly when clicking CANCEL', () => {
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#popup-alerts')
           .invoke('removeAttr', 'target')
           .click({force: true})

       cy.get('#button4')
           .click();

       cy.on('window:confirm', (string) => {
           return false; //clicking CANCEL
       })
       cy.get('#confirm-alert-text')
           .contains('You pressed CANCEL!')
   });

   it('Validate js confirm alert box using a stub', () => {
        // cy.visit('http://www.webdriveruniversity.com/Contact-Us/contactus.html')
        cy.visit('http://www.webdriveruniversity.com')
        cy.get('#popup-alerts')
            .invoke('removeAttr', 'target')
            .click({force: true})

        const stub = cy.stub()
        cy.on('window:confirm', stub)

        cy.get('#button4')
            .click()
            .then(() => {
                expect(stub.getCall(0)).to.be.calledWith('Press a button!')
            }).then(() => {
                return true; //Clicking OK
            }).then(() => {
                cy.get('#confirm-alert-text')
                    .contains('You pressed OK!')
            })
   });
});