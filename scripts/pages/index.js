// Tableaux des tags
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

let tagsIngredient = [];
let tagsAppliance = [];
let tagsUstensils = [];

async function displayData(recipes) {
    let allIngredients = [];
    let allAppliances = [];
    let allUstensils = [];
    
    createTagIngredient();
    const recipesSection = document.querySelector(".wrapper");
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

function createTagIngredient(ingredients){
    
    const tagsSection = document.querySelector(".tagsSection");

    const tagsContainer = document.createElement('div');
    tagsContainer.classList.add('tagsSection__tagsContainer');

    const tagBtn = document.createElement('div');
    tagBtn.classList.add("tagsSection__tagsContainer__tagBtn");

    const tagTitle = document.createElement('h4');
    tagTitle.classList.add("tagsSection__tagsContainer__tagBtn__tagTitle");
    tagTitle.textContent = "Ingrédients";

    const icon = document.createElement('div');
    icon.classList.add('icon');

    const arrowIcon = document.createElement('i');
    arrowIcon.setAttribute("class", "arrowIcon fa-sharp fa-solid fa-angle-down");

    tagBtn.addEventListener("click", function(event){
        event.preventDefault();
        const dropdownList = document.querySelector(".dropdownList");
        dropdownList.style.display = "block";
        dropdownList.classList.add("open");
    });

    window.onclick = function(event){
        const main = document.querySelector(".main");
        const dropdownList = document.querySelector(".dropdownList");
        if(event.target == main){
            dropdownList.style.display = "none";
            dropdownList.classList.remove("open");
        }
    }

    tagsSection.appendChild(tagsContainer);
    tagsContainer.appendChild(tagBtn);
    tagBtn.appendChild(tagTitle);
    tagBtn.appendChild(icon);
    icon.appendChild(arrowIcon);

    // AJOUTER UNE CLASSE ET LA RETIRER POUR LE SMOOTH

    const dropdownList = document.createElement('div');
    dropdownList.classList.add("dropdownList");

    // BARRE DE RECHERCHE DES TAGS

    const tagsForm = document.createElement('form');
    tagsForm.classList.add('tagsForm');

    const searchBar = document.createElement('input');
    searchBar.classList.add('tagsForm__searchBar');

    const tagsLoupeBtn = document.createElement('button');
    tagsLoupeBtn.classList.add('tagsForm__tagsLoupeBtn');

    const tagsLoupe = document.createElement('i');
    tagsLoupe.setAttribute("class", "tagsLoupe fa-solid fa-magnifying-glass");

    tagsContainer.appendChild(dropdownList);
    dropdownList.appendChild(tagsForm);
    tagsForm.appendChild(searchBar);
    tagsForm.appendChild(tagsLoupeBtn);
    tagsLoupeBtn.appendChild(tagsLoupe);

    // AFFICHAGE TAGS EN UTILISANT ENCORE DROPDOWNLIST

    const tagsListContainer = document.createElement('div');
    tagsListContainer.classList.add('tagsListContainer');
    
    const selectedTag = document.createElement('div');
    selectedTag.classList.add('selectedTag');

    const allTags = document.createElement('div');
    allTags.classList.add('allTags');

    dropdownList.appendChild(tagsListContainer);
    tagsListContainer.appendChild(selectedTag);
    tagsListContainer.appendChild(allTags);

    // Nombre recette
    const totalRecipe = document.createElement('div');
    totalRecipe.classList.add("tagsSection__totalRecipe");

    const nbrTotalRecipe = document.createElement('p');
    nbrTotalRecipe.classList.add('tagsSection__totalRecipe__nbrTotalRecipe');
    nbrTotalRecipe.textContent = "1500 recettes";
    
    tagsSection.appendChild(totalRecipe);
    totalRecipe.appendChild(nbrTotalRecipe);

}

function fillTags(dom, elements){
    dom.innerHTML = "";
    elements.forEach(element => {
        if ((elements == allIngredients && !tagsIng.includes(element.toLowerCase()))) {

        }
    })

}

init();