const addButton = document.querySelector("#addBook");

addButton.addEventListener("click", () => {});

let myLibrary = [];

function Book(title, author, language, pages, published, isFinished) {
  this.title = title;
  this.author = author;
  this.language = language;
  this.pages = pages;
  this.published = published;
  this.isFinished = isFinished;
}
