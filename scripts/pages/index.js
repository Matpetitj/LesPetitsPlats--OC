

// Tableaux de tous les tags séléctionnés depuis les ingredients les appliances et es ustunciles
let tagsIngredient = [];
let tagsAppliance = [];
let tagsUstensils = [];

async function displayData(recipes) {
// Tableaux de tous les ingredients les appliances et es ustunciles sans doublons
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

        //remplir les tableaux allIng allapliance et allUnst
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
    // agir sur le dom 
    createAllTags(allIngredients,allUstensils, allAppliances);
}

async function init() {
    // Récupère les datas des recipes
    displayData(recipes);
}

function createAllTags(allIngredients,allUstensils, allAppliances){
    const tagsSection = document.querySelector(".tagsSection__tagsContainer");
    // proceder à la création des 3 list all tags 
    const tagAllIng = createTags(allIngredients, "Ingrédients", "ing");
    tagsSection.appendChild(tagAllIng);

    const tagAllUst = createTags(allUstensils, "Ustensils", "unst");
    tagsSection.appendChild(tagAllUst);

    const tagAllAppl = createTags(allAppliances, "Appliances", "appl");
    tagsSection.appendChild(tagAllAppl);
}

function createTags(alltags, title){
    
    const tagBtn = document.createElement('div');
    tagBtn.classList.add("tagsSection__tagsContainer__tagBtn");
    
    const firstBloc = document.createElement('div');
    firstBloc.classList.add("firstBloc");
    tagBtn.appendChild(firstBloc);
    
    const tagTitle = document.createElement('h4');
    tagTitle.classList.add("tagTitle");
    tagTitle.textContent = title;
    firstBloc.appendChild(tagTitle);

    const icon = document.createElement('div');
    icon.classList.add('icon');
    icon.id=id;
    icon.addEventListener("click", function(event){
        event.preventDefault();
        // capter l'id de l'element selectionner 
        console.log()
        deuxiemeBloc.style.display = "flex";
        listTags.style.display = "flex";
    });
    firstBloc.appendChild(icon);

    const arrowIcon = document.createElement('i');
    arrowIcon.setAttribute("class", "arrowIcon fa-sharp fa-solid fa-angle-down");
    icon.appendChild(arrowIcon);
    
    // creation du deuxieme bloc 
    const deuxiemeBloc = document.createElement('div');
    deuxiemeBloc.classList.add("searchBar");
    tagBtn.appendChild(deuxiemeBloc);
    const searchBar = document.createElement('input');
    searchBar.classList.add('input');
    deuxiemeBloc.appendChild(searchBar);
    
    const tagLoupe = document.createElement('i');
    tagLoupe.setAttribute("class", "tagLoupe fa-solid fa-magnifying-glass");
    deuxiemeBloc.appendChild(tagLoupe);

    // creation du troixième bloc
    const listTags = document.createElement('div');
    listTags.classList.add("listTags");
    alltags.forEach(element => {
        const tag = document.createElement('div');
        tag.textContent=element;
        tag.classList.add("tag");
        listTags.appendChild(tag);
    });
    
    tagBtn.appendChild(listTags);


   

 window.onclick = function(event){
        const main = document.querySelector(".main");
        const dropdownList = document.querySelector(".dropdownList");
        if(event.target == main){
            deuxiemeBloc.style.display = "none";
            listTags.style.display = "none";
        }
    }



    return tagBtn;
}


init();