const db = require('../models');
const asyncJs = require('async');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


exports.addProjectsAsync = async (req, res, next) => {
  let projects = req.body.projects;
  try {
    let projectsAdded = await db.Project.create(projects);
    return res.status(200).json({projects: [...projects], message: `${projects.length} projects were added to the database`})
  } catch(err) {
    return next(err);
  }
}

exports.addProjectsOnebyOne = async (req, res, next) => {
  try {
    let projects = req.body.projects;
    let projectsAdded = [];
    await projects.forEach(async p => {
      let project = await db.Project.create({
            teamwork_id: p.teamwork_id,
            name: p.name,
            createdOn: p.createdOn,
            status: p.status,
      })
      .then( async data => {
        let foundProject = await db.Project.findById(data.id);
        if (foundProject !== null) {
          projectsAdded.push(foundProject)
        } else {
          projectsAdded.push({
            message: `unable to add project ${p.teamwork_id}`
          })
        }
      })
      .catch(err => {
        return next(err)
      })
    });
    if (projectsAdded.length < 3) {
      setTimeout(function(){
        return res.status(200).json(projectsAdded)
      }, 5000)
    }
  } catch(err) {
    return next(err)
  }
}
  // async.each(projects, function createProjectInDb(p) {
  //   try {
  //     let project = db.Project.create({
  //       teamwork_id: p.teamwork_id,
  //       name: p.name,
  //       createdOn: p.createdOn,
  //       status: p.status,
  //     })
  //   } catch(err) {
  //     return res.satus(400).json({
  //       message: err
  //     })
  //   }
  // }, function allDone(err){
  //   if (err) {
  //     reject();
  //     return res.satus(400).json({
  //       message: err
  //     })
  //   } else {
  //     resolve();
  //     return res.status(200).json({
  //       message: 'stuff was added??!?!'
  //     })
  //   }
  // })

// exports.addProjectsNew = async (req, res, next) => {
//   let projects = req.body.projects;
//   let promises = projects.map( p => {
//     return p.teamowork_id !== ''
//   })
//   Promise.all(promises)
//   .then(data => {
//     return res.status(200).json(data)
//   })
//   .catch(err => {
//     return res.status(400).json({
//       message: err
//     })
//   })
// }
//
// exports.addProjects = (req,res,next) => {
//     let foundProjectArr = [];
//     let projects = req.body.projects;
//     async.eachOfLimit(projects, 2, function(p, i) {
//       async function addProject() {
//         try {
//           if (p.teamwork_id === '240930') {
//             // add each project to the database
//             let project = db.Project.create({
//               teamwork_id: p.teamwork_id,
//               name: p.name,
//               createdOn: p.createdOn,
//               status: p.status,
//             });
//             foundProjectArr.push(foundProject);
//           }
//         } catch(e) {
//           return res.status(400).json({
//             message: e
//           })
//         }
//       };
//     }, function (err) {
//       if (err) {
//         return res.status(400).json({
//           message: err
//         });
//       }
//   })
// }
