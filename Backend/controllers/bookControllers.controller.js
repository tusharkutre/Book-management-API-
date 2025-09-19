// each book has its own id, name, and price
import { getBook, saveBook , getBookById , deleteBookById} from '../models/book.model.js'; // Importing the functions to interact with the database
import { userRelation, bookRelation } from '../models/user.model.js';

//business logic to handle book operations
const getBooks = async(req,res) => {
    try {
        const books = await getBook(); // Fetch books from the database
        res.send(books)
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('Could not retrieve books');
    }
}

// book by id
const bookById = async(req , res) => {
  try{
    if(req.params.id){
        const book = await getBookById(req.params.id);
        if(book){
            res.send(book); //send the book by id
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

// const searchBookByName = (req, res) => {
//     try{
//         const bookName = req.query; // Get the book name from query parameters
//         const book = books.find(b => b.name.toLowerCase() === bookName.toLowerCase());
//         if (book) {
//             res.send(book);
//         } else {
//             res.status(404).send({ error: 'Book not found' });
//         }
//     } catch (error) {
//         console.error('Error fetching book by name:', error);
//         res.status(500).send({ error: 'Could not retrieve book' });
//     }
// }

// To save a new book to the database

const addBook = async (req, res) => {
  try {
    const authenticatedUserId = req.user && req.user.id ? req.user.id : null;
    const bookId = await saveBook(req.body, authenticatedUserId);
    res.status(201).send({ id: bookId, ...req.body, user_id: authenticatedUserId });
  } catch (error) {
    res.status(500).send({ error: 'Could not create a book' });
  }
};

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

//deleting a book by id
const deleteBook = (req, res) =>{
    const bookId = deleteBookById(req.params.id);
    
    if (bookId) {
        res.send(bookId); // Response with the deleted book
    } else {
        res.status(404).send({ error: 'Book not found' });
    }
}

// relational controllers
const getBooksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const books = await userRelation(userId);
    return res.status(200).send(books);
  } catch (error) {
    console.error('Error fetching books by user:', error);
    return res.status(500).send({ error: 'Could not retrieve books for user' });
  }
};

const getBookOwner = async (req, res) => {
  try {
    const { bookId } = req.params;
    const owner = await bookRelation(bookId);
    if (!owner) {
      return res.status(404).send({ error: 'Owner not found for this book' });
    }
    return res.status(200).send(owner);
  } catch (error) {
    console.error('Error fetching book owner:', error);
    return res.status(500).send({ error: 'Could not retrieve book owner' });
  }
};

// Exporting the function to be used in routes
export { getBooks , bookById , addBook , updateBook , deleteBook , getBooksByUser , getBookOwner };