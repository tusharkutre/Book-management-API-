// routing code
import { Router } from "express";
import { getBooks , getBookById , getBookByName  , addBook, updateBook , deleteBook} from '../controllers/bookControllers.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the book store📕!');
});

//calling the controller function to get all books
router.get('/books', getBooks);

//getting a specific book by id dynamically(:)
router.get('/books/:id', getBookById)

//getting a specific book by name
router.get('/books/name', getBookByName);

// Adding or creating a new book
router.post('/books', addBook);

// Updating a book by id
// Using PUT method to update an existing book
router.put('/books/:id', updateBook)

// Deleting a book by id
router.delete('/books/:id', deleteBook);

export default router;