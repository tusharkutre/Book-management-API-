// express backend server
import express from 'express';
import connectDB  from './db/db.js'; // Import the database connection function

import { mainRoutes } from './routing/routes.js';
import { authRoutes } from './middleware/auth.js';

const app = express();
const PORT =  process.env.PORT || 3000; // Default to 3000 if PORT is not set

app.use(express.json()); // Middleware to parse JSON bodies

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