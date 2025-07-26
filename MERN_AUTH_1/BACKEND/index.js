import express from 'express';
import 'dotenv/config';
import errorHandler from './middlewares/ErrorHandler.js';
import mongoose from 'mongoose';

const app = express();
const PORT = process.env.PORT || 8080;

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
  res.send('Hello World from Express!');
});

app.use(errorHandler);

// Start the server and connect to database
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("You're connected successfully to the database");
        
        app.listen(PORT, () => {
          console.log(`Server running on port:${PORT}`);
        })
    })
    .catch((error) => {
        console.log("Database connection failed");
    })

// npm install express bcrypt dotenv nodemon cookie-parser jsonwebtoken cors
// npm install --save-dev mongoose
// npm install nodemailer
// npm install joi