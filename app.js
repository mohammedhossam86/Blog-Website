const express = require('express'); 
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
dotenv.config();
const homeRouter = require('./routes/main');
const adminRouter = require('./routes/admin');
const app = express();
require('dotenv').config();
const connectDB = require('./config/dp');
const cookieParser = require("cookie-parser");
connectDB();

const port = 3000;
app.use(cookieParser()); 

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));

// Template Engine
app.use(expressLayouts);
app.set('layout' , './layouts/main');
app.set('view engine' , 'ejs');

app.use('/', homeRouter);
app.use('/admin', adminRouter);

const start = async () => { 


    try {
        app.listen(port , () => {
            console.log(`server lisetning on port ${port}`);
        })
    }
    catch (error) {
        console.log(error);
    }

}

start();



