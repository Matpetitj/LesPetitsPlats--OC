const globalSearch = document.querySelector(".globalSearch");


globalSearch.addEventListener("input", function(e){
    e.preventDefault();
    if(e.inputType == 'deleteContentBackward')
    {
        //reset du tableau de recherche
        listRecipeFiltred = recipes; 
    }
    if(this.value.length > 2){
        
        // lancer la recherche simple 
        listRecipeFiltred= simpleSearch(this.value, listRecipeFiltred);
    }
        // appeler la recherche avancé au cas ou il y a des tags selectionnés 
        listRecipeFiltred= avancedSearch(selectedIngredients,selectedUstensils,selectedAppliance,listRecipeFiltred);
        // raffraichir les données sur le som 
        init();
    


});