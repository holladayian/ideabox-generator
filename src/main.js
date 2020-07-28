var menuIcon = document.querySelector(".menu-icon");
var menuCloseIcon = document.querySelector(".menu-close-icon");
var dropDownMenu = document.querySelector(".dropdown-menu");
var saveButton = document.querySelector('.save-button');
var titleInput = document.querySelector('.title-input');
var bodyInput = document.querySelector('.body-input');
var ideaFormSection = document.querySelector('.idea-form');
var cardTitle = document.querySelector('.card-title');
var bodyText = document.querySelector('.body-text');
var ideaCardSection = document.querySelector('.idea-cards');
var ideaArray = [];


//4.2 add an event listener that fires the retrieve from storage function, on load
window.addEventListener('keyup', formValidation);
window.addEventListener('click', clickHandler);
window.addEventListener('onload', retrieveStoredIdeasArray());


//4.3 create a function that retrieves from storage
//4.3 we want to reassign our ideaArray to a value of,
//4.3 JSON.parse(localStorage.getItem("whatever-the-heck-we-named-it-in-saved-to-storage")) OR an empty string *incase nothing has been stored*
//4.3 then run our DOM update function *displayCard*


//4.6 create a showStarredIdeas function that,
//4.6  runs through the loop of ideaArray, accessing the indicies that have a key value of "star: true"
// 4.6 interpolates the DOM
// 4.6.1 maybe ties this into the current DOM updating function, passing in the parameters if (star)

// 4.7 Add a button to the eventHandler that changes the "Show Starred Ideas" button on the DOM,
// 4.7 to the "Show Starred Ideas" button
// 4.8 then run either showStarredIdeas or displayCard, depending on a boolean switch

// 4.9 either run event keydown, or refactor keyup to push through the eventHandler, running a search function
// 4.9 loop through the ideaArray in the search function
// 4.9 if ideaArray[i] dot contains the event dot key (might have to look into the syntax of this)
// 4.9 reupdate the DOM
// 4.9 either refactor DOM update function or add a new DOM update function to handle the search parameters
// 4.9 tie this to the event listener
// 4.9.1 make sure this runs for the delete key as well



function clickHandler(event) {
  if (event.target === saveButton) {
    createIdeaObject(event);
  }
  if (event.target.classList.contains("star")) {
    starFavorite(event);
  }
  if (event.target.classList.contains("close")) {
    deleteCard(event);
  }
}

function toggleHidden() {
  menuIcon.classList.toggle("hidden-2");
  menuCloseIcon.classList.toggle("hidden-2");
  dropDownMenu.classList.toggle("hidden-2");
}

function retrieveStoredIdeasArray() {
  var storedIdeaString = localStorage.getItem("storedIdeas") || [];
  ideaArray = JSON.parse(storedIdeaString);
  instantiateParsedArray(ideaArray);
}

function instantiateParsedArray(parsedValue) {
  for (var i = 0; i < parsedValue.length; i++) {
    parsedValue[i] = new Idea(parsedValue[i].title, parsedValue[i].body, parsedValue[i].id, parsedValue[i].star);
    parsedValue[i].saveToStorage();
  }
  displayCard();
}

function createIdeaObject() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  ideaArray.unshift(newIdea);
  displayCard();
  clearForm();
  disableSaveButton();
  newIdea.saveToStorage();
}

function deleteCard(event) {
  for (i = 0; i < ideaArray.length; i++) {
    if (Number(event.target.id) === ideaArray[i].id) {
      //4.4 fire deleteFromStorage on ideaArray[i] (this might have to go after the splice, idk I'm drunk)
      ideaArray.splice(i, 1);
    }
  }
  displayCard();
}

function starBoy(index) {
  if (ideaArray[index].star) {
    return "./assets/star-active.svg"
  } else {
    return "./assets/star.svg"
  }
}

function displayCard() {
  ideaCardSection.innerHTML = '';
  for (var i = 0; i < ideaArray.length; i++) {
    ideaCardSection.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="card">
        <header>
          <button id="${ideaArray[i].id}" class="header-star star" type="button" name="button">
            <img id="${ideaArray[i].id}" class="star-outline star" src="${starBoy(i)}" alt="">
          </button>
          <button id="${ideaArray[i].id}" class="header-close close" type="button" name="button">
            <img id="${ideaArray[i].id}" class="close" src="./assets/menu-close.svg" alt="">
          </button>
        </header>
        <section class="card-body">
          <h4 class="card-title header-text">${ideaArray[i].title}</h4>
          <p class="body-text">${ideaArray[i].body}</p>
        </section>
        <footer>
          <button class="footer-button" type="button" name="button"><img class="comment-img" src="./assets/comment.svg" alt=""> Comment</button>
        </footer>
      </div>
      `
    )
  }
}

function formValidation(event) {
  if (titleInput.value !== '' && bodyInput.value !== '') {
    enableSaveButton();
  } else {
    disableSaveButton();
  }
}

function clearForm() {
  event.preventDefault();
  titleInput.value = '';
  bodyInput.value = '';
}

function enableSaveButton() {
  saveButton.classList.remove("disable-style");
  saveButton.disabled = false;
}

function disableSaveButton() {
  saveButton.classList.add("disable-style");
  saveButton.disabled = true;
}


function starFavorite(event) {
  for (var i = 0; i < ideaArray.length; i++) {
    if (Number(event.target.id) == ideaArray[i].id) {
      ideaArray[i].updateIdea();
    }
  }
  displayCard();
}
