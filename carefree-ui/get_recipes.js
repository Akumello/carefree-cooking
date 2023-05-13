let recipeList = document.querySelector('#recipe-list');
let addRecipeButton = document.querySelector('#add-recipe-button');

addRecipeButton.addEventListener('click', e => 
{
    window.open('add_recipe.html', '_self');
});

recipeList.addEventListener('click', e => 
{
    let clickType = e.target.id.split('-')[0];

    // Need to modify js to use db id in html id
    let recipeId = e.target.id.split('-')[1];

    if(clickType === 'recipe')
    {
        // Open recipe_view.html and send recipe id to it to open
        window.open('recipe_view.html?recipe=' + encodeURIComponent(recipeId), '_self');
    } 
    
    if(clickType === 'delete')
    {
        // Get recipe id
        // remove from db
        // refresh page
        console.log('del');
    }
});

// get list of recipes from backend
let recipeData = requestRecipes(`http://localhost:8080/recipe/listing/all`);
recipeData.then((recipes) => 
{
    recipes.forEach((recipe, i) => 
    {
        recipeList.appendChild(MakeButton(i, recipe.id, recipe.name));
    });

    console.log(recipes)
});

function MakeButton(index, recipeId, recipeName)
{
    // Could also start with a template and access via .content rather than .firstElementChild, but some old browser do not support it
    let button = document.createElement('div');
    button.innerHTML = `<div class="d-flex"><button class="btn btn btn-outline-primary text-start mb-2 p-3 container-fluid" id="recipe-${recipeId}"><span>${index+1}. ${recipeName}</span></button><button class="btn btn-outline-primary text-start mx-1 mb-2 p-3 fas fa-trash-alt" id="delete-${recipeId}"></button></div>`;
    return button.firstElementChild;
}

function requestRecipes(resourceUrl)
{
    let GetRecipes = async () =>
    {
        let response = await fetch(resourceUrl,
        { 
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        let data = await response.json();
        
        let recipes = [data[0]];
        for (let i = 1; i < data.length; i++)
        {
            const recipe = data[i];
            recipes.push(recipe);
        }

        return recipes;
    }
    return GetRecipes();
}