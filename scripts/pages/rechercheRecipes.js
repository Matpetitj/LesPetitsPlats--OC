function simpleSearch(stringStr, listRecipes){
    
  const lowerCaseInput = stringStr.toLowerCase().trim();

  // Filtrer les recettes qui correspondent à la requête
  const result = listRecipes.filter(
    (recipe) =>
      // Vérifier si le nom de la recette correspond
      recipe.name.toLowerCase().includes(lowerCaseInput) ||
      recipe.description.toLowerCase().includes(lowerCaseInput) ||
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(lowerCaseInput)
      )
  );

  return result;

}
function avancedSearch(listSelectedIng, listSelectedUst, listSelectedApp, listRecipes){

    let listRecipeTemp =listRecipes;
    //chercher la liste des recette disposant des ingredients suivants: 
    listSelectedIng.forEach(ingredient => {
        // verifer si cet ing existe dans les ing de la liste des recettes
        listRecipeTemp = serachByIng(ingredient, listRecipeTemp);
    });

    //chercher la liste des recette disposant des ustinsils suivants: 
    listSelectedUst.forEach(ustensil => {
        // verifer si cet ust existe dans les ust de la liste des recettes
        listRecipeTemp = serachByUst(ustensil, listRecipeTemp);
    });

    //chercher la liste des recette disposant des appliances suivants: 
    listSelectedApp.forEach(appliance => {
        // verifer si cet app existe dans les app de la liste des recettes
        listRecipeTemp = serachByAll(appliance, listRecipeTemp);
    });

    return listRecipeTemp;
}


function serachByIng(stringStr, listRecipes) {
    const lowerCaseInput = stringStr.toLowerCase().trim();
    // Filtrer les recettes qui correspondent à la requête
    const result = listRecipes.filter((recipe) =>
      recipe.ingredients.some((ingredient) =>
        ingredient.ingredient.toLowerCase().includes(lowerCaseInput)
      )
    );
  
    return result;
  }
  
  function serachByAll(stringStr, listRecipes) {
    const lowerCaseInput = stringStr.toLowerCase().trim();
    // Filtrer les recettes qui correspondent à la requête
    const result = listRecipes.filter((recipe) =>
      recipe.appliance.toLowerCase().includes(lowerCaseInput)
    );
  
    return result;
  }
  
  function serachByUst(stringStr, listRecipes) {
    const lowerCaseInput = stringStr.toLowerCase().trim();
    // Filtrer les recettes qui correspondent à la requête
    const result = listRecipes.filter((recipe) =>
      recipe.ustensils.some((ustinsil) =>
        ustinsil.toLowerCase().includes(lowerCaseInput)
      )
    );
  
    return result;
  }