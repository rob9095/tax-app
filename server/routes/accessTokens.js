const express = require('express');
const router = express.Router();
const { addAccessToken } = require('../handlers/accessTokens');

// add new token for infusionsoft api -> /api/access-token/add
router.post('/add', addAccessToken);

module.exports = router;
