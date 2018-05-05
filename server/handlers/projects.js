const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


const addProject = (project) => {
  return new Promise(async (resolve, reject) => {
    try {
      let createdProject = await db.Project.create(project);
      let foundProject = await db.Project.findById(createdProject.id);
      if (foundProject !== null) {
        resolve(foundProject);
      } else {
        reject(createdProject)
      }
    } catch(err) {
      reject(err);
    }
  });
}

exports.proccesProjects = async (req, res, next) => {
  try {
    let resultsArr = [];
    let projects = req.body.projects;
    for (let p of projects) {
      let project = {
            teamwork_id: p.teamwork_id,
            name: p.name,
            createdOn: p.createdOn,
            status: p.status,
      }
      let result = await addProject(project);
      resultsArr.push(result);
    }
    return res.status(200).json({projectsAdded: [resultsArr], message: `${resultsArr.length} projects were added to the database`})
  } catch(err) {
    return next(err);
  }
}

exports.getAllProjects = async (req, res, next) => {
  try {
    let projects = await db.Project.find()
    .sort({ createdOn: 'desc'});
    return res.status(200).json(projects);
  } catch(err) {
    return next(err);
  }
}
