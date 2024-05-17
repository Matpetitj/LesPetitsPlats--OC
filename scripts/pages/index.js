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
    // Boucle avec la méthode forEach pour les recettes
    recipes.forEach((recipe) => {
        const recipeModel = recipeTemplate(recipe);
        const carteRecipe = recipeModel.getRecipesCardDom();
        recipesSection.appendChild(carteRecipe);

        //Remplir les tableaux allIng allAppl et allUnst
        recipe.ingredients.forEach(element => {
            allIngredients.push(element.ingredient.toLowerCase());
        });
        
        recipe.ustensils.forEach(element => {
            allUstensils.push(element.toLowerCase());
        });
        allAppliances.push(recipe.appliance.toLowerCase());
               
    });

    // Eliminer les doublons avec la méthode Set
    allIngredients = new Set(allIngredients);
    allUstensils = new Set(allUstensils);
    allAppliances = new Set(allAppliances);
    // console.log(allIngredients);
    // console.log(allUstensils);
    // console.log(allAppliances);

    // Appel de la fonction pour gérer la recherche
    inputsListener();

    // Création du nombre de recette et calcul du nombre de recette 
    updateSumRecipe(recipes.length);

    // Agir sur le dom 
    fillAllTags(allIngredients,allUstensils, allAppliances);
}

async function init() {
    // Récupère les datas des recipes
    displayData(recipes);
}

function fillAllTags(allIngredients, allUstensils, allAppliances){
    const tagsSection = document.querySelector(".tagsSection__tagsContainer");
    tagsSection.innerHTML = "";
    // Procéder à la création des 3 list all tags + titre et id
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

    // Ajout de l'event listener sur l'input de recherche
    searchBar.addEventListener('input', function() {
        const inputValue = this.value.toLowerCase(); // Convertir en minuscules pour la comparaison
        const tags = tagsList.querySelectorAll('.tag'); // Récupérer tous les tags

        // Boucle à travers chaque tag pour le cacher ou l'afficher en fonction de la saisie
        tags.forEach(tag => {
            const tagName = tag.textContent; // Le nom du tag
            if (tagName.includes(inputValue)) {
                tag.style.display = 'block'; // Afficher le tag si son nom correspond à la saisie
            } else {
                tag.style.display = 'none'; // Cacher le tag sinon
            }
        });
    });

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

    // Récupération des container des listes de tags et nettoyage
    // const tagContainerIng = document.getElementById('tagContainerIng');
    // tagContainerIng.innerHTML = "";
    // const tagContainerApp = document.getElementById('tagContainerApp');
    // tagContainerApp.innerHTML = "";
    // const tagContainerUst = document.getElementById('tagContainerUst');
    // tagContainerUst.innerHTML = "";

    // ----------------- //
    // CREATION DES TAGS + MISE A JOUR DES TAGS APRES LA PARTIE GESTION

    // Boucle forEach afin de créer les tags                
    alltags.forEach(element => {
        // création des tags
        const tag = document.createElement('p');
        tag.dataset.tag = element;
        tag.textContent = element;
        tag.classList.add("tag");
        tagsList.appendChild(tag);
        // listener click sur les tags afin de gérer les tags sélectionné
        tag.addEventListener('click', (event) => {
            event.preventDefault();
            // en fonction de l'id, on push les modifications dans une nouvelles liste (array)
            switch (id) {
                case "ing":
                    tagsIngredient.push(element);
                    updateListTags(element, selectedTagList, tag);
                    updateLabelTags(element, tagContainerIng, tagsIngredient);
                    searchBar.value = "";
                    updateSelectedTags(tagsIngredient);
                    const result = advancedSearch(filtredTable);
                    filtredTable = result;
                    displayData(filtredTable);
                    break;
                case "appl":
                    tagsAppliance.push(element);
                    updateListTags( element, selectedTagList, tag);
                    updateLabelTags(element, tagContainerApp, tagsAppliance);
                    searchBar.value = "";
                    updateSelectedTags(tagsAppliance);
                    break;
                case "unst":
                    tagsUstensils.push(element);
                    updateListTags( element, selectedTagList, tag);
                    updateLabelTags(element, tagContainerUst, tagsUstensils);
                    searchBar.value = "";
                    updateSelectedTags(tagsUstensils);
                    break;
                default:
                    break;
            }
        
        })

    });

    secondBloc.appendChild(tagsList);

    return tagBtn;
}

// ----------------- //
// Création du nombre de recette et calcul du nombre de recette 

function updateSumRecipe(sum) {
    const sumRecipe = document.querySelector('.tagsSection__totalRecipe__nbrTotalRecipe');
    sumRecipe.textContent = `${sum} recette${sum !== 1 ? 's' : ''}`;
}

init();