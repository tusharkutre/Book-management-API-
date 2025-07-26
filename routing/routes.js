// routing code
import { Router } from "express";
const router = Router();

//sending json data
// each book has its own id, name, and price
const books = [
    { id: 1, name: 'Science', price: 100 },
    { id: 2, name: 'English', price: 200 },
    { id: 3, name: 'history', price: 300 }
];

router.get('/', (req, res) => {
    res.send('Welcome to the book store📕!');
});

//listing all books
router.get('/books', (req, res) =>{
    res.send(books);
})

//getting a specific book by id dynamically
// using req.params to get the id from the URL
router.get('/books/:id', (req, res) =>{
    // logic to find a book by its id
     if(req.params.id){
        // Find the book with the given id
        const book = books.find(b => b.id === parseInt(req.params.id));
        if(book){
            res.send(book);
        }
        else{
            res.status(404).send({ error: 'Book not found' });
        }
    }
})

// Adding a new book
router.post('/books', (req, res) => {
    const newBook = req.body; // Assuming the book data is sent in the request body
    console.log(req.body);
    if(newBook && newBook.name && newBook.price){
        newBook.id = books.length + 1; // Assign a new id
        books.push(newBook);
        res.status(201).send(newBook); // Respond with the created book
    } else {
        res.status(400).send({ error: 'Invalid book data' });
    }
});

// Updating a book by id
// Using PUT method to update an existing book
router.put('/books/:id', (req, res)=>{
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
})

// Deleting a book by id
router.delete('/books/:id', (req, res) => {
    const bookId = parseInt(req.params.id);
    const bookIndex = books.findIndex(b => b.id === bookId);
    
    if (bookIndex !== -1) {
        const deletedBook = books.splice(bookIndex, 1);
        res.send(deletedBook[0]); // Respond with the deleted book
    } else {
        res.status(404).send({ error: 'Book not found' });
    }
});

export default router;