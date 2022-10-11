import AutoStore_Homepage_Po from '../../support/pageObjects/automation-test-store/AutoStore_Homepage_PO'
import AutoStore_HairCare_Po from '../../support/pageObjects/automation-test-store/AutoStore_HairCare_Po'

/// <reference types="cypress" />

describe("Add multiple items to basket", () => {

  const autoStore_Homepage_Po = new AutoStore_Homepage_Po();
  const autoStore_HairCare_Po = new AutoStore_HairCare_Po();

  before(function () {
    cy.fixture("products").then(function (data) {
      globalThis.data = data;
    });
  });

  beforeEach(function () {
    cy.clearLocalStorage();
    cy.clearCookies();
    autoStore_Homepage_Po.accessHomepage();
    autoStore_Homepage_Po.clickOn_HairCare_Link();
  });


  //Identificado que o cypress não consegue incluir os produtos no carrinho quando no index.js está ativo o ignore: (xhr) => bool
  // Precisei comentar para que o teste funcionasse, porém fica logando varias rotas (logging of matching routes)
  it("Add specific items to basket - Without page object", () => {
    globalThis.data.productName.forEach(function (element) {
      cy.addProductToBasket(element)
    })
    cy.get('.dropdown-toggle > .fa').click();
  });

  it("Add specific items to basket - With page object", () => {
    autoStore_HairCare_Po.addHairCareProductsToBasket();
  });
});
