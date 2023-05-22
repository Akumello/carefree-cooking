// Bugs:
// Edit and delete buttons stack when instruction text takes up two lines
// Need to adjust edit to only work on one at a time

import { Recipe } from "./recipe.js";

/***** Data to collect from user *****/
let recipeName = 'Mexican Rice';
let category = 'Mexican';
let version = '1.0';
let ingredientList = ['Jasmine Rice', 'Tomato', 'Onion'];
let instructionList = ['Blend onion, garlic, tomatoes, salt, and chicken boullion', 'Toast rice in oil over medium heat for about 7 mins until slightly golden.', 'Added blended mixture to toasted rice', 'Bring to a boil. Give one last stir, reduce heat to low, cover with lid and simmer for 15 mins.', 'Fluff rice and let rest for another 10 minutes before serving.'];
/*************************************/

// ^ replace this with below psuedocode
// get recipe id from url if present and pull its info from db to populate as above
// if not present use above data in dev, but should be blank in production
let recipeId = new URLSearchParams(window.location.search).get('recipe');

/*********** HTML Elements ***********/
let recipeNameInput = document.querySelector('#recipe-name');

let ingredientListElem = document.querySelector('#ingredient-list');
let addIngredientTextArea = document.querySelector('#add-ingredient-input');
let addIngredientButton = document.querySelector('#add-ingredient-button');

let instructionListElem = document.querySelector('#instruction-list');
let addInstructionTextArea = document.querySelector('#add-instruction-input');
let addInstructionButton = document.querySelector('#add-instruction-button');

let saveButton = document.querySelector('#save-button');
let cancelButton = document.querySelector('#cancel-button');
/*************************************/

let recipe;

if(recipeId)
{
    // fetch recipe info
    // Pull recipe data from DB
    let recipeData = requestRecipes(`http://localhost:8080/recipe/listing/${recipeId}`);
    recipeData.then(recipeFromDb => 
    {
        recipe = new Recipe(recipeFromDb.name, recipeFromDb.category, recipeFromDb.version);
        recipeName = recipe.name;
        recipeNameInput.value = recipeName;
        category = recipe.category;
        version = recipe.version;

        let steps = requestRecipes(`http://localhost:8080/step/listing/${recipeId}`);
        steps.then(steps => 
        {
            instructionList = [];

            steps.forEach(step => 
            {
                instructionList.push(step.instruction);
                
            });

            // ingredints code
            let ingredients = requestRecipes(`http://localhost:8080/ingredient/listing/${recipeId}`);
            ingredients.then(ingredients => 
            {
                ingredientList = [];
                ingredients.forEach(ingredient => 
                {
                    ingredientList.push(ingredient.name);
                    
                });
                console.log(ingredientList);
                updateListElement(ingredientList, ingredientListElem);
updateListElement(instructionList, instructionListElem);
            });
        });

    });
}

// Generate html li element for the list
function createListItem(text, id, isBulleted)
{
    let li = document.createElement('li');
    li.setAttribute('class', 'list-group-item d-flex justify-content-between');
    li.setAttribute('id', `li-${id}`);

    let liBullet = String(Number(id)+1) + ".";
    if(isBulleted)
    {
        liBullet = "&#8226;";
    }

    li.innerHTML = `<div>${liBullet} ${text}</div><div class="d-none">${liBullet} <input type="text" value="${text}" id="input-${id}" size="65"></input></div><div style="cursor: pointer;"><i class="fas fa-edit p-1"></i><i class="fas fa-save p-1 px-2 d-none"></i><i class="fas fa-trash-alt p-1"></i></div>`;
        /*
            <div>${Number(id)+1}. ${text}</div>
            <div class="d-none">
                ${Number(id)+1}. 
                <input type="text" value="${text}" id="input-${id} size="75""></input>
            </div>
            <div style="cursor: pointer;">
                <i class="fas fa-edit p-1"></i>
                <i class="fas fa-save p-1 px-2 d-none"></i>
                <i class="fas fa-trash-alt p-1"></i>
            </div>
        */

    return li;
}

// updateListElement(ingredientList)
// run createlistitem on each elem of the main array
// set the innertext of ul to the generated html data
function updateListElement(list, listHtmlElem)
{
    //* Clear the current elements
    while(listHtmlElem.firstChild) 
    {
        listHtmlElem.removeChild(listHtmlElem.firstChild);
    }

    let isBulleted = true; // Assume numbered list for new list types
    if(listHtmlElem.id == 'ingredient-list')
        isBulleted = true;
    else if(listHtmlElem.id == 'instruction-list')
        isBulleted = false;

    let newList = [...list];
    // Display the todo list
    let i = 0;
    list.forEach(item => 
    {
        if(item === newList[0])
        {
            listHtmlElem.appendChild(createListItem(item, `${i}`, isBulleted));
            newList.shift();
        }
        i++;
    });
    //*/
}

function removeRedBorder(htmlElem)
{
    if(htmlElem.classList.contains('border-danger'))
    {
        htmlElem.classList.remove('border-danger');
        htmlElem.classList.remove('border-2');
        htmlElem.classList.add('border-primary');
    }
}

function addItem(list, listHtmlElem, textAreaToClear)
{
    // Skip if user entered nothing
    const item = textAreaToClear.value;
    if(!item) { return; }

    removeRedBorder(textAreaToClear);

    textAreaToClear.value = '';
    list.push(item);
    updateListElement(list, listHtmlElem);
}


// Run addItem when the add item button is clicked or the user hits enter inside the text area
addIngredientButton.addEventListener('click', () => 
{
        addItem(ingredientList, ingredientListElem, addIngredientTextArea)
});

