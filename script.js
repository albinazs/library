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
    while(books.firstChild) {
        books.removeChild(books.lastChild);
    }
    myLibrary.forEach((book, index)=> {
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard')
        books.appendChild(bookCard);
            const displayTitle = document.createElement('p');
            displayTitle.textContent = book.title;
            bookCard.appendChild(displayTitle);
            const displayAuthor = document.createElement('p')
            displayAuthor.textContent = book.author;       
            bookCard.appendChild(displayAuthor);
            const displayPages = document.createElement('p');
            displayPages.textContent = book.pages;       
            bookCard.appendChild(displayPages);
            const displayIsRead = document.createElement('p');
            displayIsRead.textContent = book.isRead;       
            bookCard.appendChild(displayIsRead);
            const removeBook = document.createElement('button');
            removeBook.textContent = "Remove";
            removeBook.dataset.number = index;
            removeBook.addEventListener('click', removeBookFromLibrary);
            bookCard.appendChild(removeBook);
    })
}

function removeBookFromLibrary(e) {
    let toDelete = e.target.dataset.number;
    myLibrary.splice(toDelete, 1);
    updateDisplay();
}


Book.prototype.intro = function() {
    // change return to human friendly (not read yet instead of false)
    //if(isRead) - read, else - not read yet
    //this.title? or title
    return `${title}, ${author}, ${pages} pages, isRead` 
}


