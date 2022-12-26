class HomePage_PO {
    visitHomePage(){
        cy.visit("http://webdriveruniversity.com/");
    }

    clickOnContactUsButton(){
        cy.get('#contact-us')
            .invoke('removeAttr', 'target')
            .click({force: true})
    }
}

export default HomePage_PO;