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
let recipes = requestRecipes(`http://localhost:8080/recipe/listing/all`);
recipes.then((recipeNames) => 
{
    recipeNames.forEach((recipeName, i) => 
        {
            recipeList.appendChild(MakeButton(i, recipeName));
        });
    console.log(recipeNames)
});

function MakeButton(id, recipeName)
{
    // Could also start with a template and access via .content rather than .firstElementChild, but some old browser do not support it
    let button = document.createElement('div');
    button.innerHTML = `<div class="d-flex"><button class="btn btn btn-outline-primary text-start mb-2 p-3 container-fluid" id="recipe-${id}"><span>${id+1}. ${recipeName}</span></button><button class="btn btn-outline-primary text-start mx-1 mb-2 p-3 fas fa-trash-alt" id="delete-${id}"></button></div>`;
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
        
        let recipeNames = [data[0].name];
        for (let i = 1; i < data.length; i++)
        {
            const recipe = data[i];
            recipeNames.push(recipe.name);
        }

        return recipeNames;
    }
    return GetRecipes();
}