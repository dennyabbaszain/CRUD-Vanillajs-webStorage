const bookID = 'ID';

const addBook = () => {
  const listUnreading = document.getElementById('list-unreading');
  const listCompleteReading = document.getElementById('list-complete-read');
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const year = document.getElementById('year').value;
  const isReading = document.getElementById('check').checked;

  const newBook = makeBook(title, author, year, isReading);
  const bookObject = bookComposeToObject(title, author, year, isReading);
  newBook[bookID] = bookObject.id;
  books.push(bookObject);
  updateLocalStorage();
  !isReading
    ? listUnreading.append(newBook)
    : listCompleteReading.append(newBook);
};

const makeBook = (nama, penulis, tahun, isReading) => {
  const container = document.createElement('div');
  const title = document.createElement('h4');
  const author = document.createElement('h5');
  const year = document.createElement('h6');
  const labelAuthor = document.createElement('label');
  const labelYear = document.createElement('label');
  const container1 = document.createElement('div');
  const container2 = document.createElement('div');

  container.classList.add('box-list');
  container1.classList.add('inline-author');
  container2.classList.add('inline-year');
  labelYear.innerText = 'Tahun   :';
  labelAuthor.innerText = 'Penulis  :';
  title.innerText = nama;
  author.innerText = penulis;
  year.innerText = tahun;
  container1.append(labelAuthor, author);
  container2.append(labelYear, year);
  container.append(title, container1, container2);
  !isReading
    ? container.append(createFinishedReadingBtn(), createDeleteBtn())
    : container.append(createUnreadingBtn(), createDeleteBtn());
  return container;
};

const createFinishedReadingBtn = () => {
  return createButton('book-btn', 'Selesai dibaca', function (e) {
    addBookToFinishedList(e.target.parentElement);
  });
};

const createUnreadingBtn = () => {
  return createButton('book-btn', 'Belum selesai dibaca', function (e) {
    addBookToUnreadingList(e.target.parentElement);
  });
};

const createDeleteBtn = () => {
  return createButton('book-btn', 'Hapus buku', function (e) {
    deleteBookToTrash(e.target.parentElement);
  });
};

const addBookToFinishedList = (elParent) => {
  const listCompleteReading = document.getElementById('list-complete-read');
  const compTitle = document.querySelector('.box-list > h4').innerText;
  const compAuthor = document.querySelector(
    '.box-list >.inline-author> h5'
  ).innerText;
  const compYear = document.querySelector(
    '.box-list >.inline-year> h6'
  ).innerText;

  const newBook = makeBook(compTitle, compAuthor, compYear, true);
  listCompleteReading.append(newBook);

  const book = findBook(elParent[bookID]);
  book.isReading = true;
  newBook[bookID] = book.id;

  elParent.remove();
  updateLocalStorage();
};

const addBookToUnreadingList = (elParent) => {
  const listUnreading = document.getElementById('list-unreading');
  const compTitle = document.querySelector('.box-list > h4').innerText;
  const compAuthor = document.querySelector(
    '.box-list >.inline-author> h5'
  ).innerText;
  const compYear = document.querySelector(
    '.box-list >.inline-year> h6'
  ).innerText;
  const newBook = makeBook(compTitle, compAuthor, compYear, false);
  listUnreading.append(newBook);

  const book = findBook(elParent[bookID]);
  book.isReading = false;
  newBook[bookID] = book.id;

  elParent.remove();
  updateLocalStorage();
};

const deleteBookToTrash = (elParent) => {
  const book = findBookIndex(elParent);
  books.splice(book, 1);
  elParent.remove();

  updateLocalStorage();
};

function createButton(buttonClass, textBtn, eventListener) {
  const button = document.createElement('button');
  button.classList.add(buttonClass);
  button.innerText = textBtn;
  button.addEventListener('click', function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

const searchBook = () => {
  const searchValue = document.getElementById('title-book').value;
  const allBooks = document.querySelectorAll('.box-list');
  searchValue.toLowerCase();
  allBooks.forEach((b) => {
    const book = b.childNodes[0].textContent;
    if (book.toLowerCase().indexOf(searchValue) != -1) {
      b.style.display = 'inline-block';
    } else {
      b.style.display = 'none';
    }
  });
};

const refreshDataFromBooks = () => {
  const listUnreading = document.getElementById('list-unreading');
  const listCompleteReading = document.getElementById('list-complete-read');

  for (const book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isReading
    );
    newBook[bookID] = book.id;
    if (book.isReading) {
      listCompleteReading.append(newBook);
    } else {
      listUnreading.append(newBook);
    }
  }
};
