class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage() {

  }
  deleteFromStorage() {

  }
  updateIdea() {
    if (this.star = true) {
      starActive.classList.add("hidden");
      starOutline.classList.remove("hidden");
    }
    console.log(ideaArray);
  }
};
