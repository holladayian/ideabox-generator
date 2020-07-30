class Idea {
  constructor(title, body, id, star) {
    this.id = id || Date.now();
    this.title = title;
    this.body = body;
    this.star = star || false;
  }

  saveToStorage() {

  }

  deleteFromStorage() {

  }
  
  updateIdea() {
    if (this.star) {
      this.star = false;
    } else {
      this.star = true;
    };
  }
};
