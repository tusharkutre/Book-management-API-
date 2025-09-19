import { Router } from "express";
import { getBooks , addBook, updateBook , deleteBook, bookById , getBooksByUser, getBookOwner } from '../controllers/bookControllers.controller.js';
import multer from 'multer';

const router = Router();

// Middleware to require authentication on protected routes
const requireAuth = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Authentication required' });
    }
    next();
}

//multer storage configuration for the image
const storage = multer.diskStorage({
    destination: function(req, file , cb){
        return cb(null , './uploads') //destination folder to save the file
    },
    filename: function(req, file ,cb){
        return cb(null , `${Date.now()}-${file.originalname}`) //file name with timestamp
    } 
})

const upload = multer({ storage });

router.get('/', (req, res) => {
    res.send('welcome to the book store📕!');
});

// GET route for upload page - using template engine
router.get('/upload', (req, res) => {
    res.render('upload'); //render the upload.ejs file
});

//uploading the image
router.post('/upload', upload.single('image'), (req, res) =>{
    console.log(req.body);
    console.log(req.file);
    res.send('File uploaded successfully');
})

router.get('/users/:userId/books', requireAuth, getBooksByUser);
router.get('/books/:bookId/owner', requireAuth, getBookOwner);

//calling the controller function to get all books via 
router.get('/books', requireAuth, getBooks);

router.get('/books/:id', requireAuth, bookById)

router.post('/books', requireAuth, addBook); //create

router.put('/books/:id', requireAuth, updateBook) //update

router.delete('/books/:id', requireAuth, deleteBook); //delete

export const mainRoutes = router;

// router.get('/books/name', searchBookByName);