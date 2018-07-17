const db = require('../models');
const mongoose = require('mongoose');


// /api/webhooks/projects/new-project
// infusion soft web hook to trigger a new project creation
exports.handleProjectCreationTrigger = async (req, res, next) => {
  try {
    const secret = req.headers['X-Hook-Secret'.toLowerCase()];
    res.header('X-Hook-Secret', secret);
    return res.status(200).json({
      status: "OK",
    })
  } catch(err) {
    return next(err);
  }
}
