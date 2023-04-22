const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

//db
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('DB connected'));

mongoose.connection.on('error', err => {
    console.log(`DB connection error: ${err.message}`);
});

// bring routes in
const postRoutes = require('./routes/post');

//const customMiddleware = (req, res, next) => {
//    console.log("Middleware applied!");
//    next();
//};

// middleware
//app.use(customMiddleware);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use('/', postRoutes);

const port = process.env.Port || 8080;
app.listen(port, () => { 
    console.log(`A node js api is listening on ${port}`)
});