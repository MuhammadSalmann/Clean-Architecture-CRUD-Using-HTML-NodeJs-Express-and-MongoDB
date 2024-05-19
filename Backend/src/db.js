const mongoose = require('mongoose');
const MONGO_URI = process.env.MONGO_URI;

const Connection = () => {
    mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Connected to the database');
        }
    )
    .catch((err) => {
        console.log('Error connecting to the database');
        }
    );
}

module.exports = Connection;