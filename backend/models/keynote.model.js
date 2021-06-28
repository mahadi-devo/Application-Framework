const mongoose = require('mongoose');

const KeynoteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  conferenceId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conference',
  },
});

module.exports = mongoose.model('Keynote', KeynoteSchema);
