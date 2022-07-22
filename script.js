const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formIsRead = document.querySelector('#isRead');
const addBook = document.querySelector('#add');
const books = document.querySelector('.books');

let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead   
}

function addBookToLibrary() {
    event.preventDefault();
    let title = formTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let isRead = formIsRead.value;
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    updateDisplay();
}

addBook.addEventListener('click', addBookToLibrary);

function updateDisplay() {
    books.textContent = '';
    myLibrary.forEach(book => {
        const displayTitle = document.createElement('p');
        displayTitle.textContent = book.title;
        books.appendChild(displayTitle);
    })
}


Book.prototype.intro = function() {
    // change return to human friendly (not read yet instead of false)
    //if(isRead) - read, else - not read yet
    //this.title? or title
    return `${title}, ${author}, ${pages} pages, isRead` 
}


