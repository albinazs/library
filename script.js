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

class Book {
    constructor(title, author, pages, isRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.isRead = isRead; 
    }

    toggleReadStatus() {
        if(this.isRead) {
            this.isRead = false;
        } else {
            this.isRead = true;
        }
    }        
}

function openModal() {
    modal.classList.add('active');
    overlay.classList.add('active');
}

function addBookToLibrary() {
    let title = formTitle.value;
    let author = formAuthor.value;
    let pages = formPages.value;
    let isRead = formIsRead.checked;
    const book = new Book(title, author, pages, isRead);
    myLibrary.push(book);
    updateDisplay();
}

function closeModal() {
    modal.classList.remove('active');
    overlay.classList.remove('active');
}

function clearForm() {
    formTitle.value = '';
    formAuthor.value = '';
    formPages.value = '';
    formIsRead.checked = false;
}

function updateDisplay() {
    resetDisplay();
    myLibrary.forEach((book, index) => createBookCard(book, index));
}

function createBookCard(book, index) {
    const bookCard = document.createElement('div');
    const displayTitle = document.createElement('p');
    const displayAuthor = document.createElement('p');
    const displayPages = document.createElement('p');
    const changeStatus = document.createElement('button');
    const removeBook = document.createElement('button');
    
    bookCard.classList.add('bookCard');
            
    displayTitle.textContent = book.title;
    displayAuthor.textContent = book.author;
    displayPages.textContent = `${book.pages} pages`;
    book.isRead 
            ? changeStatus.textContent = 'Read'
            : changeStatus.textContent = 'Not read'
    removeBook.textContent = "Remove";  

    books.appendChild(bookCard);
    bookCard.appendChild(displayTitle);    
    bookCard.appendChild(displayAuthor);                            
    bookCard.appendChild(displayPages);
    bookCard.appendChild(changeStatus);
    bookCard.appendChild(removeBook); 
        
    changeStatus.addEventListener('click', () => {
        book.toggleReadStatus();
        book.isRead 
            ? changeStatus.textContent = 'Read'
            : changeStatus.textContent = 'Not read'              
        });   
             
    removeBook.dataset.number = index;
    removeBook.onclick = removeBookFromLibrary;      
}

function resetDisplay() {
    while(books.firstChild) {
        books.removeChild(books.lastChild);
    }
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
    clearForm()
});

overlay.addEventListener('click', () => {
    closeModal()
    clearTextContent()
});