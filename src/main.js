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
var showStarredButton = document.querySelector('.show-star-button');
var showAllButton = document.querySelector('.show-all-button');
var searchInput = document.querySelector('.search-input');
var searchButton = document.querySelector('.search-button');

var ideaArray = [];

window.addEventListener('keyup', keyupHandler);
window.addEventListener('click', clickHandler);
window.addEventListener('onload', retrieveStoredIdeasArray());

// 4.6 create a showStarredIdeas function that,
// 4.6  runs through the loop of ideaArray, accessing the indicies that have a key value of "star: true"
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

// Perhaps we can make a function to loop through ideaArray to reduce redundancy?
function keyupHandler(event) {
  if (event.target === titleInput || event.target === bodyInput) {
    formValidation(event);
  }
  if (event.target.classList.contains('search-input')) {
    inputSearch(event);
  }
}

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
  if (event.target === showStarredButton) {
    showStarredIdeas(event);
    switchView();
  }
  if (event.target === showAllButton) {
    switchView(event);
    displayCard();
  }
};

function toggleHidden() {
  menuIcon.classList.toggle("hidden-2");
  menuCloseIcon.classList.toggle("hidden-2");
  dropDownMenu.classList.toggle("hidden-2");
}

function retrieveStoredIdeasArray() {
  var storedIdeaString = localStorage.getItem("storedIdeas");
  ideaArray = JSON.parse(storedIdeaString) || [];
  instantiateParsedArray(ideaArray);
}

function instantiateParsedArray(parsedValue) {
  for (var i = 0; i < parsedValue.length; i++) {
    parsedValue[i] = new Idea(parsedValue[i].title, parsedValue[i].body, parsedValue[i].id, parsedValue[i].star);
    updateLocalStorage();
  }
  displayCard();
}

function createIdeaObject() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  ideaArray.push(newIdea);
  displayCard();
  clearForm();
  disableSaveButton();
  updateLocalStorage();
}

function deleteCard(event) {
  for (i = 0; i < ideaArray.length; i++) {
    if (Number(event.target.id) === ideaArray[i].id) {
      ideaArray.splice(i, 1);
      updateLocalStorage();
    }
  }
  displayCard();
}

function updateLocalStorage() {
  var stringifiedArray = JSON.stringify(ideaArray);
  localStorage.setItem("storedIdeas", stringifiedArray);
}

function starBoy(indexNum) {
  if (ideaArray[indexNum].star) {
    return "./assets/star-active.svg"
  } else {
    return "./assets/star.svg"
  }
}

function htmlInjector(index) {
  ideaCardSection.insertAdjacentHTML(
    'afterbegin',
    `
    <div class="card">
      <header>
        <button id="${ideaArray[index].id}" class="header-star star" type="button" name="button">
          <img id="${ideaArray[index].id}" class="star-outline star" src="${starBoy(index)}" alt="">
        </button>
        <button id="${ideaArray[index].id}" class="header-close close" type="button" name="button">
          <img id="${ideaArray[index].id}" class="close" src="./assets/menu-close.svg" alt="">
        </button>
      </header>
      <section class="card-body">
        <h4 class="card-title header-text">${ideaArray[index].title}</h4>
        <p class="body-text">${ideaArray[index].body}</p>
      </section>
      <footer>
        <button class="footer-button" type="button" name="button"><img class="comment-img" src="./assets/comment.svg" alt=""> Comment</button>
      </footer>
    </div>
    `
  )
}

function displayCard() {
  ideaCardSection.innerHTML = '';
  for (var i = 0; i < ideaArray.length; i++) {
    htmlInjector(i);
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
  ideaCardSection.innerHTML = '';
  for (var i = 0; i < ideaArray.length; i++) {
    if (Number(event.target.id) == ideaArray[i].id) {
      ideaArray[i].updateIdea();
      updateLocalStorage();
      // if show stars is active
      if (showAllButton.classList.contains('hidden')) {
        showStarredIdeas();
      } else {
        displayCard();
      }
    }
  }
  // if (showAllButton.classList.contains('hidden')) {
  //   displayCard();
  // }
}

function showStarredIdeas() {
  ideaCardSection.innerHTML = '';
  for (var i = 0; i < ideaArray.length; i++) {
    if (ideaArray[i].star) {
      htmlInjector(i);
    }
  }
  // showAllButton.classList.remove("hidden");
  // showStarredButton.classList.add("hidden");
}

function switchView() {
  showAllButton.classList.toggle("hidden");
  showStarredButton.classList.toggle("hidden");
}

function showAllView() {
  showAllButton.classList.toggle("hidden");
  showStarredButton.classList.toggle("hidden");
  displayCard();
}

function inputSearch() {
  ideaCardSection.innerHTML = '';
  for (var i = 0; i < ideaArray.length; i++) {
    // console.log(ideaArray[i].title);
    if (ideaArray[i].title.includes(searchInput.value)) {
      htmlInjector(i);
    }
  }
}
