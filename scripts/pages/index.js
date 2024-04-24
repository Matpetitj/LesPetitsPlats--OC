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
            allIngredients.push(element.ingredient);
        });
        
        recipe.ustensils.forEach(element => {
            allUstensils.push(element);
        });
        allAppliances.push(recipe.appliance);
               
    });

    // Eliminer les doublons avec la méthode Set
    allIngredients = new Set(allIngredients);
    allUstensils = new Set(allUstensils);
    allAppliances = new Set(allAppliances);
    console.log(allIngredients);
    console.log(allUstensils);
    console.log(allAppliances);

    // Appel de la fonction pour gérer la recherche
    inputsListener();

    // Création du nombre de recette et calcul du nombre de recette 

    updateSumRecipe(recipes.length);

    // Agir sur le dom 
    createAllTags(allIngredients,allUstensils, allAppliances);
}

async function init() {
    // Récupère les datas des recipes
    displayData(recipes);
}

function createAllTags(allIngredients,allUstensils, allAppliances){
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

    searchBar.addEventListener('input', function (){
        // faire un parcours sur les tags avec la classList tag puis les cacher dans la liste de tags
        // seulement pendant la recherche, quand un tags est selectionné -> remettre l'affichage
    })

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
    const tagContainerIng = document.getElementById('tagContainerIng');
    tagContainerIng.innerHTML = "";
    const tagContainerApp = document.getElementById('tagContainerApp');
    tagContainerApp.innerHTML = "";
    const tagContainerUst = document.getElementById('tagContainerUst');
    tagContainerUst.innerHTML = "";

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
        tag.addEventListener('click', () => {
            // en fonction de l'id, on push les modifications dans une nouvelles liste (array)
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

            // affichage de la croix sur les tags avec un mouseover
            const selectedTagContainer = document.querySelector('.selectedTag');
            const selectedTagCloseIcon = document.querySelector('.selectedTagCloseIcon');
            selectedTagContainer.addEventListener('mouseover', (event) => {
                event.preventDefault();
                event.stopPropagation();
                selectedTagCloseIcon.style.display = "block";
            })

            selectedTagCloseIcon.addEventListener('mouseover', (event) => {
                event.preventDefault();
                event.stopPropagation();
                selectedTagCloseIcon.style.display = "block";
            })

            //suppression de la croix sur les tags avec un mouseover
            selectedTagContainer.addEventListener('mouseout', (event) => {
                event.preventDefault();
                event.stopPropagation();
                selectedTagCloseIcon.style.display = "none";
            })
        
        })

    });

    secondBloc.appendChild(tagsList);

    return tagBtn;
}

// ----------------- //
// GESTION DES TAGS

// Fonction création et mise à jour des tags sélectionnés directement dans la liste concernée
function updateListTags( element, container, tag) {
        const selectedTagContainer = document.createElement('div');
        selectedTagContainer.classList.add('selectedTagContainer');
        // création du tag sélectionné dans la liste
        const selectedTagIng = document.createElement('h4');
        selectedTagIng.classList.add('selectedTag');
        selectedTagIng.textContent = element;
        selectedTagIng.dataset.id = element;
        selectedTagContainer.appendChild(selectedTagIng);
        // Création de la croix dans le selectedTagList
        const selectedTagCloseIcon = document.createElement('i');
        selectedTagCloseIcon.setAttribute('class', 'fa-solid fa-xmark selectedTagCloseIcon');
        // selectedTagCloseIcon.style.display = "none";
        selectedTagContainer.appendChild(selectedTagCloseIcon);
        container.appendChild(selectedTagContainer);
        tag.style.display = "none";
}

// Création de la fonction de mise à jour des tags dans les étiquettes
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
        // Remove + style de l'étiquette supprimée
        closeIcon.addEventListener('click', () => {
            // remove l'étiquette du DOM
            resultTagsList.remove();
            // remove l'element du DOM
            document.querySelector(`[data-id="${element}"]`).remove();
            document.querySelector(`[data-tag="${element}"]`).style.display = "block";
            // la valeur element est filtrée ( retirée ) de tagsList
            tagsList = tagsList.filter(elt => (elt != element));
        })
   
}

// Création de la function de suppression des tags sélectionnés
function deleteTags(){
    resultTagsList.remove();
    document.querySelector(`[data-id="${element}"]`).remove();
    document.querySelector(`[data-tag="${element}"]`).style.display = "block";
    console.log(listTags);
    listTags = listTags.filter(elt => (elt != element));
    updateSelectedTags();
}

// ----------------- //
// Recherche INPUT

// Fonction pour gérer la recherche des tags

function inputsListener(){
    document.getElementById('mainSearchBar').addEventListener('input', function (e) {
        e.preventDefault();
        let inputValue = this.value;
        if (inputValue.length > 0) {
          document.getElementById('delete').style.display = 'block';
        } 
        if (inputValue.length >= 3) {
          let filtredTable = sampleSearch(inputValue);
          displayData(filtredTable);
            
        }
    });
}

function sampleSearch(searchString){
    // Convertir la chaîne de recherche en minuscules pour la comparaison
    const searchLowerCase = searchString.toLowerCase();
    // Filtrer les recettes en fonction de la chaîne de recherche
    const filteredRecipes = recipes.filter(recipe => {
      // Vérifier si la c haîne de recherche est présente dans le titre, la description ou la liste des ingrédients
      return (
        recipe.name.toLowerCase().includes(searchLowerCase) ||
        recipe.description.toLowerCase().includes(searchLowerCase) ||
        recipe.ingredients.some(
          ingredient =>
            ingredient.ingredient.toLowerCase().includes(searchLowerCase)
        ) )
    });
    return filteredRecipes;
}

function advancedSearch (){
    // une recherche supplémentaire ( plus précise ) qui complète la recherche de la searchBar principale
}

// ----------------- //
// Création du nombre de recette et calcul du nombre de recette 

function updateSumRecipe(sum) {
    const sumRecipe = document.querySelector('.tagsSection__totalRecipe__nbrTotalRecipe');
    sumRecipe.textContent = `${sum} recette${sum !== 1 ? 's' : ''}`;
}

init();