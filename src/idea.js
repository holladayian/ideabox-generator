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
  //   if (this.star === true) {
  //     starActive.classList.add("hidden");
  //     starOutline.classList.remove("hidden");
  //   }
  //   console.log(ideaArray);
  // }
    if (this.star) {
      return "./assets/star-active.svg";
    } else {
      return "./assets/star.svg";
    }
  }
};

// if (this.star) {
//   this.star = false;
// } else {
//   this.star = true;
// }
