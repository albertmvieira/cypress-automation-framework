class AutoStore_HairCare_Po {

    addHairCareProductsToBasket() {
        globalThis.data.productName.forEach(function(element) {
            cy.addProductToBasket(element).then(() => {
                //debugger //usando debug para analisar aplicação
            }) 
        })
        cy.get('.dropdown-toggle > .fa').click();
    }
}

export default AutoStore_HairCare_Po;