const express = require('express');
const router = express.Router();
const { getAllProjects, proccesProjects } = require('../handlers/projects');

// prefixed with /api -> /api/projects
//post new projects
router.post('/', proccesProjects);

//get all projects
router.get('/', getAllProjects);

module.exports = router;
