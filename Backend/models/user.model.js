//schema for user model
import connectDB from "../db/db.js";

let db;
(async () => {
  db = await connectDB();
})();

// a single user can create multiple books
const userRelation = async (userId) => {
  // Returns all books created by a given user
  const [books] = await db.execute("SELECT * FROM book WHERE user_id = ?", [userId]);
  return books;
};

const bookRelation = async (bookId) => {
  // Returns the user who created a specific book
  const [users] = await db.execute(
    "SELECT u.* FROM users u JOIN book b ON u.id = b.user_id WHERE b.id = ?",
    [bookId]
  );
  return users[0] || null; // One user per book
};

const getUserByEmail = async (email) =>{
 const [userEmail] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
 return userEmail;
}

const createUserRegister = async ({name , email , password}) => {
  return db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name,email,password])
}

export {getUserByEmail , createUserRegister , userRelation , bookRelation};