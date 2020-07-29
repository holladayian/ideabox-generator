class Idea {
  constructor(title, body, id, star) { // might need id and star params here
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;
  }
  saveToStorage() {
    var stringifiedArray = JSON.stringify(ideaArray);
    localStorage.setItem("storedIdeas", stringifiedArray);
  }
  deleteFromStorage() {
    // 4.5 run our retrieve-from-storage function
    // retrieveStoredIdeasArray();
    // var stringifiedArray = JSON.stringify(ideaArray);
    // localStorage.setItem("storedIdeas", stringifiedArray);
    // will research this one more. We are able to get this to work
    // in main.js but maybe up we are updating the DOM
    // instead of the Data Model???
  }
    //4.5 ourStringFromStorage.splice(this, 1)
  updateIdea() {
    if (this.star) {
      this.star = false;
    } else {
      this.star = true;
    }
  }
};
