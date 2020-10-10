const express = require('express');
const habit_home = require('../controllers/habit_home');


const router = express.Router();

router.use('/habit-tracker',require('./habit_tracker'));
router.get('/',habit_home.habitShow);
router.post('/',habit_home.habitAdd);
router.get('/habit-delete',habit_home.habitDelete);

module.exports = router;