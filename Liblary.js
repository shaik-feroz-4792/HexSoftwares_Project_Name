// Sample book list (could be fetched from a database)
let bookLibrary = [
    { title: 'The Hobbit', author: 'J.R.R. Tolkien', category: 'Fantasy' },
    { title: '1984', author: 'George Orwell', category: 'Dystopian' },
    { title: 'To Kill a Mockingbird', author: 'Harper Lee', category: 'Classic' }
];

let borrowHistory = [];

// Display books on page load
document.addEventListener("DOMContentLoaded", () => {
    displayBooks(bookLibrary);
    displayHistory(borrowHistory);
});

// Function to display the books
function displayBooks(books) {
    const bookList = document.getElementById('bookList');
    bookList.innerHTML = '';

    books.forEach((book, index) => {
        const bookItem = document.createElement('div');
        bookItem.classList.add('book-item');
        bookItem.innerHTML = `
            <strong>Title:</strong> ${book.title}<br>
            <strong>Author:</strong> ${book.author}<br>
            <strong>Category:</strong> ${book.category}
            <button onclick="borrowBook(${index})">Borrow</button>
            <button onclick="returnBook(${index})">Return</button>
        `;
        bookList.appendChild(bookItem);
    });
}

// Function to search books by title, author, or category
function searchBooks() {
    const searchInput = document.getElementById('searchInput').value.toLowerCase();
    const filteredBooks = bookLibrary.filter(book => 
        book.title.toLowerCase().includes(searchInput) ||
        book.author.toLowerCase().includes(searchInput) ||
        book.category.toLowerCase().includes(searchInput)
    );
    displayBooks(filteredBooks);
}

// Function to add a new book
function addBook(event) {
    event.preventDefault();

    const title = document.getElementById('bookTitle').value;
    const author = document.getElementById('bookAuthor').value;
    const category = document.getElementById('bookCategory').value;

    const newBook = { title, author, category };
    bookLibrary.push(newBook);
    displayBooks(bookLibrary);

    document.getElementById('addBookForm').reset();
}

// Function to borrow a book
function borrowBook(index) {
    const book = bookLibrary[index];
    borrowHistory.push({ ...book, date: new Date().toLocaleDateString() });
    displayHistory(borrowHistory);
}

// Function to return a book (removes it from borrowing history)
function returnBook(index) {
    const book = bookLibrary[index];
    borrowHistory = borrowHistory.filter(b => b.title !== book.title);
    displayHistory(borrowHistory);
}

// Function to display the borrowing history
function displayHistory(history) {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = '';

    history.forEach(record => {
        const historyItem = document.createElement('div');
        historyItem.classList.add('history-item');
        historyItem.innerHTML = `
            <strong>Title:</strong> ${record.title}<br>
            <strong>Author:</strong> ${record.author}<br>
            <strong>Category:</strong> ${record.category}<br>
            <strong>Date:</strong> ${record.date}
        `;
        historyList.appendChild(historyItem);
    });
}
