// Bugs:
// Need to adjust edit to only work on one at a time
// font awesome not working when paired with font-family css

import { Recipe } from "./recipe.js";
import * as urls from "./urls.js";

/***** Data to collect from user *****/
let recipeName = 'Mexican Rice';
let category = 'Mexican';
let version = '1.0';

let ingredientMap = new Map([[1, 'Jasmine Rice'], 
    [2, 'Tomato'], 
    [3, 'Onion']]
);
let ingredientList = ['Jasmine Rice', 'Tomato', 'Onion'];

let instructionMap = new Map([[1, 'Blend onion, garlic, tomatoes, salt, and chicken boullion'],
    [2, 'Toast rice in oil over medium heat for about 7 mins until slightly golden.'],
    [3, 'Added blended mixture to toasted rice'],
    [4, 'Bring to a boil. Give one last stir, reduce heat to low, cover with lid and simmer for 15 mins.'],
    [5, 'Fluff rice and let rest for another 10 minutes before serving.']]
);
let instructionList = ['Blend onion, garlic, tomatoes, salt, and chicken boullion', 'Toast rice in oil over medium heat for about 7 mins until slightly golden.', 'Added blended mixture to toasted rice', 'Bring to a boil. Give one last stir, reduce heat to low, cover with lid and simmer for 15 mins.', 'Fluff rice and let rest for another 10 minutes before serving.'];
/*************************************/

// Get recipeId from url, if present, and pull its info from db to populate above variables
// If not present, use above pre-populated data for development, but will be blank in production
let recipeId = new URLSearchParams(window.location.search).get('recipe');
if (recipeId == null)
    recipeId = "";

/*********** HTML Elements ***********/
let recipeNameInput = document.querySelector('#recipe-name');
recipeNameInput.value = recipeName; // Remove for production

let ingredientListElem = document.querySelector('#ingredient-list');
let addIngredientTextArea = document.querySelector('#add-ingredient-input');
let addIngredientButton = document.querySelector('#add-ingredient-btn');

let instructionListElem = document.querySelector('#instruction-list');
let addInstructionTextArea = document.querySelector('#add-instruction-input');
let addInstructionButton = document.querySelector('#add-instruction-btn');

let saveButton = document.querySelector('#save-btn');
let cancelButton = document.querySelector('#cancel-btn');
/*************************************/

// updateListElement(ingredientList)
// run createlistitem on each elem of the main array
// set the innertext of ul to the generated html data
function updateListElement(list, listHtmlElem) {
    // Clear the current elements
    while(listHtmlElem.firstChild)
        listHtmlElem.removeChild(listHtmlElem.firstChild);

    // Display the todo list
    let newList = Array.from(list.values());
    let i = 0;
    list.forEach(item => {
        if(item === newList[0]) {
            listHtmlElem.appendChild(createListItem(item, `${i}`));
            newList.shift();
        }
        i++;
    });
    //*/
}

// Generate html li element for the list
function createListItem(text, id) {
    let li = document.createElement('li');
    li.setAttribute('id', `li-${id}`);
    li.classList.add('border-bottom');
    li.innerHTML = `<div class="flex-display"><div class="flex-1">${text}</div><input type="text" value="${text}" id="input-${id}" class="flex-1 d-none"><div style="cursor: pointer;"><i class="fas fa-edit li-btn"></i><i class="fas fa-save li-btn d-none"></i><i class="fas fa-trash-alt li-btn"></i></div></div>`;
       /*
            <div class="flex-display">
                <div class="flex-1">${text}</div>
                <input type="text" value="${text}" id="input-${id}" class="flex-1 d-none">
                <div>
                    <i class="fas fa-edit li-btn"></i>
                    <i class="fas fa-save li-btn d-none"></i>
                    <i class="fas fa-trash-alt li-btn"></i>
                </div>
            </div>
       */

    return li;
}

