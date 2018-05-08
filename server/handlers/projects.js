const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;


const addProject = (project) => {
  return new Promise(async (resolve, reject) => {
    try {
      let foundProject = await db.Project.findOne({teamwork_id: project.teamwork_id});
      if (foundProject) {
        //update it instead of create it
        foundProject.name = project.name;
        foundProject.createdOn = project.createdOn;
        foundProject.status = project.status;
        await foundProject.save();
        resolve(foundProject);
      } else {
        //create it
        let createdProject = await db.Project.create(project);
        resolve(createdProject);
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
    let formattedProjects = [];
    let tasklists = [];
    let tasks = [];
    let projects = await db.Project.find()
    .sort({ createdOn: 'desc'});
    for (let p of projects) {
      tasklists = await db.Tasklist.find({teamworkProject_id: p.teamwork_id})
      if (tasklists === null) {
        tasklists = [];
      }
      tasks = await db.Task.find({teamworkProject_id: p.teamwork_id})
      if (tasks === null) {
        tasks = [];
      }
      formattedProjects.push({
        projectData: p,
        projectTasklists: tasklists,
        projectTasks: tasks
      })
    }
    return res.status(200).json(formattedProjects);
  } catch(err) {
    return next(err);
  }
}

exports.getBasicProjects = async (req, res, next) => {
  try {
    let projects = await db.Project.find()
    .sort({ createdOn: 'desc'});
    return res.status(200).json(projects)
  }catch(err) {
    return next(err);
  }
}

exports.mapTasksToProjects = async (req, res, next) => {
  try {
    let results = [];
    let projects = req.body;
    let foundProject = {};
    //  loop the projects
    for (p of projects) {
      let counter = 0;
      // find the projects and update them
      foundProject = await db.Project.findOne({teamwork_id: p.projectData.teamwork_id})
      foundProject.tasklists = p.projectTasklists;
      foundProject.tasks = p.projectTasks;
      // loop the tasklists
      for(let t of p.projectTasklists) {
        let dates = [];
        let lastTaskChangedOn = '';
        let currentTasks = p.projectTasks.filter(task => task.tasklistId === t.teamwork_id)
        foundProject.tasklists[counter].tasks = currentTasks;
        // loop the tasks in each tasklist if they exist
        if (currentTasks.length > 0) {
          for (let task of currentTasks) {
            // push the dates into dates array
            dates.push({
              lastChangedOn: task.lastChangedOn
            })
          }
        }
        // sort the dates and save the first index to the project tasklist
        if (dates.length  > 0) {
          let sortedDates = dates.sort((a, b) => new Date(b.lastChangedOn) - new Date(a.lastChangedOn));
          lastTaskChangedOn = sortedDates[0].lastChangedOn
        }
        foundProject.tasklists[counter].lastChangedOn = lastTaskChangedOn
        counter++
      }
      foundProject.save();
      results.push(foundProject);
    }
    return res.status(200).json({projectsUpdated: [results], message: `${results.length} projects were updated`});
  } catch(err) {
    return next(err);
  }
}
