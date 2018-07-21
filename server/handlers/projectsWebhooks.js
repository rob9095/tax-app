const db = require('../models');
const mongoose = require('mongoose');
const { refreshTokenApiCall, infusionsoftApiCall, teamworkApiCall } = require('../services/api');
const querystring = require('querystring');

const daysToAddArr = [
  {
    tasklist: "INITIAL PAYMENT",
    daysToAdd: "0",
  },
  {
    tasklist: "PROVIDE INFORMATION",
    daysToAdd: "9",
  },
  {
    tasklist: "PREPARATION",
    daysToAdd: "30",
  },
  {
    tasklist: "FINALIZE PAYMENT",
    daysToAdd: "37",
  },
  {
    tasklist: "CLIENT REVIEW",
    daysToAdd: "44",
  },
  {
    tasklist: "FINALIZE ENGAGEMENT",
    daysToAdd: "54",
  },
]

const tasksArray = [
  {
    insoftLabel: "Form 5471",
    teamworkLabel: "Questionnaire-Form 5471 (Foreign Corporation)",
  },
  {
    insoftLabel: "Form 8621 (Distribution/Disposition)",
    teamworkLabel: "Questionnaire-FBAR and Form 8938",
  },
  {
    insoftLabel: "Form 8621 (Distribution/Disposition)",
    teamworkLabel: "Questionnaire-Schedule D",
  },
  {
    insoftLabel: "Form 8621 (Annual Disclosure Only)",
    teamworkLabel: "Questionnaire-FBAR and Form 8938",
  },
  {
    insoftLabel: "Form 8621 (Annual Disclosure Only)",
    teamworkLabel: "Questionnaire-Schedule D",
  },
  {
    insoftLabel: "Schedule A",
    teamworkLabel: "Questionnaire-Schedule A",
  },
  {
    insoftLabel: "Schedule B",
    teamworkLabel: "Questionnaire-Schedule B",
  },
  {
    insoftLabel: "Schedule C",
    teamworkLabel: "Questionnaire-Schedule C",
  },
  {
    insoftLabel: "Schedule D",
    teamworkLabel: "Questionnaire-Schedule D",
  },
  {
    insoftLabel: "Schedule E",
    teamworkLabel: "Questionnaire-Schedule E",
  },
  {
    insoftLabel: "FinCen Form 114 (FBAR)/Form 8938",
    teamworkLabel: "Questionnaire-FBAR and Form 8938",
  },
  {
    insoftLabel: "Streamlined Procedure Package",
    teamworkLabel: "Questionnaire-FBAR and Form 8938",
  },
  {
    insoftLabel: "Getting Started",
    teamworkLabel: "Getting Started",
  },
  {
    insoftLabel: "Tax Organizer",
    teamworkLabel: "Tax Organizer",
  },
]

const checkInfusionsoftOppStage = (hookData, token) => {
  return new Promise((resolve,reject) => {
    const id = hookData.object_keys[0].id
    const url = `https://api.infusionsoft.com/crm/rest/v1/opportunities/${id}`
    return infusionsoftApiCall('get', url, token)
    .then((data)=>{
      console.log('the opportunity stage is')
      console.log(data.stage.name)
      resolve(data)
    })
    .catch((err)=>{
      console.log('the err is')
      console.log(err)
      reject(err);
    })
  })
}


const refreshAccessToken = async (token) => {
  return new Promise((resolve,reject) => {
    const url = `https://api.infusionsoft.com/token`
    return refreshTokenApiCall('post',url,token)
    .then(async (res)=>{
      let foundToken = await db.AccessToken.findOne({clientKey: 's43k8smygmedb86cwn9vk76h'})
      foundToken.accessToken = res['access_token']
      foundToken.refreshToken = res['refresh_token']
      foundToken.expirationDate = Date.now() + 8000000
      await foundToken.save();
      resolve(foundToken)
    })
    .catch((err)=>{
      reject(err)
    })
  })
}

// /api/webhooks/projects/new-project
// infusion soft web hook to trigger a new project creation
exports.handleProjectCreationTrigger = async (req, res, next) => {
  try {
    //battle against undefined and bad responses
    let opportunity = {};
    let orderData = {};
    const secret = req.headers['X-Hook-Secret'.toLowerCase()];
    res.header('X-Hook-Secret', secret);
    console.log(req.body)
    let token = await db.AccessToken.findOne({clientKey: 's43k8smygmedb86cwn9vk76h'})
    let currentDate = Date.now();
    if (currentDate > token.expirationDate) {
      // refresh token
      token = await refreshAccessToken(token)
    }
    // skip out if the webhoook isn't a stage move
    if (req.body['event_key'] !== 'opportunity.stage_move') {
      return res.status(200).json({status: "OK", msg: "non stage move"})
    }

    // check if the opportunity is at the correct stage
    opportunity = await checkInfusionsoftOppStage(req.body, token)

    // skip out if the opportunity doesn't have the right stage
    if (opportunity.stage.name !== 'Custom Stage 1') {
      return res.status(200).json({status: "OK", msg: "not correct stage"})
    }
    // get the order items for this opportunity
    // let orderData = await infusionsoftApiCall('get', `https://api.infusionsoft.com/crm/rest/v1/orders?contact_id=${opportunity.contact.id}`, token)
    orderData = await infusionsoftApiCall('get', `https://api.infusionsoft.com/crm/rest/v1/orders?contact_id=26717`, token)
    console.log(orderData)
    // add opportunity to the que in database
    const formattedOpportunity = {
      name: opportunity.opportunity_title,
      id: opportunity.id,
      contact: opportunity.contact,
      orderData,
      dateCreated: opportunity.date_created,
    }
    // double check if this opportunity que already exists
    let foundOpp = await db.OpportunityQue.findOne({id: opportunity.id})
    if (foundOpp) {
      //update it
      foundOpp.set(formattedOpportunity)
      foundOpp.save();
      handleNewOpportunity(foundOpp)
    } else {
      //create it
      let createdOpp = await db.OpportunityQue.create(formattedOpportunity)
      handleNewOpportunity(createdOpp)
    }
    // handle sending the data to teamwork
    return res.status(200).json({
      status: "OK",
    })
  } catch(err) {
    return next(err);
  }
}

