const db = require('../models');

const waitFor = (ms) => new Promise(r => setTimeout(r, ms))

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

exports.addProjects = async (req,res,next) => {
  try {
    let foundProjectArr = [];
    let projects = req.body;
    await asyncForEach(projects, async p => {
      waitFor(2000);
      // check for duplicates
      let duplicateProject = await db.Project.findOne({teamwork_id: p.teamwork_id});
      if (duplicateProject !== null) {
        foundProjectArr.push({
          error: `Unable to add ${p.id} to the database`
        })
      } else if (p.id === '239884') {
        // add each project to the database
        let project = await db.Project.create({
          teamwork_id: p.id,
          name: p.name,
          createdOn: p['created-on'],
          status: p.status,
        });
        let foundProject = await db.Project.findById(project.id);
        if (foundProject === null){
          foundProjectArr.push({
            error: `Unable to add ${p.id} to the database`
          })
        } else {
          foundProjectArr.push(foundProject);
        }
      }
    })
    return res.status(200).json(foundProjectArr);
  } catch(err) {
    return next(err);
  }
}
