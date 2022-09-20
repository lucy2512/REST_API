const express = require('express');
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
require('dotenv').config()
const router = require('./routes/api');

//set up express app
const app = express();

//connect to Mongodb
mongoose.connect(process.env.DB_URI).then(
    () => {
      console.log("Connected to MongoDB");
    },
    (err) => {
      console.log(err);
    }
  );;
mongoose.Promise = global.Promise;


//usse body-parser middleware

app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api',router);


//error jandling miidleware
app.use(function(err,req,res,next){
    // console.log(err);
    res.status(422).send({error:err.message});
})
// GET Request
// app.get('/api',function(req,res){
//     console.log("Getting Request");
//     res.send({name:"Parthib"});
// });



//listening to request

app.listen(process.env.port||5000, function(){
    console.log("Server Started Parthib Bro");
})