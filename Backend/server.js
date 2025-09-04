// express backend server
import express from 'express';
import connectDB  from './db/db.js'; // Import the database connection function
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Load environment variables
dotenv.config();

import { mainRoutes } from './routing/routes.js';
import { authRoutes } from './middleware/auth.js';
import verifyAuthentication from './middleware/verify.js';

const app = express();
const PORT =  process.env.PORT || 3000; // Default to 3000 if PORT is not set

// CORS configuration - allow frontend to make requests
app.use(cors({
  origin: 'http://localhost:5173', // Frontend URL
  credentials: true, // Allow cookies to be sent
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Explicitly allow methods
  allowedHeaders: ['Content-Type', 'Authorization'] // Allow headers
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse form data
app.use(cookieParser()); // Middleware to parse cookies

// Middleware to verify token
app.use(verifyAuthentication);

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', authRoutes);
app.use('/', mainRoutes); //using the routes defined in routing/routes.js 

let db; // Variable to hold the database connection

connectDB().then((connection) => {
  db = connection;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to database:', err);
});