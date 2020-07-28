class Idea {
  constructor(title, body) {
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage() {
    //4.1 setItem to localStorage,
    //4.1 pass in the arguments of a good string name(-i.e. IdeaStored)
    //4.1 and also JSON.stringify(ideaArray)
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
