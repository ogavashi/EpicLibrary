const addButton = document.querySelector(".add-book");
const addBookWindow = document.querySelector("#addBookWindow");
const closeAddBookWindow = document.querySelector("#closeAddBookWindow");
const forBlur = document.querySelector("#for-blur");
const content = document.querySelector(".content");
const modal = document.querySelector(".modal");
const addBookButton = document.querySelector("#add-book");

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const numberOfPages = document.querySelector("#number-of-pages");
const language = document.querySelector("#language");
const publishingDate = document.querySelector("#publishing-date");
const bookStatus = document.querySelector("#book-status");

addBookButton.addEventListener("click", () => {
  addBookToLibrary();
});

addButton.addEventListener("click", () => {
  addBookWindow.classList.add("visible");
  forBlur.classList.add("blured");
});

closeAddBookWindow.addEventListener("click", () => {
  addBookWindow.classList.remove("visible");
  addBookWindow.classList.add("unvisible");
  forBlur.classList.remove("blured");
});

content.addEventListener("click", () => {
  addBookWindow.classList.remove("visible");
  addBookWindow.classList.add("unvisible");
  forBlur.classList.remove("blured");
});

modal.addEventListener("click", modalClick);

function modalClick(e) {
  e.preventDefault();
  e.stopPropagation();
  e.stopImmediatePropagation();
  return false;
}

let myLibrary = [];

function Book(title, author, language, pages, published, isFinished) {
  this.title = title;
  this.author = author;
  this.language = language;
  this.pages = pages;
  this.published = published;
  this.isFinished = isFinished;
}

function addBookToLibrary() {
  const book = new Book(
    bookTitle.value,
    bookAuthor.value,
    language.value,
    numberOfPages.value,
    publishingDate.value,
    bookStatus.value
  );
  console.log(book);
}
