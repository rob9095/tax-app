const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

exports.addInvitation = async(req, res, next) => {
  try {
    let invitation = await db.Invitation.create(req.body.email);
    let foundInvitation = await db.findById(invitation.id);
    return res.status(200).json(foundInvitation)
  } catch(err) {
    return next(err);
  }
}

exports.removeInvitation = async(req, res, next) => {
  try {
    let foundInvitation = await db.Invitation.findOne({email: req.body.email});
    await foundInvitation.remove();
    return res.status(200).json(foundInvitation)
  } catch(err) {
    return next(err);
  }
}
