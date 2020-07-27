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
var starFavButton = document.querySelector('.header-star');
// var allButtons = document.getElementsByClassName('button');
var ideaArray = [];

window.addEventListener('keyup', formValidation);
window.addEventListener('click', clickHandler);
// saveButton.addEventListener('click', createIdeaObject);
// ideaCardSection.addEventListener('click', starFavorite);
// ideaCardSection.addEventListener('click', deleteCard);

function clickHandler(target) {
  if (event.target === saveButton) {
    createIdeaObject()
  }
  if (event.target === starFavButton) {
    starFavorite()
  }
  if (event.target === ideaCardSection) {
    starFavorite();
    deleteCard();
  }
}

function toggleHidden() {
  menuIcon.classList.toggle("hidden");
  menuCloseIcon.classList.toggle("hidden");
  dropDownMenu.classList.toggle("hidden");
}

function deleteCard(event) {
  var cardID = Number(event.target.id);
  for (i = 0; i < ideaArray.length; i++) {
    if (cardID === ideaArray[i].id) {
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

function displayCard() {
  ideaCardSection.innerHTML = '';
  for (i = 0; i < ideaArray.length; i++) {
    ideaCardSection.insertAdjacentHTML(
      'afterbegin',
      `
      <div class="card">
        <header>
          <button class="header-star" type="button" name="button">
            <img class="star-outline" src="./assets/star.svg" alt="">
            <img class="hidden star-active" src="./assets/star-active.svg" alt="">
          </button>
          <button id="${ideaArray[i].id}" class="header-close" type="button" name="button">
            <img id="${ideaArray[i].id}" src="./assets/menu-close.svg" alt="">
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

function starFavorite() {
  console.log('butts');
  var starActive = document.querySelector('.star-active');
  var starOutline = document.querySelector('.star-outline');
  if (event.target)
  starActive.classList.toggle("hidden");
  starOutline.classList.toggle("hidden");
}
