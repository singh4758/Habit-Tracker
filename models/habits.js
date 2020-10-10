const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    habit_tracker :{
        type : Map,
    }
});


const Habits = mongoose.model('Habits',habitSchema);

module.exports = Habits;