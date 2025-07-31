//sending json data
// each book has its own id, name, and price
import books from '../models/book.js'; 

//business logic to handle book operations
const getBooks = (req,res) => {
    try {
        res.send(books); // Respond with the list of books
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Could not retrieve books');
    }
}

// book by id
const getBookById = (req , res) => {
  try{
    if(req.params.id){
        const book = books.find(b => b.id === parseInt(req.params.id));
        if(book){
            res.send(book);
        }
        else{
            res.status(404).send({ error: 'Book not found' });
        }
    }
  }
  catch (error) {
        console.error('Error fetching book by ID:', error);
        res.status(500).send({ error: 'Could not retrieve book' });
    }
}

const getBookByName = (req, res) => {
    try{
        const bookName = req.query; // Get the book name from query parameters
        const book = books.find(b => b.name.toLowerCase() === bookName.toLowerCase());
        if (book) {
            res.send(book);
        } else {
            res.status(404).send({ error: 'Book not found' });
        }
    } catch (error) {
        console.error('Error fetching book by name:', error);
        res.status(500).send({ error: 'Could not retrieve book' });
    }
}

const addBook = (req, res) => {
    try {
        const newBook = req.body; // Assuming the book data is sent in the request body
        if (newBook && newBook.name && newBook.price) {
            newBook.id = books.length + 1; // Assign a new id
            books.push(newBook);
            res.status(201).send(newBook); // Respond with the created book
        } else {
            res.status(400).send({ error: 'Invalid book data' });
        }
    } catch (error) {
        console.error('Error adding book:', error);
        res.status(500).send({ error: 'Could not add book' });
    }
}

const updateBook = (req , res) =>{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);

    if (bookIndex !== -1){
        // creates a new book object with updated data
        const updatedBook = { ...books[bookIndex], ...req.body }; // Merge existing book with new book data
        books[bookIndex] = updatedBook; // Update the book in the array
        res.send(updatedBook); // Respond with the updated book
    }
    else {
        res.status(404).send({ error: 'Book not found' });
    }
}

const deleteBook = (req, res) =>{
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.send(deletedBook[0]); // Respond with the deleted book
    } else {
        res.status(404).send({ error: 'Book not found' });
    }
}

// Exporting the function to be used in routes
export { getBooks , getBookById , getBookByName , addBook , updateBook , deleteBook };