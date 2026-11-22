const express = require('express');
const router = express.Router();
const { getLevels, getOrCreatePlayer, submitQuizAnswer } = require('../controllers/gameController');

router.get('/levels', getLevels);
router.post('/player', getOrCreatePlayer);
router.post('/quiz/submit', submitQuizAnswer);

module.exports = router;