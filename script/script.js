const addButton = document.querySelector(".add-book");
const resetButton = document.querySelector("#reset-info");
const addBookWindow = document.querySelector("#addBookWindow");
const closeAddBookWindow = document.querySelector("#closeAddBookWindow");
const forBlur = document.querySelector("#for-blur");
const content = document.querySelector(".content");
const modal = document.querySelector(".modal");
const addBookButton = document.querySelector("#add-book");
const body = document.querySelector("body");
const deleteBookModal = document.querySelector("#deleteCard");
const deleteCard = document.querySelector(".card__exit");
const deleteCardSureButton = document.querySelector("#sure");
const deleteCardNotSureButton = document.querySelector("#notSure");
const bookCards = document.querySelector(".card-container");
const showFinished = document.querySelector("#finished-books");
const showAll = document.querySelector("#all-books");
const showUnFinished = document.querySelector("#unfinished-books");
const modalTitle = document.querySelector(".form_title");

const bookTitle = document.querySelector("#book-title");
const bookAuthor = document.querySelector("#book-author");
const numberOfPages = document.querySelector("#number-of-pages");
const language = document.querySelector("#language");
const publishingDate = document.querySelector("#publishing-date");
const bookStatus = document.querySelector("#book-status");

resetButton.addEventListener("click", resetInput);

showAll.addEventListener("click", () => {
  bookCards.innerHTML = "";
  if (myLibrary.length == 0) {
    showNothing();
    return;
  }
  render();
});

showUnFinished.addEventListener("click", () => {
  bookCards.innerHTML = "";
  let empty = true;
  myLibrary.forEach((element, index) => {
    if (!!!element.isFinished) {
      draw(element, index);
      empty = false;
    }
  });
  if (empty) showNothing();
});

showFinished.addEventListener("click", () => {
  bookCards.innerHTML = "";
  let empty = true;
  myLibrary.forEach((element, index) => {
    if (!!element.isFinished) {
      empty = false;
      draw(element, index);
    }
  });
  if (empty) showNothing();
});

deleteCardNotSureButton.addEventListener("click", () => {
  deleteBookModal.classList.remove("visible");
  deleteBookModal.classList.add("unvisible");
  forBlur.classList.remove("blured");
});

deleteCardSureButton.addEventListener("click", () => {
  const toBeDeleted = document.querySelector(`[data-index="${currentID}"]`);
  toBeDeleted.remove();
  deleteBookModal.classList.remove("visible");
  deleteBookModal.classList.add("unvisible");
  forBlur.classList.remove("blured");
  myLibrary.splice(currentID, 1);
  render();
});

addBookButton.addEventListener("click", () => {
  let vitalik = myLibrary[currentID];
  if (vitalik && validation()) {
    saveChanged(vitalik);
    resetInput();
    addBookWindow.classList.remove("visible");
    addBookWindow.classList.add("unvisible");
    forBlur.classList.remove("blured");
    console.log(myLibrary);
    render();
    currentID = null; 
  }
  else
  if (validation() && !vitalik) {
    addBookToLibrary();
    resetInput();
    addBookWindow.classList.remove("visible");
    addBookWindow.classList.add("unvisible");
    forBlur.classList.remove("blured");
  }
});

