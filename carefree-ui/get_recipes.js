let recipeList = document.querySelector('#recipe-list');

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

function MakeButton(id, title)
{
    let child = document.createElement('div');
    child.setAttribute('class', 'd-flex');
    child.setAttribute('class', 'justify-content-between');
    child.innerHTML = `<div class="btn btn-outline-secondary mb-2 py-3 px-5 text-right" id="recipe-btn-${id}"><h5>${id+1}. ${title}</h5></div><div></div>`;
    return child;
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