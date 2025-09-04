//schema for user model
import connectDB from "../db/db.js";
import jwt from "jsonwebtoken";

let db;
(async () => {
  db = await connectDB();
})();

//generate token for that specific user
const generateToken = ({id,name,email}) => {
  return jwt.sign({id,name,email}, process.env.JWT_SECRET, {expiresIn: "1h"});
}

//verify token for that specific user
const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
}

const getUserByEmail = async (email) =>{
 const [userEmail] = await db.execute("SELECT * FROM users WHERE email = ?", [email]);
 return userEmail;
}

const createUserRegister = async ({name , email , password}) => {
  return db.execute("INSERT INTO users (name, email, password) VALUES (?, ?, ?)", [name,email,password])
}

export {getUserByEmail , createUserRegister, generateToken , verifyToken};