function addItem(itemMap, listHtmlElem, textAreaToClear) {
    // Skip if user entered nothing
    const item = textAreaToClear.value;
    if(!item) { return; }

    if(textAreaToClear.classList.contains('border-error'))
        textAreaToClear.classList.remove('border-error');

    textAreaToClear.value = '';

    let keysList = Array.from(itemMap.keys());
    const nextKey = keysList[keysList.length - 1] + 1;
    itemMap.set(nextKey, item);
    updateListElement(itemMap, listHtmlElem);
}

// Run addItem when the add item button is clicked or the user hits enter inside the text area
addIngredientButton.addEventListener('click', () => {
        addItem(ingredientMap, ingredientListElem, addIngredientTextArea)
});

addIngredientTextArea.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
        addItem(ingredientMap, ingredientListElem, addIngredientTextArea);
    }
});

// Run addItem when the add item button is clicked or the user hits enter inside the text area
addInstructionButton.addEventListener('click', () => {
        addItem(instructionMap, instructionListElem, addInstructionTextArea);
}
);
addInstructionTextArea.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
        addItem(instructionMap, instructionListElem, addInstructionTextArea);
    }
});

recipeNameInput.addEventListener('input', e => {
    if(recipeNameInput.classList.contains('border-error')) {
        recipeNameInput.classList.remove('border-error');
    }
    recipeName = recipeNameInput.value;
});

// Remove focus from the recipe name input on enter
recipeNameInput.addEventListener('keyup', e => {
    if(e.keyCode === 13)
        recipeNameInput.blur();
});

function deleteItem(clicked, itemMap, listHtmlElem) {
    // Get index of the item to remove
    const num = /\d+/;
    const index = clicked.parentNode.parentNode.parentNode.id.match(num);
    let key = Array.from(itemMap.keys())[index];

    // Remove the item from the item map
    itemMap.delete(key);

    updateListElement(itemMap, listHtmlElem);
}

function saveItem(clicked, itemMap, listHtmlElem) {
    // Get index of the item to edit
    const num = /\d+/;
    const liElement = clicked.parentNode.parentNode.parentNode;
    const index = liElement.id.match(num);
    let key = Array.from(itemMap.keys())[index];

    // Get the new item entered by the user
    let newItem = liElement.querySelector(`#input-${index}`).value;
    
    itemMap.set(key, newItem);

    updateListElement(itemMap, listHtmlElem);
}

function editItem(clicked, itemMap, listHtmlElem) {
    // Switch the sibling div to an input text field and change edit button to a save button
    clicked.classList.add('d-none');
    clicked.nextSibling.classList.remove('d-none');

    let li = clicked.parentNode.parentNode.parentNode;
    let itemNameLocked = li.firstChild.firstChild;
    let itemNameUnlocked = itemNameLocked.nextSibling;
    
    itemNameUnlocked.classList.remove('d-none');
    itemNameLocked.setAttribute('class', 'd-none');

    itemNameUnlocked.select();
    itemNameUnlocked.addEventListener('keyup', e => {
        if(e.keyCode === 13) {
            saveItem(clicked, itemMap, listHtmlElem);
        }
    });
}

//######## Save, Edit, and Delete button functionality ########//
ingredientListElem.addEventListener('click', e => {
    // Delete button
    if(e.target.classList.contains('fa-trash-alt'))
        deleteItem(e.target, ingredientMap, ingredientListElem);

    // Save button
    if(e.target.classList.contains('fa-save'))
        saveItem(e.target, ingredientMap, ingredientListElem);

    // Edit button
    if(e.target.classList.contains('fa-edit'))
        editItem(e.target, ingredientMap, ingredientListElem);
});

instructionListElem.addEventListener('click', e => {
    // Delete button
    if(e.target.classList.contains('fa-trash-alt'))
        deleteItem(e.target, instructionMap, instructionListElem);

    // Save button
    if(e.target.classList.contains('fa-save'))
        saveItem(e.target, instructionMap, instructionListElem);

    // Edit button
    if(e.target.classList.contains('fa-edit'))
        editItem(e.target, instructionMap, instructionListElem);
});

