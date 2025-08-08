
import { Router } from "express";
import { getBooks , addBook, updateBook , deleteBook, bookById } from '../controllers/bookControllers.controller.js';

const router = Router();

router.get('/', (req, res) => {
    res.send('Welcome to the book store📕!');
});

//calling the controller function to get all books via 
router.get('/books', getBooks);

router.get('/books/:id', bookById)

router.post('/books', addBook); //create

router.put('/books/:id', updateBook) //update

router.delete('/books/:id', deleteBook); //delete

export const mainRoutes = router;

// router.get('/books/name', searchBookByName);