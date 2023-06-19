import { Recipe } from "./recipe.js";

let backButton = document.querySelector('#back-button');
let editButton = document.querySelector('#edit-button');
let recipeHeader = document.querySelector('#recipe-title');
let ingredientListHtml = document.querySelector('#ingredient-list');
let stepListHtml = document.querySelector('#step-list');
let stepLoadingHtml = document.querySelector('#step-loading');
let ingredientLoadingHtml = document.querySelector('#ingredient-loading');

let recipeId = new URLSearchParams(window.location.search).get('recipe');
let recipe;



backButton.addEventListener('click', e => 
{
    window.open('recipe_menu.html', '_self');
});

editButton.addEventListener('click', e => 
{
    window.open('add_recipe.html?recipe=' + encodeURIComponent(recipeId), '_self');
});


if(recipeId)
{
    // Pull recipe data from DB
    let recipeData = requestRecipes(`http://localhost:8080/recipe/listing/${recipeId}`);
    recipeData.then(recipeFromDb => 
    {
        recipe = new Recipe(recipeFromDb.name, recipeFromDb.category, recipeFromDb.version);
        recipeHeader.textContent = recipe.name;

        let steps = requestRecipes(`http://localhost:8080/step/listing/${recipeId}`);
        steps.then(steps => 
        {
            steps.forEach(step => 
            {
                let litem = document.createElement('li');
                litem.textContent = step.instruction;
                stepListHtml.appendChild(litem);
            });

            // ingredints code
            let ingredients = requestRecipes(`http://localhost:8080/ingredient/listing/${recipeId}`);
            ingredients.then(ingredients => 
            {
                ingredients.forEach(ingredient => 
                {
                    let litem = document.createElement('li');
                    litem.textContent = ingredient.name;
                    ingredientListHtml.appendChild(litem);
                });
            });
        });

    });

    // Apply data to html fields
}

function requestRecipes(resourceUrl)
{
    let GetRecipe = async () =>
    {
        let response = await fetch(resourceUrl,
        { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        let recipe = await response.json();

        return recipe;
    }
    return GetRecipe();
}