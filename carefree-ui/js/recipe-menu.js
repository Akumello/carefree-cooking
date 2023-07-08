import * as urls from './urls.js';

let recipeList = document.querySelector('#recipe-list');
let addRecipeButton = document.querySelector('#add-recipe-button');

// Go to add page when user selects add button
addRecipeButton.addEventListener('click', e => {
    window.open(urls.recipeAddUrl, '_self');
});

// Go to OR delete recipe when recipe list row is selected
recipeList.addEventListener('click', e => {
    // Identify whether the recipe button or the delete button was selected
    let clickType = e.target.id.split('-')[0];
    let recipeId = e.target.id.split('-')[1];

    if(clickType === 'recipe') {
        // Open view page and send recipe id to it
        window.open(urls.recipeViewerUrl + '?recipe=' + encodeURIComponent(recipeId), '_self');
    }
    if(clickType === 'delete') {
        // Db remove request
        let rec = deleteRecipe(`http://localhost:8080/recipe/delete/${recipeId}`);

        // Refresh after removal
        rec.finally(recipe => {
            updateList();
        });
    }
});

function updateList() {
    // Get full list of recipes
    let recipeData = requestRecipes(`http://localhost:8080/recipe/listing/all`);

    // Clear current list and rebuild with latest data
    recipeData.then((recipes) => {
        recipeList.innerHTML = '';
        recipes.forEach((recipe, i) => {
            recipeList.innerHTML += MakeRecipeRow(i, recipe.id, recipe.name).innerHTML;
        });
    });
}

function MakeRecipeRow(index, recipeId, recipeName) {
    // Could also start with a template and access via .content rather than .firstElementChild, but some old browser do not support it
    let row = document.createElement('div');
    row.innerHTML = `<button class="recipe-select text-left" id="recipe-${recipeId}">${index+1}. ${recipeName}</button><button class="fas fa-trash-alt button delete-btn" id="delete-${recipeId}"></button>`;
    //`<div class="d-flex"><button class="btn btn btn-outline-primary text-start mb-2 p-3 container-fluid" id="recipe-${recipeId}"><span>${index+1}. ${recipeName}</span></button><button class="btn btn-outline-primary text-start mx-1 mb-2 p-3 fas fa-trash-alt" id="delete-${recipeId}"></button></div>`;
    return row;
}

// Request all recipes from endpoint "recipe/listing/all"
function requestRecipes(resourceUrl) {
    let GetRecipes = async () => {
        let allRecipeData = await fetch(resourceUrl, { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        return await allRecipeData.json();
    }
    return GetRecipes();
}

// Request delete at end point "recipe/delete/${recipeId}"
function deleteRecipe(resourceUrl) {
    let DeleteRecipe = async () => {
        let response = await fetch(resourceUrl, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
    return DeleteRecipe();
}

updateList();