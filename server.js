// express backend server
import express from 'express';
import routes from './routing/routes.js';

const app = express();
const PORT =  process.env.PORT || 3000; // Default to 3000 if PORT is not set

app.use(express.json()); // Middleware to parse JSON bodies
app.use('/', routes); //using the routes defined in routing/routes.js 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 