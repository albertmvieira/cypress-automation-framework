/// <reference types="Cypress" />

Cypress.Commands.add("navigateTo_WebdriverUni_HomePage", () => {
  cy.visit("/")  
})

Cypress.Commands.add("selectProduct", productName => {
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
        if($el.text().includes(productName)) {
          //cy.wrap yeld/provide/produce the element passed, being able to use cypress commands again after non cypress commands
          cy.wrap($el).click()

          //if not use wrap, it wouldn't be possible to use .click() cypress command, it'd be necessary to use jquery command
          //$el[0].click()
        }
    });
})

Cypress.Commands.add("addProductToBasket", productName => {
  cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
      if($el.text() === productName) {
        cy.log($el.text())
        cy.get(".productcart").eq(index).click()
      }
  });
})

Cypress.Commands.add("webdriverUni_ContactForm_Submission", (firstName, lastName, email, comment, $selector, textToLocate) => {
  cy.get('[name="first_name"]').type(firstName);
  cy.get('[name="last_name"]').type(lastName);
  cy.get('[name="email"]').type(email)
  cy.get('textarea.feedback-input').type(comment)
  cy.get('[type="submit"]').click();
  cy.get($selector).contains(textToLocate);
  cy.screenshot();
})

import 'cypress-file-upload';