const mongoose = require('mongoose');

const ConferenceSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  attendPrice: {
    type: String,
    required: true,
  },
  researchPrice: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  status: {
    type: String,
  },
  keynotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Keynote',
    },
  ],
});

module.exports = mongoose.model('conference', ConferenceSchema);