addButton.addEventListener("click", () => {
  resetInput();
  modalTitle.innerText = "Add book";
  addBookButton.innerText = "Add";
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

function resetInput() {
  bookTitle.value = "";
  bookAuthor.value = "";
  numberOfPages.value = "";
  language.value = "";
  publishingDate.value = "";
  bookStatus.value = "";
}

function showNothing() {
  let nothing = document.createElement("div");
  let nothingPic = document.createElement("img");
  let nothingWarning = document.createElement("h1");
  nothing.classList.add("nothing-div");
  nothingWarning.innerText = "Sorry, nothing here(";
  nothingPic.src =
    "https://community.akamai.steamstatic.com/economy/image/cKxH0Lffsu0bR2GN0jri3Wbz8zTZAx_beu1CDH04nP9_GI86c-65ieWV-gmEVQ2mYi9FDdllnoK_AFylLxYeK8WJ7eocSyKpsGEWTWw7Pdeq995htrbtX-dJEdLIzdyRQQC1xhRr-x90VCkca0SeIqM4tSUCyQGuDtZhUM5LUFWnsWjFZAM3uCLKuIoGwwLv4DJylxZdK7aYJ7hUmQ7zx3ft1jo7jVO1wofhL_El2RqV4zoI20-KYB40w40hHPQQQfRN1cQFbLYMsSsoWbEnRrpRk4Bv3n7KidlCzGE1Mzr5U9ikoN3JhXJXaTt2DliiFNwlkLri1kvu6EilO7ORVrNKhJvF7pTSCV6SfthrR0QCyvkk1_iDNZ1g5gT6JMr5zPE3NFHjsw3BMrNh2E1GX-saO88C9A/360fx360f";
  nothing.appendChild(nothingPic);
  nothing.appendChild(nothingWarning);
  bookCards.appendChild(nothing);
}

let myLibrary = [];
let currentID;
let update = false;
getBookfromLocal();

function Book(title, author, language, pages, published, isFinished) {
  this.title = title;
  this.author = author;
  this.language = language;
  this.pages = pages;
  this.published = published;
  this.isFinished = isFinished;
}

function saveBookToLocal() {
  localStorage.setItem("book", JSON.stringify(myLibrary));
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
  myLibrary.push(book);
  console.log(myLibrary);
  render();
}

function getBookfromLocal() {
  myLibrary = JSON.parse(localStorage.getItem("book") || "[]");
  if (myLibrary.length == 0) {
    showNothing();
    return;
  }
  render();
}

function validation() {
  if (
    bookTitle.value != "" &&
    bookAuthor.value != "" &&
    language.value != "" &&
    publishingDate.value != "" &&
    numberOfPages.value != "" &&
    bookStatus.value != "null" &&
    hasNumber(numberOfPages.value)
  ) {
    return true;
  } else {
    return false;
  }
}

function cutInput(input) {
  let newTitle = input.slice(0, 20);
  let output = newTitle.slice(0, newTitle.lastIndexOf(" ")) + "...";
  return output;
}

function hasNumber(myString) {
  return /\d/.test(myString);
}

function render() {
  saveBookToLocal();
  bookCards.innerHTML = "";
  myLibrary.forEach((element, index) => {
    draw(element, index);
  });
}

function changeInfo(element, index) {
  addBookWindow.classList.add("visible");
  forBlur.classList.add("blured");
  modalTitle.innerText = "Update books";
  addBookButton.innerText = "Update book";
  bookTitle.value = element.title;
  bookAuthor.value = element.author;
  numberOfPages.value = element.pages;
  language.value = element.language;
  publishingDate.value = element.published;
  bookStatus.value = element.isFinished;
  currentID = index;
  render();
}

function saveChanged(vitalik) {
  let ourBook = vitalik;
  ourBook.title = bookTitle.value;
  ourBook.author = bookAuthor.value;
  ourBook.pages = numberOfPages.value; 
  ourBook.language = language.value;
  ourBook.published = publishingDate.value;
  ourBook.isFinished = bookStatus.value;
  return ourBook;
}

function draw(element, index) {
  let newBook = document.createElement("div");
  newBook.classList.add("card");
  newBook.classList.add("card-1");
  newBook.setAttribute("data-index", index);
  let deleteThis = document.createElement("p");
  deleteThis.addEventListener("click", () => {
    deleteBookModal.classList.add("visible");
    forBlur.classList.add("blured");
    currentID = index;
  });
  newBook.addEventListener("dblclick", () => changeInfo(element, index));
  deleteThis.classList.add("card__exit");
  let cardBookTitle = document.createElement("h2");
  cardBookTitle.classList.add("card__title");
  if (element.title.length > 20) {
    cardBookTitle.innerText = cutInput(element.title);
  } else cardBookTitle.innerText = element.title;
  deleteThis.innerText = "✖";
  let cardBookAuthor = document.createElement("h2");
  cardBookAuthor.classList.add("card__author");
  cardBookAuthor.innerText = "By: " + element.author;
  let cardBookLanguage = document.createElement("h2");
  cardBookLanguage.classList.add("card__language");
  cardBookLanguage.innerText = "Language: " + element.language;
  let cardBookPages = document.createElement("h2");
  cardBookPages.classList.add("card__pages");
  cardBookPages.innerText = "Number of pages: " + element.pages;
  let cardBookPublished = document.createElement("h2");
  cardBookPublished.classList.add("card__published");
  cardBookPublished.innerText = "Published: " + element.published;
  let toggleDiv = document.createElement("div");
  toggleDiv.classList.add("toggle");
  let toggleLabel = document.createElement("h2");
  toggleLabel.classList.add("card__toggle");
  let labelSwitch = document.createElement("label");
  labelSwitch.classList.add("switch");
  let inputIsRead = document.createElement("input");
  inputIsRead.type = "checkbox";
  let spanInput = document.createElement("span");
  spanInput.classList.add("slider");
  toggleLabel.innerText = "Finished:";
  if (element.isFinished == true || element.isFinished == "true") {
    inputIsRead.checked = true;
  } else element.isFinished = false;
  inputIsRead.addEventListener("change", () => {
    element.isFinished = !element.isFinished;
    saveBookToLocal();
  });
  toggleDiv.appendChild(toggleLabel);
  toggleDiv.appendChild(labelSwitch);
  labelSwitch.appendChild(inputIsRead);
  labelSwitch.appendChild(spanInput);
  newBook.appendChild(deleteThis);
  newBook.appendChild(cardBookTitle);
  newBook.appendChild(cardBookAuthor);
  newBook.appendChild(cardBookLanguage);
  newBook.appendChild(cardBookPages);
  newBook.appendChild(cardBookPublished);
  newBook.appendChild(toggleDiv);
  bookCards.appendChild(newBook);
}
