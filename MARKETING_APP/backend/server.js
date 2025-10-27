import express from 'express';
import dotenv from 'dotenv';
import { dbConnect } from './Config/Db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3200

// endpoint
app.get('/', (req, res) => {
    res.send('The APi is running here')
})

// connect database
dbConnect();
// The server
app.listen(PORT, () => {
    console.log(`The server is running in port: ${PORT}`);
})