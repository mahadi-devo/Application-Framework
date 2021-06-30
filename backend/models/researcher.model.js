const mongoose = require('mongoose');

const ResearcherModel = mongoose.Schema({
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'user',
  // },
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  abstract: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  file: {
    type: String,
  },
  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conference',
  },
  status: {
    type: String,
    default: 'pending',
  },
});

module.exports = mongoose.model('researcher', ResearcherModel);
