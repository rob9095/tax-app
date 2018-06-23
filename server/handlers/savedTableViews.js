const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

exports.addSavedTableView = async (req, res, next) => {
  try {
    let foundUser = await db.User.findById(req.body.user)
    if (foundUser === null) {
      return next({
        status: 400,
        message: 'Please login to save views',
      })
    }
    let createdView = await db.SavedTableView.create(req.body);
    let foundView = await db.SavedTableView.findById(createdView.id);
    foundUser.savedTableViews.push(foundView.id);
    foundUser.save();
    return res.status(200).json(foundView)
  } catch(err) {
    if(err.code === 11000) {
      err.message = 'A view with this name already exists';
    }
    return next(err);
  }
}

// return a users default view
exports.getUserDefaultView = async (req, res, next) => {
  try {
    const user = await db.User.findById(req.params.user_id)
    let view = {};
    if (user !== null) {
      view = await db.SavedTableView.findById(user.defaultView)
    }
    return res.status(200).json(view)
  } catch(err) {
    return next(err);
  }
}

// return all saved views for a user or shared views
exports.getSavedTableViews = async (req, res, next) => {
  try {
    const foundViews = req.params.user_id === 'shared' ?
      await db.SavedTableView.find({isShared: true})
      :
      await db.SavedTableView.find({user: req.params.user_id})
    return res.status(200).json(foundViews)
  } catch(err) {
    return next(err);
  }
}

exports.removeSavedTableView = async (req, res, next) => {
  try {
    let foundView = await db.SavedTableView.findById(req.params.view_id);
    if (foundView === null) {
      return next({
        status: 400,
        message: 'View not found',
      })
    }
    // need way to remove any default view from users here
    await foundView.remove();
    return res.status(200).json(foundView)
  } catch(err) {
    return next(err);
  }
}

exports.toggleSharedView = async (req, res, next) => {
  try {
    let foundView = await db.SavedTableView.findById(req.body.viewId);
    if (foundView === null) {
      return next({
        status: 400,
        message: 'View not found',
      })
    }
    if (foundView.username !== req.body.username) {
      return next({
        status: 400,
        message: 'You cannot share this view'
      })
    }
    foundView.isShared = !foundView.isShared;
    await foundView.save();
    return res.status(200).json(foundView)
  } catch(err) {
    return next(err);
  }
}

exports.setDefaultView = async (req, res, next) => {
  try {
    let foundView = await db.SavedTableView.findById(req.body.viewId);
    if (foundView === null) {
      return next({
        status: 400,
        message: 'View not found',
      })
    }
    let foundUser = await db.User.findById(req.body.userId);
    if (foundUser === null) {
      return next({
        status: 400,
        message: 'Unable to save default view',
      })
    }
    req.body.remove === true ? foundUser.defaultView = null : foundUser.defaultView = foundView._id
    await foundUser.save();
    return res.status(200).json(foundView)
  } catch(err) {
    return next(err);
  }
}
