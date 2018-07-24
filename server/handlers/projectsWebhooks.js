const db = require('../models');
const mongoose = require('mongoose');
const { refreshTokenApiCall, infusionsoftApiCall, teamworkApiCall } = require('../services/api');
const querystring = require('querystring');


const defaultMessages = [
  {
    name: "Welcome To The Tax Samaritan Family",
    isPrivate: 0,
    htmlBody: "<div class='fr-view'>Welcome to the Tax Samaritan family! We appreciate your business and want you to know that we are here for one reason...to serve you!<br><br>We like to keep the communication lines with our customers open so we can provide the best possible service - at all times. We'll always be here to answer your questions or address concerns. We value your feedback. Please use our centralized and secure collaboration site for all future communications versus email (which is far less secure) and will allow us to respond to you more efficiently while having a nice organized repository of communications that you can refer to later.<br><br>For right now though, if you have any questions about the requested information, please feel free to let me know anytime.<br><br>Again, welcome to the Tax Samaritan family and please let me know if there is anything I can help with!<br><br><br><br>Have a great day!<br>Randall Brody, Founder and Owner of Tax Samaritan</div>",
  },
  {
    name: "Internal Project Status Notes",
    isPrivate: 1,
    htmlBody: "Add internal status notes, outstanding info requested from TP, etc.",
  },
  {
    name: "Requested Information",
    isPrivate: 0,
    htmlBody: `I just wanted to check in and see if you had any questions\nabout the requested information needed or the use of your collaboration portal for your engagement.\nIf you do, please don't hesitate to let me know anytime.\n\n<br><br><br>Best regards.`,
  }
]

