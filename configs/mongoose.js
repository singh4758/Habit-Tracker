//setup to connect with mongodb

const mongoose = require('mongoose');

const db  = mongoose.connection;

mongoose.connect('mongodb://localhost/habit-tracker');

// On error this code will run
db.on('error',console.error.bind(console,'connection Error'))

//Once it is connected with database then this function run
db.once('open',function(){
    console.log('Connected with habbitTracker MongoDb');
});