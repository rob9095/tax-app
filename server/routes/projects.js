const express = require('express');
const router = express.Router();
const { addProjects } = require('../handlers/projects');

//prefixed with /api -> /api/projects
router.post('/projects', addProjects);

module.exports = router;
