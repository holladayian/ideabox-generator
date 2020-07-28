class Idea {
  constructor(title, body) { // might need id and star params here
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage() {
    // ideaArray.unshift(this);
    // retrieveStoredIdeasArray();
    var stringifiedArray = JSON.stringify(ideaArray);
    localStorage.setItem("storedIdeas", stringifiedArray);
  }
  deleteFromStorage() {
    //4.5 run our retrieve-from-storage function
    //4.5 ourStringFromStorage.splice(this, 1)
  }
  updateIdea() {
    if (this.star) {
      this.star = false;
    } else {
      this.star = true;
    }
  }
};
