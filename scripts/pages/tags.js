
let listIngredients = new Set();
let listUstensils = new Set();
let listAppliance = new Set();

function createAllTags(listRecipes){
    listRecipes.forEach(recipe => {
        
        listAppliance.add(recipe.appliance.toLowerCase());

        recipe.ustensils.forEach(ustensil => {
            listUstensils.add(ustensil.toLowerCase());
        });

        recipe.ingredients.forEach(ingredient => {
            listIngredients.add(ingredient.ingredient.toLowerCase());
        });
    });
}

function displayAllTags(){
    const listIngredientsTags = document.querySelector(".listIngredientsTags");
    const listUstensilsTags = document.querySelector(".listUstensilsTags");
    const listApplianceTags = document.querySelector(".listApplianceTags");

    displayTags(listIngredientsTags, listIngredients);
    displayTags(listUstensilsTags, listUstensils);
    displayTags(listApplianceTags, listAppliance);

}

function displayTags(listTagsDom, listTags){

    listTagsDom.innerHTML="";
    listTags.forEach(tag => {
        const div = document.createElement("div");
        //faire un style avec la list des tag (blanc)
        div.textContent= tag;
        div.setAttribute("class","whiteTicket");
        div.addEventListener("click", function(e){
            // Ajouter l'element à la list selected 
            if(listTagsDom.getAttribute("class").includes("Ingredients")){
                selectedIngredients.push(tag);
            }
            if(listTagsDom.getAttribute("class").includes("Ustensils")){
                selectedUstensils.push(tag);
            }
            if(listTagsDom.getAttribute("class").includes("Appliance")){
                selectedAppliance.push(tag);
            }
            //finalement le cacher depuis la list global
            this.style.display ="none";
            // mise à jour du dom 
            displayAllSelectedTags();
            // lancer la recherche simple et puis avancée
            listRecipeFiltred= simpleSearch(document.querySelector(".globalSearch").value, listRecipeFiltred);
            listRecipeFiltred= avancedSearch(selectedIngredients,selectedUstensils,selectedAppliance,listRecipeFiltred);
            init();
        });
        listTagsDom.appendChild(div);
    });
}

/* Partie de selected tags */
let selectedIngredients = [];
let selectedUstensils = [];
let selectedAppliance = [];

//Parcourir toutes les selectedTags listes et puis ajouter dans la tete de list en jaune et puis l'etiquette et 
function displayAllSelectedTags(){
    const selectedIngredientsTags = document.querySelector(".selectedIngredientsTags");
    const selectedUstensilsTags = document.querySelector(".selectedUstensilsTags");
    const selectedApplianceTags = document.querySelector(".selectedApplianceTags");

    const selectedIngTags = document.querySelector(".selectedIngTags");
    const selectedUstTags = document.querySelector(".selectedUstTags");
    const selectedAppTags = document.querySelector(".selectedAppTags");

    displaySelectedTags(selectedIngredientsTags, selectedIngTags, selectedIngredients);
    displaySelectedTags(selectedUstensilsTags,selectedUstTags, selectedUstensils);
    displaySelectedTags(selectedApplianceTags,selectedAppTags, selectedAppliance);
}

function displaySelectedTags(selectedTagsG, selectedTagsE,  selectedTags){

    selectedTagsG.innerHTML=""; 
    selectedTagsE.innerHTML="";

    selectedTags.map(tag => {
        const divG = document.createElement("div");
        divG.textContent= tag;
        divG.setAttribute("class","yellowTicketG");

        const iconDelete = document.createElement("i");
        iconDelete.setAttribute("class", "fa fa-times");
        divG.appendChild(iconDelete);
        iconDelete.addEventListener("click", function(e){
            e.preventDefault();

            // Réafficher l'element dans la list des tags
            const listElement = document.querySelectorAll(".whiteTicket");
            listElement.forEach(element => {
                if(element.textContent == divG.textContent)
                element.style.display= "block";
            });
            // delete depuis les tags selectionnés
            divG.remove();
            divE.remove();
            // delete depuis la liste des tags 
            const index = selectedTags.indexOf(divG.textContent);
            if (index > -1) { // only splice array when item is found
                selectedTags.splice(index, 1); // 2nd parameter means remove one item only
            }
            // en lance la recherche 
            listRecipeFiltred = recipes; 
            // lancer la recherche simple et puis avancée
            listRecipeFiltred= simpleSearch(document.querySelector(".globalSearch").value, listRecipeFiltred);
            listRecipeFiltred= avancedSearch(selectedIngredients,selectedUstensils,selectedAppliance,listRecipeFiltred);
            init();
        })
        selectedTagsG.appendChild(divG);
        
        const divE = document.createElement("div");
        divE.textContent= tag;
        divE.setAttribute("class","yellowTicketE");
        selectedTagsE.appendChild(divE);
    });
}

function displayInputTags(){
    const inputIng = document.querySelector(".inputIng");
    const inputUst = document.querySelector(".inputUst");
    const inputApp = document.querySelector(".inputApp");

    const listIngredientsTags = document.querySelector(".listIngredientsTags");
    const listUstensilsTags = document.querySelector(".listUstensilsTags");
    const listApplianceTags = document.querySelector(".listApplianceTags");

    displayInputTag(inputIng,listIngredientsTags);
    displayInputTag(inputUst,listUstensilsTags);
    displayInputTag(inputApp,listApplianceTags);
}

function displayInputTag(input, listTags){

    const nodeList = listTags.childNodes;
    let array = Array.from(nodeList)

    input.addEventListener("input", function(e){
        e.preventDefault();
            array.forEach(element => {
                if(element.textContent.toLowerCase().includes(this.value.toLowerCase()))
                element.style.display="block";
                else
                element.style.display="none";
            });

    });
}