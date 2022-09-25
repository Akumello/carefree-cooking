let ingredientListElem = document.querySelector('#ingredient-list');
let addIngredientTextArea = document.querySelector('#add-ingredient-input');
let addIngredientButton = document.querySelector('#add-ingredient-button');
let ingredientList = ['Jasmine Rice', 'Tomato', 'Onion'];

let instructionListElem = document.querySelector('#instruction-list');
let addInstructionTextArea = document.querySelector('#add-instruction-input');
let addInstructionButton = document.querySelector('#add-instruction-button');
let instructionList = ['Blend onion, garlic, tomatoes, salt, and chicken boullion', 'Toast rice in oil over medium heat for about 7 mins until slightly golden.', 'Added blended mixture to toasted rice', 'Bring to a boil. Give one last stir, reduce heat to low, cover with lid and simmer for 15 mins.', 'Fluff rice and let rest for another 10 minutes before serving.'];

// createListItem(content)
// generate html li element with text and return
function createListItem(text, id)
{
    let li = document.createElement('li');
    li.setAttribute('class', 'list-group-item d-flex justify-content-between');
    li.setAttribute('id', `li-${id}`);
    li.innerHTML = `<div>${Number(id)+1}. ${text}</div><div class="d-none">${Number(id)+1}. <input type="text" value="${text}" id="input-${id}" size="65"></input></div><div style="cursor: pointer;"><i class="fas fa-edit p-1"></i><i class="fas fa-save p-1 px-2 d-none"></i><i class="fas fa-trash-alt p-1"></i></div>`;
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
    while(listHtmlElem.firstChild) {
        listHtmlElem.removeChild(listHtmlElem.firstChild);
    }
    //*/

    let newList = [...list];

    // Display the todo list
    let i = 0;
    console.log(list);
    list.forEach(item => {
        console.log(item);
        if(item === newList[0]) {
            listHtmlElem.appendChild(createListItem(item, `${i}`));
            newList.shift();
        }
        i++;
    });
}

function addItem(list, listHtmlElem, textAreaToClear)
{
    // Skip if user entered nothing
    const item = textAreaToClear.value;
    if(!item) { return; }

    textAreaToClear.value = '';
    list.push(item);
    updateListElement(list, listHtmlElem);
}


// Run addItem when the add item button is clicked or the user hits enter inside the text area
addIngredientButton.addEventListener('click', () => {
        addItem(ingredientList, ingredientListElem, addIngredientTextArea)
    }
);
addIngredientTextArea.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
        addItem(ingredientList, ingredientListElem, addIngredientTextArea);
    }
});

// Run addItem when the add item button is clicked or the user hits enter inside the text area
addInstructionButton.addEventListener('click', () => {
        addItem(instructionList, instructionListElem, addInstructionTextArea);
    }
);
addInstructionTextArea.addEventListener('keyup', e => {
    if(e.keyCode === 13) {
        addItem(instructionList, instructionListElem, addInstructionTextArea);
    }
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
    let newToDo = liElement.querySelector(`#input-${index}`).value;
    // extract newToDo from input field
    list.splice(index, 1, `${newToDo}`);

    updateListElement(list, listHtmlElem);
}

function editItem(clicked)
{


    // Switch the sibling div to an input text field and change edit button to a save button
    clicked.classList.add('d-none');
    clicked.nextSibling.classList.remove('d-none');
    clicked.parentNode.parentNode.firstChild.nextSibling.classList.remove('d-none');;
    clicked.parentNode.parentNode.firstChild.setAttribute('class', 'd-none');
}

//######## Save, Edit, and Delete button functionality ########
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
        editItem(e.target);
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
        editItem(e.target);
});

function generateJSON()
{
    return JSON.stringify({ "name": name.value, "email": email.value });
}

updateListElement(ingredientList, ingredientListElem);
updateListElement(instructionList, instructionListElem);