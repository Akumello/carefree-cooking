import { Recipe } from "./recipe.js";
import * as urls from "./urls.js";

let backButton = document.querySelector('#back-btn');
let editButton = document.querySelector('#edit-btn');
let recipeHeader = document.querySelector('#recipe-title');
let ingredientListHtml = document.querySelector('#ingredient-list');
let stepListHtml = document.querySelector('#step-list');
let stepLoadingHtml = document.querySelector('#step-loading');
let ingredientLoadingHtml = document.querySelector('#ingredient-loading');
let recipeId = new URLSearchParams(window.location.search).get('recipe');

backButton.addEventListener('click', e => {
    window.open(urls.recipeMenuUrl, '_self');
});

editButton.addEventListener('click', e => {
    window.open(urls.recipeAddUrl + '?recipe=' + encodeURIComponent(recipeId), '_self');
});

// TODO: Clean up promise chaining
if(recipeId) {
    let recipeData = requestRecipeData(`${urls.baseUrl}/recipe/listing/${recipeId}`);
    recipeData.then(recipeFromDb => {
        // RECIPE METADATA
        const recipe = new Recipe(recipeId, recipeFromDb.name, recipeFromDb.category, recipeFromDb.version);
        recipeHeader.textContent = recipe.name;

        // INSTRUCTIONS
        let steps = requestRecipeData(`${urls.baseUrl}/step/listing/${recipeId}`);
        steps.then(steps => {
            steps.forEach(step => 
                addListItemToList(stepListHtml, step.instruction)
            );

            // INGREDIENTS
            let ingredients = requestRecipeData(`${urls.baseUrl}/ingredient/listing/${recipeId}`);
            ingredients.then(ingredients => {
                ingredients.forEach(ingredient =>
                    addListItemToList(ingredientListHtml, ingredient.name)
                );
            });
        });
    });
}

function addListItemToList(list, text) {
    const listItem = document.createElement('li');
    listItem.textContent = text;
    list.appendChild(listItem);
}

// Get recipe data from endpoints: "{recipe/step/ingredient}/listing/${recipeId}"
function requestRecipeData(resourceUrl) {
    let GetRecipe = async () => {
        let recipe = await fetch(resourceUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        return await recipe.json();
    }
    return GetRecipe();
}