const db = require('../models');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const createMessageReply = (message) => {
  return new Promise((resolve, reject) {
    try {
      setTimeout(async ()=>{
        let createdMessageReply = await db.MessageReply.create(message);
        let foundMessageReply = await db.MessageReply.findById(createdMessageReply.id)
        resolve(foundMessageReply);
      }, 200)
    } catch(err) {
      reject(err);
    }
  })
}

exports.processMessageReplies = async (req,res,next) => {
  try {
    const resultsArr = [];
    for (let m of req.body) {
      let result = await createMessageReply(m);
      resultsArr.push(result)
    }
    return res.status(200).json(resultsArr)
  } catch(err) {
    return next(err);
  }
}
