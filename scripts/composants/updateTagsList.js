// Fonction création et mise à jour des tags sélectionnés directement dans la liste concernée
function updateListTags( element, container, tag) {
    const selectedTagContainer = document.createElement('div');
    selectedTagContainer.classList.add('selectedTagContainer');

    // création du tag sélectionné dans la liste
    const selectedTag = document.createElement('h4');
    selectedTag.classList.add('selectedTag');
    selectedTag.textContent = element;
    selectedTag.dataset.id = element;
    selectedTagContainer.appendChild(selectedTag);

    container.appendChild(selectedTagContainer);
    tag.style.display = "none";
}

// Création de la fonction de mise à jour des tags dans les étiquettes
function updateLabelTags(element, container, tagsList){
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
            updateSelectedTags(tagsList);
        })
   
}

function updateSelectedTags(tagsList){
    const tags = document.querySelectorAll('.tag');
    tags.forEach(element => {
        // console.log(element);
        if(tagsList.includes(element.dataset.tag)){
            element.style.display = 'none';
        } else {
            element.style.display = 'block';
        }
        console.log(tagsList.includes(element.dataset.tag));
    });
    // const result = advancedSearch(filtredTable);
    // filtredTable = result;
    // displayData(filtredTable);
}

// Création de la function de suppression des tags sélectionnés
function deleteTags(){
    resultTagsList.remove();
    document.querySelector(`[data-id="${element}"]`).remove();
    document.querySelector(`[data-tag="${element}"]`).style.display = "block";
    console.log(listTags);
    listTags = listTags.filter(elt => (elt != element));
    updateSelectedTags(listTags);
}