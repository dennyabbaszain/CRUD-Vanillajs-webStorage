const STORAGE_KEY = 'BookshelfApps';
let books = [];

const isStorageExist = () => {
  if (localStorage === undefined) {
    alert('Your browser not support local storage');
    return false;
  }
  return true;
};

const updateLocalStorage = () => {
  if (isStorageExist()) saveData();
  return null;
};

const saveData = () => {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event('ondatasaved'));
};

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data != null) books = data;

  document.dispatchEvent(new Event('ondataloaded'));
}

const findBookIndex = (idBook) => {
  for (const book of books) {
    let index = 0;
    if (book.id === idBook) return index;
    index++;
  }
  return -1;
};

const findBook = (idBook) => {
  for (const book of books) {
    if (book.id === idBook) {
      return book;
    }
  }
};

const bookComposeToObject = (title, author, year, isReading) => {
  return {
    id: +new Date(),
    title,
    author,
    year,
    isReading,
  };
};
