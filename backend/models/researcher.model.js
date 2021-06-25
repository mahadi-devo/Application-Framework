const mongoose = require('mongoose');

const ResearcherSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
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
});

module.exports = mongoose.model('researcher', ResearcherSchema);
