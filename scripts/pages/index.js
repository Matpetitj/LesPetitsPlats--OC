async function displayData(recipes) {
    createTagIngredient();
    const recipesSection = document.querySelector(".wrapper");
    recipesSection.innerHTML="";
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const carteRecipe = recipeModel.getRecipesCardDom();
        recipesSection.appendChild(carteRecipe);
    });
}

function createTagIngredient(){
    
    const tagsSection = document.querySelector(".tagsSection");

    const tagBtn = document.createElement('div');
    tagBtn.classList.add("tagsContainer__tagBtn");

    const tagTitle = document.createElement('h4');
    tagTitle.classList.add("tagsContainer__tagBtn__tagTitle");
    tagTitle.textContent = "Ingrédients";

    const icon = document.createElement('div');
    icon.classList.add('icon');

    const arrowIcon = document.createElement('i');
    arrowIcon.setAttribute("class", "arrowIcon fa-sharp fa-solid fa-angle-down");

    tagBtn.addEventListener("click", function(event){
        event.preventDefault();
        const dropdownList = document.querySelector(".dropdownList");
        dropdownList.style.display = "block";
    })

    const dropdownList = document.createElement('div');
    dropdownList.classList.add("dropdownList");

    const ingredientTxt = document.createElement('p');
    ingredientTxt.classList.add('ingredientTxt');
    dropdownList.appendChild(ingredientTxt);
    ingredientTxt.textContent = "INGREDIENTS";

    // const tagList = document.createElement('div');
    // tagList.classList.add('dropdown__tagList');

    tagsSection.appendChild(tagBtn);
    tagBtn.appendChild(tagTitle);
    tagBtn.appendChild(icon);
    icon.appendChild(arrowIcon);

    tagsSection.appendChild(dropdownList);
    // dropdownList.appendChild(selectedTag);
    // dropdownList.appendChild(tagList);

}

async function init() {
    // Récupère les datas des recipes
    displayData(recipes);
}

init();