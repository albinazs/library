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

Book.prototype.toggleReadStatus = function() {
    if(this.isRead) {
        this.isRead = false;
    } else {
        this.isRead = true;
    }    
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
            //buttons
            const removeBook = document.createElement('button');
            removeBook.textContent = "Remove";
            removeBook.dataset.number = index;
            removeBook.addEventListener('click', removeBookFromLibrary);
            bookCard.appendChild(removeBook);

            const changeStatus = document.createElement('button');
            changeStatus.textContent = book.isRead;
            bookCard.appendChild(changeStatus);
            changeStatus.addEventListener('click', () => {book.toggleReadStatus()
                changeStatus.textContent = book.isRead});            
    })
}

function removeBookFromLibrary(e) {
    let toDelete = e.target.dataset.number;
    myLibrary.splice(toDelete, 1);
    updateDisplay();
}



