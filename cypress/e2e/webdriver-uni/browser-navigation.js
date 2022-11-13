/// <reference types="cypress" />

describe("Validate webdriveruni homepage links", () => {
    it("Confirm links redirect to the correct pages", () => {
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");
        cy.visit("http://www.webdriveruniversity.com")
        
        //contact-us
        //Cypress não consegue validar nativamente a abertura de outras abas do browser, por isso é necessário manipular o DOM da pagina para que abra na mesma pagina esta informação
        //invoke é uma função que possibilita utilizar JQuery functions, com isso utilizar o metodo/função removeAttr do jquery
        //removeAttr posibilita deletar atributos de um elemento no DOM da pagina
        cy.get('#contact-us').invoke('removeAttr', 'target').click({force:true})
        
        //url get URL 
        cy.url().should('include', 'contactus')
        
        //back or forward history page
        cy.go('back')
        cy.reload()
        //cy.reload(true) //reload without using cache

        cy.go('forward')
        cy.url().should('include', 'contactus')

        //login-portal
        cy.go('back')
        cy.get('#login-portal').invoke('removeAttr', 'target').click({force:true})
        cy.url().should('include', 'Login-Portal')
        cy.go('back')

        //to-do-list
        cy.get('#to-do-list').invoke('removeAttr', 'target').click({force:true})
        cy.url().should('include', 'To-Do-List')
        cy.go('back')
    });
})