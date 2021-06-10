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
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
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
  image: {
    type: String,
  },
  keynotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'keynote',
    },
  ],
});

module.exports = mongoose.model('conference', ConferenceSchema);