addIngredientTextArea.addEventListener('keyup', e => 
{
    if(e.keyCode === 13) {
        addItem(ingredientList, ingredientListElem, addIngredientTextArea);
    }
});

// Run addItem when the add item button is clicked or the user hits enter inside the text area
addInstructionButton.addEventListener('click', () => 
{
        addItem(instructionList, instructionListElem, addInstructionTextArea);
    }
);
addInstructionTextArea.addEventListener('keyup', e => 
{
    if(e.keyCode === 13) {
        addItem(instructionList, instructionListElem, addInstructionTextArea);
    }
});

recipeNameInput.addEventListener('input', e => 
{
    if(recipeNameInput.classList.contains('border-danger'))
    {
        recipeNameInput.classList.remove('border-danger');
        recipeNameInput.classList.remove('border-2');
        recipeNameInput.classList.add('border-primary');
    }

    recipeName = recipeNameInput.value;
});

// Remove focus from the recipe name input when enter is pressed
recipeNameInput.addEventListener('keyup', e => 
{
    if(e.keyCode === 13)
        recipeNameInput.blur();
});

function deleteItem(clicked, list, listHtmlElem)
{
    // Get index of the item to remove
    const num = /\d+/;
    const index = clicked.parentNode.parentNode.id.match(num);

    // Remove the item from the todo list
    list.splice(index, 1);

    updateListElement(list, listHtmlElem);
}

function saveItem(clicked, list, listHtmlElem)
{
    // Get index of the item to edit
    const num = /\d+/;
    const liElement = clicked.parentNode.parentNode;
    const index = liElement.id.match(num);

    // Remove the item from the todo list
    let newListEntry = liElement.querySelector(`#input-${index}`).value;
    // extract newListEntry from the input field
    list.splice(index, 1, `${newListEntry}`);

    updateListElement(list, listHtmlElem);
}

function editItem(clicked, list, listHtmlElem)
{
    // Switch the sibling div to an input text field and change edit button to a save button
    clicked.classList.add('d-none');
    clicked.nextSibling.classList.remove('d-none');
    clicked.parentNode.parentNode.firstChild.nextSibling.classList.remove('d-none');
    clicked.parentNode.parentNode.firstChild.setAttribute('class', 'd-none');

    clicked.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.select();
    clicked.parentNode.parentNode.firstChild.nextSibling.firstChild.nextSibling.addEventListener('keyup', e => 
    {
        if(e.keyCode === 13) 
        {
            saveItem(clicked, list, listHtmlElem);
        }
    });
}

//######## Save, Edit, and Delete button functionality ########//
ingredientListElem.addEventListener('click', e => 
{   
    // Delete button
    if(e.target.classList.contains('fa-trash-alt'))
        deleteItem(e.target, ingredientList, ingredientListElem);

    // Save button
    if(e.target.classList.contains('fa-save'))
        saveItem(e.target, ingredientList, ingredientListElem);

    // Edit button
    if(e.target.classList.contains('fa-edit'))
        editItem(e.target, ingredientList, ingredientListElem);
});

instructionListElem.addEventListener('click', e => 
{
    // Delete button
    if(e.target.classList.contains('fa-trash-alt'))
        deleteItem(e.target, instructionList, instructionListElem);

    // Save button
    if(e.target.classList.contains('fa-save'))
        saveItem(e.target, instructionList, instructionListElem);

    // Edit button
    if(e.target.classList.contains('fa-edit'))
        editItem(e.target, instructionList, instructionListElem);
});

saveButton.addEventListener('click', e => 
{
    let infoMissing = false;

    // Check for recipe name
    if (!recipeName)
    {
        recipeNameInput.classList.remove('border-primary');
        recipeNameInput.classList.add('border-danger');
        recipeNameInput.classList.add('border-2');
        infoMissing = true;
    }

    // Check for at least one ingredient
    if (ingredientList.length == 0)
    {
        addIngredientTextArea.classList.remove('border-primary');
        addIngredientTextArea.classList.add('border-danger');
        addIngredientTextArea.classList.add('border-2');
        infoMissing = true;
    }

    // Check for at least one instruction
    if (instructionList.length == 0)
    {
        addInstructionTextArea.classList.remove('border-primary');
        addInstructionTextArea.classList.add('border-danger');
        addInstructionTextArea.classList.add('border-2');
        infoMissing = 0; // instructions not a requirement at the moment
    }

    // Cancel operation if the user is missing required data
    if(infoMissing)
        return;

    // Make json
    let recipeJSON = generateJSON();
    console.log(recipeJSON);

    // Send request
    let resourceUrl = `http://localhost:8080/recipe/saveAll`;
    let sendResult = sendRecipe(resourceUrl, recipeJSON);

    // Go to recipe view on success
    sendResult.then(result => 
    {
        window.open('recipe_menu.html', '_self');
    });
});

cancelButton.addEventListener('click', e => 
{
    // Go to recipe menu
    window.open('/recipe_menu.html', '_self');
});

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

function sendRecipe(resourceUrl, recipe)
{
    let GetStepInstructions = async () =>
    {
        let response = await fetch(resourceUrl, 
        { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: recipe
        }); 
        let data = await response.json();
    }
    return GetStepInstructions();
}

function generateJSON()
{
    let json = JSON.stringify
    (
        {
            'name': recipeName, 
            'category': category, 
            'version': version,
            'ingredients': ingredientList.map((ingredient,i) => ({name: ingredient})),
            'instructions': instructionList.map((instruction,i) => ({step_number: i+1, instruction: instruction}))
        }
    );

    return json;
}

updateListElement(ingredientList, ingredientListElem);
updateListElement(instructionList, instructionListElem);
generateJSON();