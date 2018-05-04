const express = require('express');
const router = express.Router();
const { addProjects, addProjectsNew, addProjectsAsync, addProjectsOnebyOne } = require('../handlers/projects');

//prefixed with /api -> /api/projects
router.post('/projects', addProjectsOnebyOne);

module.exports = router;
