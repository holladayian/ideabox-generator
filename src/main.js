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

window.addEventListener('keyup', formValidation);
window.addEventListener('click', clickHandler);
// saveButton.addEventListener('click', createIdeaObject);
// ideaCardSection.addEventListener('click', deleteCard);
// ideaCardSection.addEventListener('click', starFavorite);



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

function deleteCard(event) {
  for (i = 0; i < ideaArray.length; i++) {
    if (Number(event.target.id) === ideaArray[i].id) {
      ideaArray.splice(i, 1);
    }
  }
  displayCard();
}

function createIdeaObject() {
  var newIdea = new Idea(titleInput.value, bodyInput.value);
  ideaArray.unshift(newIdea);
  displayCard();
  clearForm();
  disableSaveButton();
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
