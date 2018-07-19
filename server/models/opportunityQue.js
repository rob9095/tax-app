const mongoose = require('mongoose');

const opportunityQueSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  id: {
    type: Number,
    required: true,
    unique: true,
  },
  contact: {
    type: mongoose.Schema.Types.Mixed,
  },
  orderData: {
    type: mongoose.Schema.Types.Mixed,
  },
  dateCreated: {
    type: Date,
  },
});

const OpportunityQue = mongoose.model('OpportunityQue', opportunityQueSchema);

module.exports = OpportunityQue;
