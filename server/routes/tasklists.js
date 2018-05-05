const express = require('express');
const router = express.Router();
const { proccessTasklists } = require('../handlers/tasklists');

//add projects to DB, prefixed with /api -> /api/projects
router.post('/', proccessTasklists);

//get all projects
// router.get('/tasklists', getAllTasklists);

module.exports = router;