const specialTasks = [
  {
    name: "Getting Started",
    hasComment: true,
    htmlComment: `<div class='fr-view'>Welcome to Tax Samaritan!!! We look forward to working with you.<br><br>We know you have a lot of choices and we truly appreciate you choosing to work with us!<br><br>To start with your engagement, we would first like to provide an introduction to our collaboration portal - this is where all electronic communications and exchange of information will take place going forward. This area is secure and allows our team to provide maximum service and attention to your engagement.<br><br>We hope that you will find the use of our collaboration portal to be intuitive - however, should you have questions, please feel free to check out the FAQ's and videos in the Support Center or reach out to us directly anytime with any questions by adding a comment below or selecting the \"Messages\" tab above and sending an ad-hoc message.<br><br><strong>Uploading Files</strong><br>Files can be attached within each task by clicking on \"Attach files to this task\" right under the files header.<br><br>Alternatively, you can upload files by clicking on the \"FILES\" tab at the top of the screen, then \"Upload Files\", and then click on \"Add files\" and select your completed files (multiple files can be uploaded at one time) to upload, click \"Choose\" and then finally \"Upload these files\".<br><br>After uploading a file or files, you can then return to this same location, the \"Files\" tab, to see that the files have been successfully uploaded (and for future access or review).<br><br><strong>Provide All Amounts In Source Currency</strong><br>Please provide all amounts in source currency (we will handle the conversion to USD). Please specify the source currency when you upload the file by clicking on the \"Description\" tab or adding a \"Comment\" to us. Finally, if uploading multiple files with information for separate years, please specify the year in the description or file name.<br><br><strong>Overview Tab</strong><br>On the \"Overview\" tab, you can review all activity that has taken place within your engagement in one summary location.<br><br><strong>Apple/Android App</strong><br>Finally, our app (Teamwork) is also available for free download as an Apple App within the <a href=\"https://itunes.apple.com/us/app/teamworkpm-official/id726473079?mt=8\" target=\"_blank\">App Store</a> and within the <a href=\"https://play.google.com/store/apps/details?id=net.teamworkpm.phone\" target=\"_blank\">Android Market</a> so that you can utilize our collaboration portal on your phone.<br><br><strong>Help Us Maximize Your Tax Savings And Ensure A Complete &amp; Accurate Tax Filing</strong><br>We have designed this list of requested information to make the information-gathering process as easy and painless as possible and to ensure that we can maximize your legal deductions and fully comply with IRS/State disclosures and reporting.<br><br>Not all questions or requested information may be relevant for your situation, however they must be answered/disclosed if they are.<br><br>If you have any questions or uncertainty about any of the items requested below or you have information that you think is relevant, but was not requested below, please let us know.<br><br><strong>Task Review &amp; Completion</strong><br>Your next step is to review and complete all tasks under the \"Provide Information\" milestone.<br><br>Once you have completed a task, please add a checkmark to provide notice to us that the task has been completed.<br><br>Once you have completed all of the tasks and provided all requested information in the \"Provide Information\" milestone, we will start the review and preparation of your return.<br><br>We have found that the most efficient process for the preparation of your return is to start the preparation of your tax return after we have received all of your tax documents.<br><br>This will make the process as hassle-free as possible for you. So, once we have all of your tax documentation and you have marked your assigned task and this milestone complete, we will get started right away!<br><br><strong>Other Instructions</strong><br>Please be sure to identify and provide all information in the source currency paid/received (please notate the name of the currency and we will do a currency conversion to the U.S. dollar on your behalf based on accepted standards). All information should be reported based on calendar year-end totals. When we refer to the \"tax year\" or \"calendar year\" this means January 1 through December 31.<br><br>On occasion, after reviewing your information we may have additional questions and/or requests for additional documentation needed for your return.<br><br>If that occurs, we will let you know. This may result in a slight delay in the preparation of your return, but our objective is to provide a return that is accurate, complete and of course reflects the minimum tax liability possible for you.<br><br>We will send you reminder e-mails on occasion just in case you need us for any help or have questions.<br><br>If you are unable to open any Excel files provided, we have also provided a \"pdf\" version for your convenience.<br><br><strong>Standard Timeframes</strong><br>Our standard timeframes and fees are based upon prompt and organized replies from you. Your tax returns are expected to be submitted for your review fifteen (15) business days from receiving all requested documentation; it is possible that additional questions arise during the course of our engagement, in which case this estimated timeframe will be affected accordingly. The start of the fifteen (15) business days may also be impacted by the workload to which we have committed prior to accepting your engagement, and will likely be a factor if you sign up during peak times (April 15, June 15, October 15).<br><strong><br>Wealth Management / Tax Planning</strong><br>Because of our in-depth understanding of taxes and the integral role they play in all of life's circumstances, once your returns are prepared and analyzed, we will be able to identify your tax and investment planning opportunities based on the information within your return.<br><br>If you have already signed the \"Consent for Use and Disclosure of Tax Information\" as part of your engagement letter, this will require no additional steps on your part. However, if you would like us to provide this free analysis and review, both disclosures will need to be returned with your signature. These disclosures are required by the IRS anytime information is not used for the strict purpose of preparing your tax return (such as tax planning recommendations).<br><br>The analysis that we will prepare on your behalf will be a highly personalized view of potential gaps and suggestions that may assist me in aligning your wealth management approach (of which tax planning is a major factor) with your future goals. We believe that you will find this analysis and review to be a transformational process that will guide us both as we work together to address your financial needs and options. There is no cost or obligation for this review, but we hope that it will be of benefit and value for you.<br><br><strong>Questions? Comments? Concerns?</strong><br>Most taxpayers will find the preparation process of their return simple. Some returns are obviously more technical and there is more work both for you and for us. Whether you are novice or an expert with our system and process, we want you to be comfortable and make it as easy for you as possible. We are standing by if you need us for any questions or if there is a problem with the service that we are providing. Just let us know if you need help.<br><br><strong>Client Referrals</strong><br>We are expanding our business this year and we need your help. We are going to ask you for a small favor that will benefit us both.<br><br>Do you know others that have similar tax needs to those we have helped you with or have the need for a firm of experienced tax professionals?<br><br>We're excited to unveil our customer <a data-mce-href=\"http://www.taxsamaritan.com/tax-return-getting-started/refer-a-friend/\" data-mce-style=\"color: #2c94ec;\" href=\"http://www.taxsamaritan.com/tax-return-getting-started/refer-a-friend/\" shape=\"rect\" target=\"_blank\">referral program</a>, a way for you to share with your friends and family the great experience that you have had with Tax Samaritan and help them save money on their tax services and get a little something back yourself. For every friend you refer, they get $25 off tax preparation or representation fees and you get $50 when your referral becomes a customer.<br><br>Read more about the program and <a data-mce-href=\"http://www.taxsamaritan.com/tax-return-getting-started/refer-a-friend/\" data-mce-style=\"color: #2c94ec;\" href=\"http://www.taxsamaritan.com/tax-return-getting-started/refer-a-friend/\" shape=\"rect\" target=\"_blank\">click here</a> to get started and apply your savings on any future invoice.<br><br>With your help, we can expand our practice more efficiently than with costly mass-marketing approaches and then we can invest the savings in serving you and other clients better.<br><br><strong>Expat Resources</strong><br>As an expat you are faced with an assortment of issues, from how to get your mail forwarded from the U.S. to saving money on foreign currency exchange when sending money home or making a large purchase. Many expats face the same challenge of finding a reputable service provider to solve these issues and more (not just finding a reputable professional to prepare your U.S. tax returns). At Tax Samaritan, we have compiled some <a href=\"http://www.taxsamaritan.com/tax-resources/expat-resources/\" target=\"_blank\">expat resources</a> to make this process easier.<br><br>Finally, if you have received excellent service or value from an expat resource, please share your experience with us here at Tax Samaritan so that we can share your discovery with others.</div>`,
    authorId: 67675,
  },
  {
    name: "Tax Organizer",
    hasComment: true,
    htmlComment: "<div class='fr-view'>The IRS and state revenue agencies are now requiring additional documentation on methods used to verify client identity. Please upload a copy of your primary identification, such as a Driver's License/State Issued ID or Passport for all taxpayers (taxpayer and spouse if filing a joint tax return).<br><br>Thanks,<br>Randall</div>",
    authorId: 67675,
  }
]

