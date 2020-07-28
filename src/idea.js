class Idea {
  constructor(title, body) { // might need id and star params here
    this.id = Date.now();
    this.title = title;
    this.body = body;
    this.star = false;
  }
  saveToStorage() {
    retrieveStoredIdeasArray().unshift(this)  // this ties to 4.3!
    // 4.1 get ideaArray
    //4.1 pass in the arguments of a good string name(-i.e. IdeaStored)
    //4.1 and also JSON.stringify(ideaArray)
    //4.1 setItem to localStorage,
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
