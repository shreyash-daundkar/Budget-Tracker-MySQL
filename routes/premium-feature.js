const express = require('express');

const  { leaderBoard, downloadReport } = require('../controllers/premium-feature');


const router = express.Router();


router.get('/leaderboard', leaderBoard);

router.get('/download-report', downloadReport);


module.exports = router;