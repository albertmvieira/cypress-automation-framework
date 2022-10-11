/// <reference types="cypress" />

describe("Alias and invoke", () => {
    
  it("Validate a specific hair care product", () => {
      cy.visit("https://automationteststore.com/");
      cy.get("a[href*='product/category&path=']").contains("Hair Care").click();
      //INVOKE - invoca um metodo Jquery
      cy.get(".fixed_wrapper .prdocutname").eq(0).invoke('text').as('productThumbnail')
      //be.gt comando para validar se é maior que
      cy.get('@productThumbnail').its('length').should('be.gt', 5) 
      cy.get('@productThumbnail').should('include', 'Seaweed Conditioner')
    });


    it("Validate  product thumbnail", () => {
      cy.visit("https://automationteststore.com/");
      cy.get(".thumbnail").as('productThumbnail')
      cy.get('@productThumbnail').should('have.length', 16)
      //validando atributo title se contem o valor 'add to cart'
      cy.get('@productThumbnail').find('.productcart').invoke('attr', 'title').should('include', 'Add to Cart')
      cy.get('@productThumbnail').eq(2).find('.productcart').invoke('attr', 'title').should('include', 'Add to Cart')
    });

    it("calculate-total-of-normal-and-sale-products", () => {
      cy.visit("https://automationteststore.com/");
      
      //usando cypress
      cy.get(".thumbnail").as('productThumbnail')
      //foreach pegando todos os produtos, apos pegando todas classes de preço e logando
      cy.log('Using just Cypress')
      cy.get('@productThumbnail').find('.oneprice').each(($el, index, $list) => {
        cy.log($el.text());
      });

      //usando jquery para fazer o log de todos os preços e somatória 
      cy.get(".thumbnail").find('.oneprice').invoke('text').as('itemPrice')
      cy.get(".thumbnail").find('.pricenew').invoke('text').as('saleItemPrice')

      var itensTotal = 0;
      cy.get('@itemPrice').then($linkText => {
        var itensPriceTotal = 0;
        var itemPrice = $linkText.split('$');
        var i;
        for (i = 0; i < itemPrice.length; i++) {
          cy.log(itemPrice[i])
          itensPriceTotal += Number(itemPrice[i])
        }
        itensTotal += itensPriceTotal;
        cy.log("Non sale price items total: " + itensPriceTotal)
      })

       cy.get('@saleItemPrice').then($linkText => {
         var saleItensPrice = 0;
         var saleItemPrice = $linkText.split('$');
         var i;
         for(i = 0; i < saleItemPrice.length; i++) {
           cy.log(saleItemPrice[i])
           saleItensPrice += Number(saleItemPrice[i])
         }
         itensTotal += saleItensPrice;
         cy.log("Sale price items total: " + saleItensPrice)
       })
       .then(() => {
         cy.log("The total price of all products: " + itensTotal)
         expect(itensTotal).to.equal(662.5)
       })
    });
  });