const daysToAddArr = [
  {
    tasklist: "INITIAL PAYMENT",
    daysToAdd: 0,
  },
  {
    tasklist: "PROVIDE INFORMATION",
    daysToAdd: 9,
  },
  {
    tasklist: "PREPARATION",
    daysToAdd: 30,
  },
  {
    tasklist: "FINALIZE PAYMENT",
    daysToAdd: 37,
  },
  {
    tasklist: "CLIENT REVIEW",
    daysToAdd: 44,
  },
  {
    tasklist: "FINALIZE ENGAGEMENT",
    daysToAdd: 54,
  },
]

const tasksArray = [
  {
    insoftLabel: "Form 2555",
    teamworkLabel: "Questionnaire-Travel Worksheet"
  },
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
    insoftLabel: "Tax Organizer",
    teamworkLabel: "Tax Organizer",
  },
  {
    insoftLabel: "Getting Started",
    teamworkLabel: "Getting Started",
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

const handleSpecialTask = async (task, taskInfo, apiKey) => {
  const commentData = JSON.stringify({
    "comment": {
      "body": taskInfo.htmlComment,
      "content-type": "html",
      "isprivate": false,
    }
  })
  let createdComment = await teamworkApiCall('post', `https://taxsamaritan.teamwork.com/tasks/${task.id}/comments.json`, apiKey, commentData)
  if (createdComment.id) {
    console.log('comment succesfully added to task ID:' + task.id)
  } else {
    console.log(`unable to create comment for task ID: ${task.id}`)
  }
}

const updateTeamworkTask = async (task, apiKey, dates) => {
  let taskData = JSON.stringify({
    "todo-item": {
      "due-date": dates.dueDate,
      "start-date": dates.date,
    }
  })
  await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/tasks/${task.id}.json`, apiKey, taskData)
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
  let dates = {
    date,
    dueDate,
  }
  // loop over tasks
  for (let task of currentTasks) {
    //if tasklist is provide information lets check the order and update accordingly.
    // Set dates for existing order items, mark task completed if task doesn't exist in the order, if it's a special task handle it
    if (tasklist === 'PROVIDE INFORMATION') {
      // check if we are on a special task, if not mark it completed
      let sTaskInfo = specialTasks.find(t => t.name === task.content)

      // check the tasks array to see if this is a task that might be an order item
      let taskMap = tasksArray.find(t => t.teamworkLabel === task.content)
      // if this task was in the tasksArray, we need to check if it was in the infusionsoft order
      if (taskMap) {
        // check if the order includes the task
        if (order.order_items.find(item => item.name === taskMap.insoftLabel)) {
          // if we have a match update the dates
          console.log('we found a matching task with the order, updating task')
          console.log(task.id)
          await updateTeamworkTask(task, user.apiKey, dates)
          console.log('updated following task succesfully')
          console.log(task.id)
        } else if (sTaskInfo) {
          // if it's a speical task handle it,
          console.log('special task found, handling it')
          await handleSpecialTask(task, sTaskInfo, user.apiKey);
          // update dates for task
          await updateTeamworkTask(task, user.apiKey, dates)
        } else {
          // task is in provide information but its not a special task or a taskMap order match, marking task completed
          console.log('task not found in order or special tasks, marking complete')
          await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/tasks/${task.id}/complete.json`, user.apiKey)
          console.log('task marked complete succesfully')
          console.log(task.id)
        }
      }
    } else {
      // if tasklist is not provide information just set the dates
      console.log('tasklist is not Provide Information so just updating dates')
      await updateTeamworkTask(task, user.apiKey, dates)
      console.log('dates updated succesfully for task id')
      console.log(task.id)
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
  let order = {};
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

  // remove unneeded project features
  let featuresData = JSON.stringify({
    "project": {
      "use-tasks": "1",
      "use-messages": "1",
      "use-time": "0",
      "use-riskregister": "0",
      "use-billing": "0",
      "use-milestones": "1",
      "use-files": "1",
      "use-notebook": "0",
      "use-links": "0"
    }
  })
  await teamworkApiCall('put', `https://taxsamaritan.teamwork.com/projects/${createdProjectRes.id}.json`, user.apiKey, featuresData)

  // loop default messages arr and create the project default messages
  for (let message of defaultMessages) {
    let messageData = JSON.stringify({
      "post": {
        "title": message.name,
        "private": message.isPrivate,
        "body": message.htmlBody
      }
    })
    await teamworkApiCall('post', `https://taxsamaritan.teamwork.com/projects/${createdProjectRes.id}/posts.json`, user.apiKey, messageData)
  }
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
  // get the order from opportunity to get correct tasks for provide information tasklist. sorting to get most recent order, seems to be best option
  order = o.orderData.orders.sort((a,b) => (a['creation_date'] < b['creation_date']))[0]
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
