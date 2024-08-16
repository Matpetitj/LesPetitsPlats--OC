let listRecipeFiltred = recipes; 

function displayData(listRecipes) {
    
    const resultRecipes = document.querySelector(".resultRecipes");
    resultRecipes.innerHTML="";
    listRecipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const carteRecipe = recipeModel.getRecipesCardDom();
        resultRecipes.appendChild(carteRecipe);
    });
    const totalRecipes = document.querySelector(".totalRecipes");
    totalRecipes.textContent=listRecipes.length + " recettes";
}

function init() {
    // Récupère les datas des recipes
    displayData(listRecipeFiltred);
    createAllTags(listRecipeFiltred);
    displayAllTags();
    displayInputTags();
}

init();