const formatDate = (d) => {
  var date = new Date(d);
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var due_date = date.getFullYear() + (month < 10 ? '0' : '') + month + (day < 10 ? '0' : '') + day;
  return due_date
}

const loopTasks = async (currentTasks, order, user, tasklist) => {
  console.log('we are starting to loop tasklist:')
  console.log(tasklist)
  //date adder method
  Date.prototype.addDays = function(days) {
      let date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);

      return date;
  }
  //find days to add based on task list
  let daysToAdd = daysToAddArr.find(t => t.tasklist === tasklist).daysToAdd
  // format today's date
  let date = formatDate(new Date())
  // format the due date for this tasklist
  let dueDate = formatDate(new Date().addDays(daysToAdd))
  // loop over tasks
  for (let task of currentTasks) {
    //if tasklist is provide information lets check the order and update accordingly.
    // Set dates for existing order items and mark task completed if task doesn't exist in the order
    if (tasklist === 'PROVIDE INFORMATION') {
      // get the task map in the tasks array to check if task exists in infusionsoft opportunity order
      let taskMap = tasksArray.find(t => t.teamworkLabel === task.content)
      // if the taskMap was is a match
      if (taskMap) {
        // check if the order includes the task
        if (order.find(item => item.name === taskMap.insoftLabel)) {
          // if we have a match update the dates
          let taskData = JSON.stringify({
            "todo-item": {
              "due-date": dueDate,
              "start-date": date,
            }
          })
          console.log('we found a matching task with the order, updating task')
          console.log(task.id)
          await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/tasks/${task.id}.json`, user.apiKey, taskData)
          console.log('updated following task succesfully')
          console.log(task.id)
        }
      } else {
        // if no match mark task completed
        console.log('task not found in order, marking complete')
        await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/tasks/${task.id}/complete.json`, user.apiKey)
        console.log('task marked complete succesfully')
      }
    } else {
      //if tasklist is not provide information just set the dates
      console.log('tasklist is not Provide Information so just updating dates')
      let taskData = JSON.stringify({
        "todo-item": {
          "due-date": dueDate,
          "start-date": date,
        }
      })
      await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/tasks/${task.id}.json`, user.apiKey, taskData)
      console.log('dates updated succesfully')
    }
  }
}


const handleNewOpportunity = async (o) => {
  console.log('starting to add new project to teamwork')
  // battle agaist undefined or bad responses
  let response = {};
  let templates = {
    tasklists: [],
  };
  let order = [];
  let tasks = {
    "todo-items": [],
  };
  let user = await db.User.findOne({isSuperAdmin: true})
  let projectData = JSON.stringify({
    "project": {
      "name": o.name,
      "companyId": "31966",
      "privacyEnabled": "true",
      "replyByEmailEnabled": "true",
      "category-id": "13228"
    }
  })
  // create the project, category id 13228 is for onboarding client
  let createdProjectRes = await teamworkApiCall('post', 'https://taxsamaritan.teamwork.com/projects.json', user.apiKey, projectData)
  if (!createdProjectRes.id) {
    console.log('project not created succesfully')
    return
  }
  console.log('project added to teamwork')
  console.log('the created project res is')
  console.log(createdProjectRes)
  // fetch the project
  // newProject = await teamworkApiCall('get', `https://taxsamaritan.teamwork.com/projects/${createdProjectRes.id}.json`, user.apiKey).project
  // console.log('the new project from teamwork is')
  // console.log(newProject)
  // get the task list templates
  templates = await teamworkApiCall('get', 'https://taxsamaritan.teamwork.com/tasklists/templates.json', user.apiKey)
  console.log('we got the templates from teamwork')
  // request data to send when copying tasklist templates to new project
  let reqData = JSON.stringify({
    "projectId": createdProjectRes.id,
  })
  // loop the templates and copy them to the new project
  for (let tasklist of templates.tasklists) {
    console.log('updating template' + tasklist)
    await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/tasklist/${tasklist.id}/copy.json`, user.apiKey, reqData)
    console.log(tasklist + 'moved to new project successfully')
  }
  // get the order from opportunity to get correct tasks for provide information tasklist
  order = o.orderData.orders.find(order => order.title === o.name)
  if (order) {
    console.log('the order is')
    console.log(order)
  } else {
    console.log('cannot find order!')
  }
  // get all the tasks for the project
  tasks = await teamworkApiCall('get', `https://taxsamaritan.teamwork.com/projects/${createdProjectRes.id}/tasks.json`, user.apiKey)
  console.log('the total tasks from teamwork are')
  console.log(tasks.length)
  // loop the tasklists and perform neccesary updates to each task
  for (let tasklist of templates.tasklists) {
    let currentTasks = tasks['todo-items'].filter(t => t['todo-list-name'] === tasklist.name);
    console.log('the total current tasks are')
    console.log(currentTasks.length)
    await loopTasks(currentTasks, order, user, tasklist.name)
  }
  // update project in teamwork and assign correct category. write backend function that adds this project to our db.  remove opportunityQue from our db.
}
