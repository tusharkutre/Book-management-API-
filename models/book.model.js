import connectDB from "../db/db.js";

let db;
(async () => {
  db = await connectDB();
})();
// async-await is not used here as there is no database connection or asynchronous operation involved.

// get books from the database
const getBook = async () => {
  try {
    if (!db) throw new Error("Database not initialized");
    const [rows] = await db.execute("SELECT * FROM book");
    return rows;
  } catch (error) {
    console.error("Error loading books from database:", error);
    throw new Error("Could not load books");
  }
};

//get a book by id
const getBookById = async (id) => {
  try {
    if (!db) throw new Error("Database not initialized");
    const [rows] = await db.execute("SELECT * FROM book WHERE id = ?", [id]);
    return rows;
  } catch (err) {
    console.error("could not get the data by id", err);
    throw new Error("Could not get the book by id");
  }
};

//inserting or saving a book into the database
const saveBook = async (book) => {
  if (!db) throw new Error("Database not initialized");
  const [result] = await db.execute(
    "INSERT INTO book(name, price) VALUES (?, ?)",
    [book.name, book.price] // fields in the db
  );
  console.log("Book saved successfully");
  return result.insertId;
};

//update a book in the database

//delete a book from the database
const deleteBookById = async (id) => {
  try{
    const [deleteBook] = await db.execute("DELETE FROM book WHERE id = ?", [id]);
    return deleteBook;
  }catch(error){
    console.error('error deleting the book' , error);
    throw new Error('error deleting the book')
  }
};

export { getBook, getBookById, saveBook , deleteBookById };
