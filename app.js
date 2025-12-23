const express = require('express'); 
const dotenv = require('dotenv');
const expressLayouts = require('express-ejs-layouts');
dotenv.config();
const router = require('./routes/main');
const app = express();


const port = 3000;

app.use(express.static('public'));

// Template Engine
app.use(expressLayouts);
app.set('layout' , './layouts/main');
app.set('view engine' , 'ejs');

app.use('/', router);


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



