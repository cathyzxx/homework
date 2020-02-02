const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
//change
const album = require('./router/album');
 var db = mongoose.connect('mongodb://localhost:27017/myDbs');



const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


//change
app.use('/api', album);
app.listen(3000,() => {
    console.log('app listening on port 3000.')
})


