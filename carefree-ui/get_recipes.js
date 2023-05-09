let recipeList = document.querySelector('#recipe-list');
let addRecipeButton = document.querySelector('#add-recipe-button');

addRecipeButton.addEventListener('click', e => 
{
    window.open('add_recipe.html', '_self');
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
    button.innerHTML = `<button class="btn btn-outline-secondary text-start mb-2 p-3" id="recipe-btn-${id}"><span>${id+1}. ${recipeName}</span></button>`;
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