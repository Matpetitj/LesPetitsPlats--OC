async function displayData(recipes) {
    const recipesSection = document.querySelector("#wrapper");
    recipesSection.innerHTML="";
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const carteRecipe = recipeModel.getRecipesCardDom();
        recipesSection.appendChild(carteRecipe);
    });
}

async function init() {
    // Récupère les datas des recipes
    displayData(recipes);
}

init();