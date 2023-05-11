let backButton = document.querySelector('#back-button');
let editButton = document.querySelector('#edit-button');
let recipeId = new URLSearchParams(window.location.search).get('recipe');

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
    // Apply data to html fields
}