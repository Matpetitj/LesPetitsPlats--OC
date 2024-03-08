// Creation des cartes de recettes dans le DOM

function recipeTemplate(data) {

    const { id, image, name, servings, ingredients, time, description, appliance, ustensils} = data;

    function getRecipesCardDom (){
        let card = document.createElement('div');
        card.classList.add("card");
        card.setAttribute("id", `${id}`);

        // Entete de la carte
        let recipeHeader = document.createElement('div');
        recipeHeader.classList.add('card__recipe-header');
        card.appendChild(recipeHeader);

        let duration = document.createElement('p');
        duration.classList.add("card__recipe-header__duration");
        duration.textContent = time + 'min';
        recipeHeader.appendChild(duration);

        let recipeImg = document.createElement("img");
        recipeImg.classList.add("card__recipe-header__img")
        recipeImg.setAttribute("alt", "Photo de la recette");
        recipeImg.setAttribute("src", `./assets/images/${image}`);
        recipeHeader.appendChild(recipeImg);

        //INFOS

        let infoContainer = document.createElement('div');
        infoContainer.classList.add('card__info-container');
        card.appendChild(infoContainer);
        
        let recipeTitle = document.createElement('h3');
        recipeTitle.classList.add('card__info-container__recipe-title');
        recipeTitle.textContent = name;
        infoContainer.appendChild(recipeTitle);

        let descriptionBlock = document.createElement('div');
        descriptionBlock.classList.add('description-block');
        infoContainer.appendChild(descriptionBlock);

        let descriptionTitle = document.createElement('h4');
        descriptionTitle.classList.add('description-block__title');
        descriptionTitle.textContent = "RECETTE";
        descriptionBlock.appendChild(descriptionTitle);

        let recipeDescription = document.createElement('p');
        recipeDescription.classList.add('description-block__recipede-description');
        recipeDescription.textContent = description;
        descriptionBlock.appendChild(recipeDescription);

        let ingredientsBlock = document.createElement('div');
        ingredientsBlock.classList.add('ingredients-block');
        infoContainer.appendChild(ingredientsBlock);

        let ingredientsTitle = document.createElement('h4');
        ingredientsTitle.classList.add('ingredients-block__title');
        ingredientsTitle.textContent = "INGREDIENTS";
        ingredientsBlock.appendChild(ingredientsTitle);

        let ingredientsList = document.createElement('div');
        ingredientsList.classList.add('ingredients-block__list');
        ingredientsBlock.appendChild(ingredientsList);

        ingredients.forEach(element => {
            let ingredientListUnit = document.createElement('div');
            ingredientListUnit.classList.add('ingredient-list-unit');
            
            let ingredientName = document.createElement('h5');
            ingredientName.classList.add('ingredientName')
            ingredientName.textContent = element.ingredient;
            ingredientListUnit.appendChild(ingredientName);

            let ingredientQuantity = document.createElement('p');
            ingredientQuantity.classList.add('ingredientQuantity');
            ingredientQuantity.textContent = element.quantity+element.unit;
            ingredientListUnit.appendChild(ingredientQuantity);
            
            ingredientsList.appendChild(ingredientListUnit);

        });

    
        return card;
    }

    return { getRecipesCardDom };
}

