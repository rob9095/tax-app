const db = require('../models');

exports.addProjects = async function(req,res,next) {
  try {
    let projects = req.body;  
  } catch(err) {
    return next(err);
  }
}
