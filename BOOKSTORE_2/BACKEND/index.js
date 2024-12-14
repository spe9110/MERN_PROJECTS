import express, { request, response } from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/bookModels.js";
import booksRoutes from "./Routes/booksRoutes.js";
import cors from "cors";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS POLICY
// Option 1: Allow all origins with default of cors (*)
app.use(cors());
// Option 2: Allow custom origins
// app.use(
//     cors({
//         origin: "http://localhost:3000/",
//         methods: ["GET", "POST", "PUT", "DELETE"],
//         allowedHeaders: ["Content-Type"],
//     })
// );

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack Tutorial!");
});

app.use('/books', booksRoutes);

// database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Your App is connected to database");
        app.listen(PORT, () => {
            console.log(`The app is running on port : ${PORT}` );
            
        });
    })
    .catch((error) => {
        console.log(error);
        
    })



/*

import express, { request, response } from "express";
import { PORT, MONGODB_URI } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./Models/bookModels.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (request, response) => {
    console.log(request);
    return response.status(234).send("Welcome to MERN Stack Tutorial!");
    
});

// Route for save a new book
app.post('/books', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear ) {
            return response.status(400).send({
                message: "send all required fields: title, author, publisher",
            });
        } 
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
        };
        const book = await Book.create(newBook);
        return response.status(201).send(book);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
})

// Route for get all books from database
app.get('/books', async (request, response) => {
    try {
        const books = await Book.find({});

        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        
    }
})

// Route for get one book from database by id
app.get('/books/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const book = await Book.findById(id);

        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
        
    }
})

// Route for update a book from a database by id
app.put('/books/:id', async (request, response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send( {
                message: "send all required fields: title, author, publisher",
            });
        }
        const { id } = request.params;

        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: "Book not found"});
        }
        return response.status(200).send({ message: "Book updated successfully"})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });        
    }
});

// Route for delete a book from a database by id
app.delete('/books/:id', async (request, response) =>{
    try {
        const { id } = request.params;
        
        const result = await Book.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: "Book not found"});
        }
        return response.status(200).send({ message: "Book deleted successfully"})
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message })
    }
})

// database
mongoose.connect(MONGODB_URI)
    .then(() => {
        console.log("Your App is connected to database");
        app.listen(PORT, () => {
            console.log(`The app is running on port : ${PORT}` );
            
        });
    })
    .catch((error) => {
        console.log(error);
        
    })



*/ 