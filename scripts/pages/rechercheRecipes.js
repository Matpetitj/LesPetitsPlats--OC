function simpleSearch(stringStr, listRecipes) {
    const lowerCaseInput = stringStr.toLowerCase().trim();
    const result = [];
    // Boucle for pour parcourir les recettes
    for (let i = 0; i < listRecipes.length; i++) {
      // Vérifier si le nom ou la description de la recette correspond
      if (listRecipes[i].name.toLowerCase().includes(lowerCaseInput) ||
      listRecipes[i].description.toLowerCase().includes(lowerCaseInput) ||
          someNative(lowerCaseInput, listRecipes[i].ingredients)) {
            result.push(listRecipes[i]);
        }
    }
    return result;
  }

  function someNative(lowerCaseInput, ingredients){
    for (let j = 0; j < ingredients.length; j++) {
        if (ingredients[j].ingredient.toLowerCase().includes(lowerCaseInput)) {
          return true;// Sortir de la boucle dès qu'un match est trouvé
        }
      }
    return false; 
  }

function avancedSearch(listSelectedIng, listSelectedUst, listSelectedApp, listRecipes) {

  let listRecipeTemp = listRecipes;

  // Boucle native pour les ingrédients
  for (let i = 0; i < listSelectedIng.length; i++) {
      const ingredient = listSelectedIng[i];
      // Vérifier si cet ingrédient existe dans les ingrédients des recettes
      listRecipeTemp = searchByIng(ingredient, listRecipeTemp);
  }

  // Boucle native pour les ustensiles
  for (let j = 0; j < listSelectedUst.length; j++) {
      const ustensil = listSelectedUst[j];
      // Vérifier si cet ustensile existe dans les ustensiles des recettes
      listRecipeTemp = searchByUst(ustensil, listRecipeTemp);
  }

  // Boucle native pour les appareils
  for (let k = 0; k < listSelectedApp.length; k++) {
      const appliance = listSelectedApp[k];
      // Vérifier si cet appareil existe dans les appareils des recettes
      listRecipeTemp = searchByAll(appliance, listRecipeTemp);
  }

  return listRecipeTemp;
}

function searchByIng(stringStr, listRecipes) {
  const lowerCaseInput = stringStr.toLowerCase().trim();
  const result = [];

  // Boucle pour filtrer les recettes
  for (let i = 0; i < listRecipes.length; i++) {
      const recipe = listRecipes[i];
      let matchFound = false;

      // Boucle pour vérifier les ingrédients de la recette
      for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j];
          if (ingredient.ingredient.toLowerCase().includes(lowerCaseInput)) {
              matchFound = true;
              break; // Pas besoin de vérifier d'autres ingrédients si un match est trouvé
          }
      }

      if (matchFound) {
          result.push(recipe);
      }
  }

  return result;
}

function searchByAll(stringStr, listRecipes) {
  const lowerCaseInput = stringStr.toLowerCase().trim();
  const result = [];

  // Boucle pour filtrer les recettes
  for (let i = 0; i < listRecipes.length; i++) {
      const recipe = listRecipes[i];
      if (recipe.appliance.toLowerCase().includes(lowerCaseInput)) {
          result.push(recipe);
      }
  }

  return result;
}

function searchByUst(stringStr, listRecipes) {
  const lowerCaseInput = stringStr.toLowerCase().trim();
  const result = [];

  // Boucle pour filtrer les recettes
  for (let i = 0; i < listRecipes.length; i++) {
      const recipe = listRecipes[i];
      let matchFound = false;

      // Boucle pour vérifier les ustensiles de la recette
      for (let j = 0; j < recipe.ustensils.length; j++) {
          const ustensil = recipe.ustensils[j];
          if (ustensil.toLowerCase().includes(lowerCaseInput)) {
              matchFound = true;
              break; // Pas besoin de vérifier d'autres ustensiles si un match est trouvé
          }
      }

      if (matchFound) {
          result.push(recipe);
      }
  }

  return result;
}