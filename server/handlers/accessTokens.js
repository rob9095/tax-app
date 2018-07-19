const db = require('../models');

exports.addAccessToken = async (res, req, next) => {
  try {
    let tokenCheck = await db.AccessToken.find()
    if (tokenCheck.length > 0) {
      return next({
        status: 400,
        message: 'Unable to add token, one already exists',
      })
    }
    let accessToken = await db.AccessToken.create(req.body)
    let foundToken = await db.AccessToken.findById(accessToken.id)
    return res.status(200).json(foundToken)
  } catch (err) {
    if(err.code === 11000) {
      err.message = 'Access Token already exists.';
    }
    return next(err)
  }
}
