document.addEventListener('DOMContentLoaded', function () {
  const submitForm = document.getElementById('form');
  const searchBtn = document.querySelector('.search');
  submitForm.addEventListener('submit', function (e) {
    e.preventDefault();
    addBook();
    searchBtn.addEventListener('click', () => {
      searchBook();
    });
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
document.addEventListener('ondatasaved', () => {
  console.log('Data berhasil di simpan.');
});

document.addEventListener('ondataloaded', () => {
  refreshDataFromBooks();
});
