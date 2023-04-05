const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');


const app = express();
require('dotenv').config();
const PORT = 2500;
const UserRoute = require('./routes/user'); 
const AdminRoute = require('./routes/admin');
const HotelRoute = require('./routes/hotel');

app.use(express.json());
app.use(morgan('dev'));
app.use(express.static('public'));

mongoose.connect(process.env.MONGODB_URL).then((response) => {
    console.log(`Database Connected`);
}).catch((error) => {
    console.log(`There was an error` + error);
})

// app.get('/', (req, res) => {
//     res.send("Welcome to the Application");
// })

app.use('/api/v1/users', UserRoute);

app.use('/api/v1/admins', AdminRoute);

app.use('/api/v1/hotels', HotelRoute);

app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
})