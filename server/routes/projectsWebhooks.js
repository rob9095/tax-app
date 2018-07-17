const express = require('express');
const router = express.Router();
const { handleProjectCreationTrigger } = require('../handlers/projectsWebhooks');

// prefixed with /api -> /api/webhooks/projects/

// /api/webhooks/projects/new-project
// trigger new project creation with request from infusionsoft
router.post('/new-project', handleProjectCreationTrigger);


module.exports = router;
