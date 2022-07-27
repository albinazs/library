const formTitle = document.querySelector('#title');
const formAuthor = document.querySelector('#author');
const formPages = document.querySelector('#pages');
const formIsRead = document.querySelector('#isRead');
const form = document.querySelector('form');
const addBook = document.querySelector('#add');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const submitBook = document.querySelector('#submit');
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

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function addBookToLibrary() {
    //if !'' then do the rest of function
    let title = formTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let isRead = formIsRead.value;
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    updateDisplay();
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function clearTextContent() {
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formIsRead.value = '';
}

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
            const displayAuthor = document.createElement('p');
            displayAuthor.textContent = book.author;       
            bookCard.appendChild(displayAuthor);
            const displayPages = document.createElement('p');
            displayPages.textContent = book.pages;       
            bookCard.appendChild(displayPages);
            //buttons
            const changeStatus = document.createElement('button');
            book.isRead 
                    ? changeStatus.textContent = 'Read'
                    : changeStatus.textContent = 'Not read'
            bookCard.appendChild(changeStatus);
            changeStatus.addEventListener('click', () => {
                book.toggleReadStatus();
                book.isRead 
                    ? changeStatus.textContent = 'Read'
                    : changeStatus.textContent = 'Not read'               
            });   
            
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

addBook.addEventListener('click', openModal);

form.addEventListener('submit', (e) => {
    e.preventDefault()
    addBookToLibrary()
    closeModal()
    clearTextContent()
});

overlay.addEventListener('click', () => {
    closeModal()
    clearTextContent()
});