saveButton.addEventListener('click', e => {
    let infoMissing = false;

    // Check for recipe name
    if (!recipeName) {
        recipeNameInput.classList.add('border-error');
        infoMissing = true;
    }

    // Check for at least one ingredient
    if (ingredientMap.length == 0) {
        addIngredientTextArea.classList.add('border-error');
        infoMissing = true;
    }

    // Check for at least one instruction
    // infoMissing not set because instructions are not a requirement
    if (instructionMap.length == 0)
        addInstructionTextArea.classList.add('border-error');

    // Cancel operation if the user is missing required data
    if(infoMissing)
        return;

    // Send request
    let recipeJSON = getRecipeJSON();
    let resourceUrl = `${urls.baseUrl}/recipe/saveAll/${recipeId}`;
    let sendResult = sendRecipe(resourceUrl, recipeJSON);

    // Go to recipe view on success
    sendResult.then(result => {
    console.log("ran");
        if (recipeId == '') {
            recipeId = result.id;
            window.open(urls.recipeViewerUrl + `?recipe=${recipeId}`, '_self');
        }
        else {
            window.open(urls.recipeViewerUrl + `?recipe=${recipeId}`, '_self');
        }
    }).catch(e => {
        console.log(e);
    });
});

cancelButton.addEventListener('click', e => {
    window.open(urls.recipeMenuUrl, '_self');
});

function requestRecipe(resourceUrl) {
    let GetRecipe = async () => {
        let response = await fetch(resourceUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        }); 
        return await response.json();
    }
    return GetRecipe();
}

async function sendRecipe(resourceUrl, recipe) {
    try {
        let response = await fetch(resourceUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: recipe
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        let data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

function getRecipeJSON() {
    let ingredients = [];
    let instructions = [];

    ingredientMap.forEach((name, id) => {
        ingredients.push({name: name, id: id});
    });

    let i = 0;
    instructionMap.forEach((instruction, id) => {
        instructions.push({instruction: instruction, id: id, step_number: i+1});
        i++;
    });

    return JSON.stringify({
            'name': recipeName, 
            'category': category, 
            'version': version,
            'ingredients': ingredients,
            'instructions': instructions
        }
    );
}


// ######## Execution #########
if(recipeId) {
    // fetch recipe info
    // Pull recipe data from DB
    let recipeData = requestRecipe(`${urls.baseUrl}/recipe/listing/${recipeId}`);
    recipeData.then(recipeFromDb => {
        let recipe = new Recipe(recipeId, recipeFromDb.name, recipeFromDb.category, recipeFromDb.version);
        recipeName = recipe.name;
        recipeNameInput.value = recipeName;
        category = recipe.category;
        version = recipe.version;

        let dbIntructions = requestRecipe(`${urls.baseUrl}/step/listing/${recipeId}`);
        dbIntructions.then(dbIntructions => {
            instructionMap.clear();
            dbIntructions.forEach(dbInstrucion => {
                instructionMap.set(dbInstrucion.id, dbInstrucion.instruction);
            });

            // ingredints code
            let dbIngredients = requestRecipe(`${urls.baseUrl}/ingredient/listing/${recipeId}`);
            dbIngredients.then(dbIngredients => {
                ingredientMap.clear();
                dbIngredients.forEach(dbIngredient => {
                    ingredientMap.set(dbIngredient.id, dbIngredient.name);
                });

                updateListElement(ingredientMap, ingredientListElem);
                updateListElement(instructionMap, instructionListElem);

                console.log(getRecipeJSON());
            });
        });
    });
} else {
    updateListElement(ingredientMap, ingredientListElem);
    updateListElement(instructionMap, instructionListElem);
    console.log(getRecipeJSON());
}