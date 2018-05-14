const express = require('express');
const router = express.Router();
const { addInvitation, removeInvitation } = require('../handlers/invitations');

// add invitation email -> /api/invitations
router.post('/', addInvitation);

// delete invitation email -> /api/invitations
router.delete('/', removeInvitation);

module.exports = router;
