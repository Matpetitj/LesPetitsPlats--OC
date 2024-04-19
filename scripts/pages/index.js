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

    // Création du conteneur de la liste des tags sélectionnés
    const selectedTagList = document.createElement('div');
    selectedTagList.classList.add('selectedTagList');
    secondBloc.appendChild(selectedTagList);

    // Création de la liste des tags dans le deuxième bloc
    const tagsList = document.createElement('div');
    tagsList.classList.add("tagsList");

    const tagContainerIng = document.querySelector('.tagContainerIng');
    tagContainerIng.innerHTML = "";
    const tagContainerApp = document.querySelector('.tagContainerApp');
    tagContainerApp.innerHTML = "";
    const tagContainerUst = document.querySelector('.tagContainerUst');
    tagContainerUst.innerHTML = "";
                    
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
                    updateListTags(element, selectedTagList, tag);
                    updateContainerTags(element, tagContainerIng, tagsIngredient);
                    break;
                case "appl":
                    tagsAppliance.push(element);
                    updateListTags( element, selectedTagList, tag);
                    updateContainerTags(element, tagContainerApp, tagsAppliance);
                    break;
                case "unst":
                    tagsUstensils.push(element);
                    updateListTags( element, selectedTagList, tag);
                    updateContainerTags(element, tagContainerUst, tagsUstensils);
                    break;
                default:
                    break;
            }

            const selectedTag = document.querySelector('.selectedTag');
            selectedTag.addEventListener('mouseover', (event) => {
                event.preventDefault();
                event.stopPropagation();
                selectedTagCloseIcon.style.display = "block";
            })

            // selectedTag.addEventListener('mouseout', (event) => {
            //     event.preventDefault();
            //     event.stopPropagation();
            //     selectedTagCloseIcon.style.display = "none";
            // })
        
        

        })


    });

    // créer une étiquette qui contient le h4 et la croix de fermeture
    
    // Création de la croix dans le selectedTagList
    const selectedTagCloseIcon = document.createElement('i');
    selectedTagCloseIcon.setAttribute('class', 'fa-solid fa-xmark');
    selectedTagCloseIcon.style.display = "none";

    secondBloc.appendChild(tagsList);

    return tagBtn;
}

function updateListTags( element, container, tag) {
        const selectedTagIng = document.createElement('h4');
        selectedTagIng.classList.add('selectedTag');
        selectedTagIng.textContent = element;
        selectedTagIng.dataset.id = element;
        container.appendChild(selectedTagIng);
        tag.style.display = "none";
}


function updateContainerTags(element, container, tagsList){
    const resultTagsList = document.createElement('div');
        container.appendChild(resultTagsList);
        resultTagsList.classList.add('resultTagsList')
        const resultTag = document.createElement('h4');
        resultTag.classList.add('resultTag')
        resultTagsList.appendChild(resultTag);
        resultTag.textContent = element;
        const closeIcon = document.createElement('i');
        closeIcon.setAttribute('class', 'fa-solid fa-xmark');
        resultTagsList.appendChild(closeIcon);
        closeIcon.addEventListener('click', () => {
            resultTagsList.remove();
            document.querySelector(`[data-id="${element}"]`).remove();
            document.querySelector(`[data-tag="${element}"]`).style.display = "block";
            tagsList = tagsList.filter(elt => (elt != element));
        })
   
}

function deleteTags(){
    resultTagsList.remove();
    document.querySelector(`[data-id="${element}"]`).remove();
    document.querySelector(`[data-tag="${element}"]`).style.display = "block";
    console.log(listTags);
    listTags = listTags.filter(elt => (elt != element));
    updateSelectedTags();
}
// function searchRecipes(query) {
//     const searchResults = [];
//     const recipesSection = document.querySelector(".wrapper");
//     recipesSection.innerHTML = "";

//     recipes.forEach(recipe => {
//         // Vérifier si la chaîne de recherche est présente dans le titre ou la description
//         if (recipe.title.toLowerCase().includes(query.toLowerCase()) || 
//             recipe.description.toLowerCase().includes(query.toLowerCase())) {
//             searchResults.push(recipe);
//             return; // Passe à la recette suivante
//         }

//         // Vérifier si la chaîne de recherche est présente dans les ingrédients
//         recipe.ingredients.forEach(ingredient => {
//             if (ingredient.ingredient.toLowerCase().includes(query.toLowerCase())) {
//                 searchResults.push(recipe);
//                 return; // Passe à la recette suivante
//             }
//         });
//     });

//     // Afficher les résultats de la recherche
//     searchResults.forEach(recipe => {
//         const recipeModel = recipeTemplate(recipe);
//         const carteRecipe = recipeModel.getRecipesCardDom();
//         recipesSection.appendChild(carteRecipe);
//     });
// }

// // Fonction pour gérer l'événement de saisie dans la zone de recherche
// function handleSearchInput() {
//     const searchInput = document.querySelector("#searchInput");
//     const query = searchInput.value.trim(); // Récupérer la valeur saisie et enlever les espaces inutiles

//     if (query.length > 0) {
//         // Si la chaîne de recherche n'est pas vide, effectuer la recherche
//         searchRecipes(query);
//     } else {
//         // Si la chaîne de recherche est vide, afficher toutes les recettes
//         displayData(recipes);
//     }
// }

// // Ajouter un écouteur d'événement pour déclencher la recherche lors de la saisie dans la zone de recherche
// const searchInput = document.querySelector("#searchInput");
// searchInput.addEventListener("input", handleSearchInput);



// Création du nombre de recette et calcul du nombre de recette 

// function updateSumRecipe(sum) {
//     const sumRecipe = document.querySelector('.tagsSection__totalRecipe__nbrTotalRecipe');
//     sumRecipe.textContent = `${sum} recette${sum !== 1 ? 's' : ''}`;
// }


init();