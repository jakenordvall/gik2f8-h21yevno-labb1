"use strict";

let bookList = [];

window.addEventListener("load", () => {
  getAll().then((apiBooks) => (bookList = apiBooks));
});

searchField.addEventListener("keyup", (e) =>
  renderBookList(
    bookList.filter(({ title, author }) => {
      const searchTerm = e.target.value.toLowerCase();
      return (
        title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        author.toLowerCase().includes(searchTerm.toLowerCase())
      );
    })
  )
);

function renderBookList(bookList) {
  const existingElement = document.querySelector(".book-list");

  const root = document.getElementById("root");

  existingElement && root.removeChild(existingElement);
  bookList.length > 0 &&
    searchField.value &&
    root.insertAdjacentHTML("beforeend", BookList(bookList));

  let list = document.querySelectorAll(".book-list__item");

  list.forEach(bookToFind);
}

function renderBookList(bookList) {
  const existingElement = document.querySelector(".book-list");
  const existingPicture = document.getElementById("ball");
  if (existingPicture) {
    existingPicture.remove();
  }

  const root = document.getElementById("root");

  if (existingElement) {
    root.removeChild(existingElement);
  }
  if (bookList.length > 0 && searchField.value) {
    root.insertAdjacentHTML("beforeend", BookList(bookList));
  }

  let list = document.querySelectorAll(".book-list__item");

  list.forEach(bookToFind);
}

function bookToFind(item) {
  item.addEventListener("mouseenter", (e) => {
    const existingPicture = document.getElementById("ball");

    if (!existingPicture) {
      let bookID = e.target.id;

      renderBookListPicture(bookID, e.pageX, e.pageY).then((data) => {
        root.insertAdjacentHTML("beforeend", data);
      });
    }
  });

  item.addEventListener("mousemove", (e) => {
    const existingPicture = document.getElementById("ball");
    if (existingPicture) {
      let X = e.pageX + 10;
      let Y = e.pageY + 10;
      existingPicture.style.top = Y + "px";
      existingPicture.style.left = X + "px";
    }
  });

  item.addEventListener("mouseout", () => {
    const existingPicture = document.getElementById("ball");
    if (existingPicture) {
      existingPicture.remove();
    }
  });
}

function renderBookListPicture(bookID, x, y) {
  let currentBook;

  let finalDiv = findBook(bookID).then((data) => {
    currentBook = data;
    const div = `<div id="ball" class="  absolute w-80 h-100 grid grid-cols-4  gap-4   p-10 bg-gradient-to-tr from-sky-300/40 to-lime-300/40 rounded-full border-black-10 m-10 top-[${
      y + 10
    }px] left-[${x + 10}px]">
    <div class="col-start-1 col-end-3  ">
    <p class="m-2 text-black font-semibold ">Titel: ${currentBook.title}</p>
    <p class= "m-2 text-black font-semibold">Author: ${currentBook.author}</p>
    <p class= "m-2 text-black font-semibold">Pages: ${currentBook.pages}</p>
    </div>
    <img src = "${
      currentBook.coverImage
    }" onerror="this.onerror=null;this.src='https://st3.depositphotos.com/1322515/35964/v/600/depositphotos_359648638-stock-illustration-image-available-icon.jpg';" class="rounded-lg col-start-3 col-end-5    "> 

    </div>`;

    return div;
  });

  return finalDiv;
}

async function findBook(id) {
  let book;
  let urlString = `https://gik2f8-labs.herokuapp.com/books/${id}`;
  const result = await fetch(urlString)
    .then((data) => data.json())
    .then((data) => {
      book = data;
    });
  return book;
}
