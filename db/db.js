import mysql from "mysql2/promise";

const connectDB = async () => {
  const db = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "book_store",
    port: 3306, // Default MySQL port
  });
  console.log("MySQL connected successfully");
  
  return db;
};

export default connectDB;