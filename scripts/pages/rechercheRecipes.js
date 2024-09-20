// function simpleSearch(stringStr, listRecipes){
    
//   const lowerCaseInput = stringStr.toLowerCase().trim();

//   // Filtrer les recettes qui correspondent à la requête
//   const result = listRecipes.filter(
//     (recipe) =>
//       // Vérifier si le nom de la recette correspond
//       recipe.name.toLowerCase().includes(lowerCaseInput) ||
//       recipe.description.toLowerCase().includes(lowerCaseInput) ||
//       recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(lowerCaseInput)
//       )
//   );

//   return result;

// }

function simpleSearch(stringStr, listRecipes) {
  const lowerCaseInput = stringStr.toLowerCase().trim();
  const result = [];

  // Boucle for pour parcourir les recettes
  for (let i = 0; i < listRecipes.length; i++) {
    const recipe = listRecipes[i];
    let matchFound = false;

    // Vérifier si le nom ou la description de la recette correspond
    if (recipe.name.toLowerCase().includes(lowerCaseInput) ||
        recipe.description.toLowerCase().includes(lowerCaseInput)) {
      matchFound = true;
    } else {
      // Boucle for pour vérifier les ingrédients
      for (let j = 0; j < recipe.ingredients.length; j++) {
        const ingredient = recipe.ingredients[j].ingredient;
        if (ingredient.toLowerCase().includes(lowerCaseInput)) {
          matchFound = true;
          break; // Sortir de la boucle dès qu'un match est trouvé
        }
      }
    }

    // Si un match est trouvé, ajouter la recette à la liste de résultats
    if (matchFound) {
      result.push(recipe);
    }
  }

  return result;
}

// function avancedSearch(listSelectedIng, listSelectedUst, listSelectedApp, listRecipes){

//     let listRecipeTemp =listRecipes;
//     //chercher la liste des recette disposant des ingredients suivants: 
//     listSelectedIng.forEach(ingredient => {
//         // verifer si cet ing existe dans les ing de la liste des recettes
//         listRecipeTemp = searchByIng(ingredient, listRecipeTemp);
//     });

//     //chercher la liste des recette disposant des ustinsils suivants: 
//     listSelectedUst.forEach(ustensil => {
//         // verifer si cet ust existe dans les ust de la liste des recettes
//         listRecipeTemp = searchByUst(ustensil, listRecipeTemp);
//     });

//     //chercher la liste des recette disposant des appliances suivants: 
//     listSelectedApp.forEach(appliance => {
//         // verifer si cet app existe dans les app de la liste des recettes
//         listRecipeTemp = searchByAll(appliance, listRecipeTemp);
//     });

//     return listRecipeTemp;
// }

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

// function searchByIng(stringStr, listRecipes) {
//     const lowerCaseInput = stringStr.toLowerCase().trim();
//     // Filtrer les recettes qui correspondent à la requête
//     const result = listRecipes.filter((recipe) =>
//       recipe.ingredients.some((ingredient) =>
//         ingredient.ingredient.toLowerCase().includes(lowerCaseInput)
//       )
//     );
  
//     return result;
//   }
  
//   function searchByAll(stringStr, listRecipes) {
//     const lowerCaseInput = stringStr.toLowerCase().trim();
//     // Filtrer les recettes qui correspondent à la requête
//     const result = listRecipes.filter((recipe) =>
//       recipe.appliance.toLowerCase().includes(lowerCaseInput)
//     );
  
//     return result;
//   }
  
//   function searchByUst(stringStr, listRecipes) {
//     const lowerCaseInput = stringStr.toLowerCase().trim();
//     // Filtrer les recettes qui correspondent à la requête
//     const result = listRecipes.filter((recipe) =>
//       recipe.ustensils.some((ustinsil) =>
//         ustinsil.toLowerCase().includes(lowerCaseInput)
//       )
//     );
  
//     return result;
//   }

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