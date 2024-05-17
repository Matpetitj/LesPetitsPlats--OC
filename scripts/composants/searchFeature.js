// ----------------- //
// Recherche INPUT

let filtredTable = recipes;

// Fonction pour gérer la recherche des tags

function inputsListener(){
    document.getElementById('mainSearchBar').addEventListener('input', function (e) {
        e.preventDefault();
        let inputValue = this.value;
        if (inputValue.length > 0) {
          document.getElementById('delete').style.display = 'block';
        } 
        if (inputValue.length >= 3) {
            filtredTable = simpleSearch(inputValue);
          displayData(filtredTable);
        }
    });
}

function simpleSearch(searchString){
    // Convertir la chaîne de recherche en minuscules pour la comparaison
    const searchLowerCase = searchString.toLowerCase();
    // Filtrer les recettes en fonction de la chaîne de recherche
    const filtredRecipes = recipes.filter(recipe => {
      // Vérifier si la c haîne de recherche est présente dans le titre, la description ou la liste des ingrédients
      return (
        recipe.name.toLowerCase().includes(searchLowerCase) ||
        recipe.description.toLowerCase().includes(searchLowerCase) ||
        recipe.ingredients.some(
          ingredient =>
            ingredient.ingredient.toLowerCase().includes(searchLowerCase)
        ) )
    });
    return filtredRecipes;
}

// FONCTION SEARCH: INGREDIENTS
function searchByIngredients(searchString, listRecipes) {
  let allFiltersRegrouped = listRecipes.filter(card => (
    card.ingredients.some(element => element.ingredient.toLowerCase().includes(searchString))
  ));
  return allFiltersRegrouped;
}
// FONCTION SEARCH: APPAREILS 
function searchByAppliances(searchString, listRecipes) {
  let allFiltersRegrouped = listRecipes.filter(card => (
    card.appliance.toLowerCase().includes(searchString)
  ));
  return allFiltersRegrouped;
}
// FONCTION SEARCH: USTENSILS
function searchByUstensils(searchString, listRecipes) {
  console.log(searchString, listRecipes);
  let allFiltersRegrouped = listRecipes.filter(card => (
    card.ustensils.some(element => element.toLowerCase().includes(searchString))
  ));
  return allFiltersRegrouped;
}

function advancedSearch(listRecipes) {
  // INITIALISE VARIABLE "result"
  result = listRecipes;
  // FILTRES APPLIQUES 1 PAR 1, DE "INGREDIENTS" A "USTENSILS"
  tagsIngredient.forEach(tag => {
    result = searchByIngredients(tag, result); 
  });
  tagsAppliance.forEach(tag => {
    result = searchByAppliances(tag, result);
  });
  tagsUstensils.forEach(tag => {
    result = searchByUstensils(tag, result);
  });
  return result;
}