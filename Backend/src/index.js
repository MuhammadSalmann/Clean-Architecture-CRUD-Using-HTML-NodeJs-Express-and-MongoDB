const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.PORT || 8080;

const personRouter = require('./routes/person')
const userRouter = require('./routes/user.js');

// Contect to the database
const connection = require('./db');
connection();

// Middleware
app.use(cors()); // You allow all origins to access your Express server.
app.use(bodyParser.json()); //To parse JSON bodies
// app.use(express.json());  //To parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));  // To parse URL-encoded bodies

// Routes
app.use('/user', userRouter);
app.use('/person', personRouter);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
    }
);