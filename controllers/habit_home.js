const Habits = require('../models/habits');

module.exports.habitShow = function(req,res){
    Habits.find({},function(err,habits){
        if(err){
            console.log('Error in finding the Habits');
            return;
        }
        return res.render('home',{
            habits : habits
        });
    });
}

module.exports.habitAdd = function(req,res){
    Habits.create({
        name : req.body.habitName,
        habit_tracker : {}
    },function(err,newHabbit){
        if(err){
            console.log('Error in creating new Habits',err);
            return;
        }
        return res.redirect('/');

    });
}

module.exports.habitDelete = function(req,res){
    Habits.findByIdAndDelete(req.query.id,function(err){
        if(err){
            console.log('Error in deleting');
            return;
        }
        return res.redirect('/');
    })
}