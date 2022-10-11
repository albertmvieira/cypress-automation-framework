import HomePage_PO from '../../support/pageObjects/webdriver-uni/HomePage_PO'
import Contact_Us_PO from '../../support/pageObjects/webdriver-uni/Contact_Us_PO'

/// <reference types="cypress" />

describe("Test Contact Us form via WebdriverUni", () => {

    //Usando timeout explicito apenas neste describe
    Cypress.config('defaultCommandTimeout', 20000)

    const homepage_PO = new HomePage_PO();
    const contact_Us_PO = new Contact_Us_PO();

    before(function() {
        cy.fixture("example").then(function(data) {
            globalThis.data = data;
        })
    })

    beforeEach(function() {
        ///acessando pagina de contato diretamente
        //cy.visit("http://www.webdriveruniversity.com/Contact-Us/contactus.html");

        ///acessando pagina principal e depois acessando pagina de contato
        ///como a pagina abre em outra aba, é necessário retirar o atributo target, para abrir na mesma aba e o cypress reconhecer
        
        ///usando URL dinâmica do env
        //cy.visit(Cypress.env("webdriveruni_homepage") + "/Contact-Us/contactus.html");
        //cy.get('#contact-us').invoke('removeAttr', 'target').click({force: true})

        //Usando Page Object
        homepage_PO.visitHomePage();
        homepage_PO.clickOn_ContactUs_Button();

        //cy.wait(3000); //esperar um tempo especifico 
        //cy.pause(); //pausar o test - para poder debugar um ponto especifico
    })

    it("Using Custom Command - Should be able to submit a successful submission via contact us form", () => {      
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        cy.title().should('include', 'WebDriver | Contact Us')
        cy.url().should('include', 'contactus')
        cy.webdriverUni_ContactForm_Submission(Cypress.env("first_name"), data.last_name, data.email, "How can I learn Cypress?", 'h1', 'Thank You for your Message!')
    });

    it("Using Custom Command - Should not be able to submit a successful submission via contact us form as all fields are required", () => {
        cy.webdriverUni_ContactForm_Submission(data.first_name, data.last_name, " ", "How can I learn Cypress?", 'body', 'Error: Invalid email address')
    });

    it("Using Page Object - Should be able to submit a successful submission via contact us form", () => {      
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        cy.title().should('include', 'WebDriver | Contact Us')
        cy.url().should('include', 'contactus')
        contact_Us_PO.contactForm_Submission(Cypress.env("first_name"), data.last_name, data.email, "How can I learn Cypress?", 'h1', 'Thank You for your Message!')
    });

    it("Using Page Object - Should not be able to submit a successful submission via contact us form as all fields are required", () => {
        contact_Us_PO.contactForm_Submission(data.first_name, data.last_name, " ", "How can I learn Cypress?", 'body', 'Error: Invalid email address')
    });


})