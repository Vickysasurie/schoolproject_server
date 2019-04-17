const express = require('express');
const path = require('path');
const bodyparser = require('body-parser');
const app = express();
const morgan = require('morgan');
var port = process.env.PORT || 3006;

app.use(bodyparser.urlencoded({ extended: true }));
//app.use(express.static(path.join(__dirname, 'dist/foundry-client')));
app.use(bodyparser.json());

// api history
app.use(morgan('dev'));

// cross error rectifier
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    console.log("time is: ",Date.now());
    next();
});

var db = require('./databaseconfig');
const mongoose  =require('mongoose');
mongoose.connect(db.db);

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


db.once('open', () =>{
 console.log('connected to a database');   
                  
});


app.get('/', (req,res)=> {
	console.log("Hello School project server");
	res.status(200).send("Hi This is the homepage of School project client");
});

var imagerouter = require('./router/imagerouter');

app.use('/api', imagerouter);

app.listen(port, function() {
	console.log("School server listen on the port: ",port);
});

