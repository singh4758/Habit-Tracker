const mongoose = require('mongoose');

const db  = mongoose.connection;

mongoose.connect('mongodb://localhost/habit-tracker');

db.on('error',console.error.bind(console,'connection Error'))

db.once('open',function(){
    console.log('Connected with habbitTracker MongoDb');
});