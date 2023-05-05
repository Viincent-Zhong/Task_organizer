const mongoose = require('mongoose');

// const mongoUrl = MONGODB_URI;
// mongoose.Promise = bluebird;

const connectToMongoDB = async() => mongoose.connect('mongodb://127.0.0.1:27017/',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('Connected to db')
    }).catch(err => {
        console.log(`MongoDB connection error. Please make sure MongoDB is running. ${err}`);
    });

module.exports = connectToMongoDB
