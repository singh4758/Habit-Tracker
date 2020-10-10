const express = require('express');
const habitTracker = require('../controllers/habit_tracker')

const router = express.Router();


router.get('/find-habit',habitTracker.findHabit);
router.get('/view-habit',habitTracker.viewHabit);
router.get('/update-habit',habitTracker.updateHabit);
module.exports = router;