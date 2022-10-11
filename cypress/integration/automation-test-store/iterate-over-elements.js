/// <reference types="cypress" />

describe("Iterate over elements", () => {

  beforeEach(function() {
    cy.visit("https://automationteststore.com/");
    cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
  })

  it("Log information of all hair care products", () => {
    cy.get(".fixed_wrapper .prdocutname").each(($el, index, $list) => {
        cy.log("Index: " + index + " : " + $el.text())
    });
  });
  
  it.only("Add specific product to basket", () => {

    //chamando o comando customizado
    cy.selectProduct('Curls to straight Shampoo');
  });

  it.only("Add another specific product to basket", () => {

    //chamando o comando customizado
    cy.selectProduct('Seaweed Conditioner');
  });

  it.only("Add another specific product to basket 2", () => {

    //chamando o comando customizado
    cy.selectProduct('Eau Parfumee au The Vert Shampoo');
  });
});
