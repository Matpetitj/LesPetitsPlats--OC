// Tableaux de tous les tags sélectionnés depuis les ingredients, les appliances et les ustensiles
let tagsIngredient = [];
let tagsAppliance = [];
let tagsUstensils = [];

async function displayData(recipes) {
// Tableaux de tous les ingredients, les appliances et les ustensiles sans doublons
    let allIngredients = [];
    let allAppliances = [];
    let allUstensils = [];
    
   // traitement des données 
    const recipesSection = document.querySelector(".wrapper");
    recipesSection.innerHTML="";
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const carteRecipe = recipeModel.getRecipesCardDom();
        recipesSection.appendChild(carteRecipe);

        //Remplir les tableaux allIng allappliance et allUnst
        recipe.ingredients.forEach(element => {
            allIngredients.push(element.ingredient);
        });
        
        recipe.ustensils.forEach(element => {
            allUstensils.push(element);
        });
        allAppliances.push(recipe.appliance);
               
    });

    // Eliminer les doublons 
    allIngredients = new Set(allIngredients);
    allUstensils = new Set(allUstensils);
    allAppliances = new Set(allAppliances);
    console.log(allIngredients);
    console.log(allUstensils);
    console.log(allAppliances);

    // Agir sur le dom 
    createAllTags(allIngredients,allUstensils, allAppliances);
}

async function init() {
    // Récupère les datas des recipes
    displayData(recipes);
}

function createAllTags(allIngredients,allUstensils, allAppliances){
    const tagsSection = document.querySelector(".tagsSection__tagsContainer");
    // Procéder à la création des 3 list all tags 
    const tagAllIng = createTags(allIngredients, "Ingrédients", "ing");
    tagsSection.appendChild(tagAllIng);

    const tagAllUst = createTags(allUstensils, "Ustensils", "unst");
    tagsSection.appendChild(tagAllUst);

    const tagAllAppl = createTags(allAppliances, "Appliances", "appl");
    tagsSection.appendChild(tagAllAppl);
}

// Création des sections pour les tags
function createTags(alltags, title, id){
    
    const tagBtn = document.createElement('div');
    tagBtn.classList.add("tagsSection__tagsContainer__tagBtn");
    tagBtn.setAttribute("id", id); 
    
    const firstBloc = document.createElement('div');
    firstBloc.classList.add("firstBloc");
    tagBtn.appendChild(firstBloc);

    // Ouverture de la liste de tags
    firstBloc.addEventListener('click', () => {
        const allSecondBlocs= document.querySelectorAll(".dropdown__bloc");
        allSecondBlocs.forEach(element => {
            const tag = element.getAttribute("id");
            console.log(tag);
            
            if(tag == "secondBloc" + id){
                document.getElementById("secondBloc" + id).style.display = "flex";
            }
            else element.style.display = "none";
        });
    })
    
    const tagTitle = document.createElement('h4');
    tagTitle.classList.add("tagTitle");
    tagTitle.textContent = title;
    firstBloc.appendChild(tagTitle);

    const icon = document.createElement('div');
    icon.classList.add('icon');

    firstBloc.appendChild(icon);

    const arrowIcon = document.createElement('i');
    arrowIcon.setAttribute("class", "arrowIcon fa-sharp fa-solid fa-angle-down");
    icon.appendChild(arrowIcon);
    
    // Création du deuxième bloc 
    const secondBloc = document.createElement('div');
    secondBloc.classList.add("dropdown__bloc");
    secondBloc.setAttribute("id", "secondBloc" + id);
    tagBtn.appendChild(secondBloc);

    // Création de l'input de recherche
    const searchBarBloc = document.createElement('div');
    searchBarBloc.classList.add('searchBarBloc');
    secondBloc.appendChild(searchBarBloc)
    const searchBar = document.createElement('input');
    searchBar.classList.add('input');
    searchBarBloc.appendChild(searchBar);
    const tagLoupe = document.createElement('i');
    tagLoupe.setAttribute("class", "tagLoupe fa-solid fa-magnifying-glass");
    searchBarBloc.appendChild(tagLoupe);

    // Création de la liste des tags dans le deuxième bloc
    const tagsList = document.createElement('div');
    tagsList.classList.add("tagsList");
    alltags.forEach(element => {
        const tag = document.createElement('div');
        tag.textContent = element;
        tag.classList.add("tag");
        tagsList.appendChild(tag);
    });
    
    secondBloc.appendChild(tagsList);

    // window.onclick = function(event){
    //         const main = document.querySelector(".main");
    //         const tagsSection = document.querySelector(".tagsSection");
    //         if(event.target == main || tagsSection){
    //             secondBloc.style.display = "none";
    //             listTags.style.display = "none";
    //         }
    //     }

    return tagBtn;
}

// Création du nombre de recette et calcul du nombre de recette 

// function updateSumRecipe(sum) {
//     const sumRecipe = document.querySelector('.tagsSection__totalRecipe__nbrTotalRecipe');
//     sumRecipe.textContent = `${sum} recette${sum !== 1 ? 's' : ''}`;
// }


init();