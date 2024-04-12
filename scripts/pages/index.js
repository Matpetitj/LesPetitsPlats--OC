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
            
            if(tag === "secondBloc" + id) {
                if (element.classList.contains("opened")) {
                    element.style.display = "none";
                    element.classList.remove("opened");
                } else {
                    element.style.display = "flex";
                    element.classList.add("opened");
                }
            } else {
                element.style.display = "none";
                element.classList.remove("opened");
            }
        });
    });

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

    const selectedTagList = document.createElement('div');
    selectedTagList.classList.add('selectedTagList');
    secondBloc.appendChild(selectedTagList);

    // Création de la liste des tags dans le deuxième bloc
    const tagsList = document.createElement('div');
    tagsList.classList.add("tagsList");
    alltags.forEach(element => {
        const tag = document.createElement('div');
        tag.dataset.tag = element;
        tag.textContent = element;
        tag.classList.add("tag");
        tagsList.appendChild(tag);
        tag.addEventListener('click', () => {
            switch (id) {
                case "ing":
                    tagsIngredient.push(element);
                    const selectedTagIng = document.createElement('h4');
                    selectedTagIng.classList.add('selectedTag');
                    selectedTagIng.textContent = element;
                    selectedTagIng.dataset.id = element;
                    selectedTagList.appendChild(selectedTagIng);
                    tag.style.display = "none";
                    break;
                case "appl":
                    tagsAppliance.push(element);
                    const selectedTagAppl = document.createElement('h4');
                    selectedTagAppl.classList.add('selectedTag');
                    selectedTagAppl.textContent = element;
                    selectedTagAppl.dataset.id = element;
                    selectedTagList.appendChild(selectedTagAppl);
                    tag.style.display = "none";
                    break;
                case "unst":
                    tagsUstensils.push(element);
                    const selectedTagUnst = document.createElement('h4');
                    selectedTagUnst.classList.add('selectedTag');
                    selectedTagUnst.textContent = element;
                    selectedTagUnst.dataset.id = element;
                    selectedTagList.appendChild(selectedTagUnst);
                    tag.style.display = "none";
                    break;
                default:
                    break;
            }
        
        updateSelectedTags();

        })


    });
    
    secondBloc.appendChild(tagsList);

    return tagBtn;
}

function updateSelectedTags() {
    const divJauneContainer = document.querySelector('.divJauneContainer');
    tagsIngredient.forEach(element => {
        const divJaune = document.createElement('div');
        divJauneContainer.appendChild(divJaune);
        const divTagJaune = document.createElement('h4');
        divJaune.appendChild(divTagJaune);
        divTagJaune.textContent = element;
        const closeIcon = document.createElement('i');
        closeIcon.setAttribute('class', 'fa-solid fa-xmark');
        divJaune.appendChild(closeIcon);
        closeIcon.addEventListener('click', () => {
            divJaune.remove();
            document.querySelector(`[data-id="${element}"]`).remove();
            document.querySelector(`[data-tag="${element}"]`).style.display = "block";
        })
    });

    // boucler sur chacune des listes des tags
    // créer l'étiquette jaune + croix fermer avec l'élément sélectionné
}

// Création du nombre de recette et calcul du nombre de recette 

// function updateSumRecipe(sum) {
//     const sumRecipe = document.querySelector('.tagsSection__totalRecipe__nbrTotalRecipe');
//     sumRecipe.textContent = `${sum} recette${sum !== 1 ? 's' : ''}`;
// }


init();