const Habits = require('../models/habits');

module.exports.findHabit = function(req,res){
    Habits.findById(req.query.id,function(err,habit){
        if(err){
            console.log('error in finding habit');
            return;
        }
        res.end(JSON.stringify(habit));
    });
}


module.exports.viewHabit = function(req,res){
    Habits.findById(req.query.id,function(err,habit){
        if(err){
            console.log('Error in finding Habit',err);
            return;
        }
        return res.render('tracker',{
            habit : habit
        });
    });
}

module.exports.updateHabit = function(req,res){
    let id = req.query.id;
    let date = req.query.date;
    let value = req.query.value;
    Habits.findById(id,function(err,habit){
        if(err){
            console.log('Error in Finding user to Update');
            return res.end('{"status":"failed"}');;
        }
        let tracker = habit.habit_tracker;
        tracker.set(date,value);
        if(date in tracker){
            console.log(true);
        }
        Habits.findOneAndUpdate({"_id" : id},{habit_tracker : tracker},function(err,habit){
            if(err){
                console.log("Error in Updating");
                return res.end('{"status":"failed"}');
            }
            return res.end('{"status":"success"}');
        });
    });
}