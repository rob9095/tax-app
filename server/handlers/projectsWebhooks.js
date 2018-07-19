const db = require('../models');
const mongoose = require('mongoose');
const { refreshTokenApiCall, infusionsoftApiCall, teamworkApiCall } = require('../services/api');

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
    let opportunity = await checkInfusionsoftOppStage(req.body, token)

    // skip out if the opportunity doesn't have the right stage
    if (opportunity.stage.name !== 'Custom Stage 1') {
      return res.status(200).json({status: "OK", msg: "not correct stage"})
    }
    // get the order items for this opportunity
    // let orderData = await infusionsoftApiCall('get', `https://api.infusionsoft.com/crm/rest/v1/orders?contact_id=${opportunity.contact.id}`, token)
    let orderData = await infusionsoftApiCall('get', `https://api.infusionsoft.com/crm/rest/v1/orders?contact_id=26717`, token)
    console.log(orderData)
    // add opportunity to the que in database
    const formattedOpportunity = {
      name: opportunity.opportunity_title,
      id: opportunity.id,
      contact: opportunity.contact,
      orderData,
      dateCreated: opportunity.date_created,
    }
    let createdOpp = await db.OpportunityQue.create(formattedOpportunity)
    handleNewOpportunity(createdOpp)
    // handle sending the data to teamwork
    return res.status(200).json({
      status: "OK",
    })
  } catch(err) {
    return next(err);
  }
}


const handleNewOpportunity = async (o) => {
  let user = await db.User.findOne({isSuperAdmin: true})
  let projectData = {
    name: o.name,
    startDate: o.dateCreated,
    companyId: 31966,
    privacyEnabled: true,
    replyByEmailEnabled: true,
  }
  let createdProject = await teamworkApiCall('post', 'https://taxsamaritan.teamwork.com/projects', user.apiKey, projectData)
  let createdTasklists
}
