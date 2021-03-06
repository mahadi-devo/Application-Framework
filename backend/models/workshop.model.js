const mongoose = require('mongoose');

const WorkshopSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  address: {
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
  discription: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conference',
  },
  status: {
    type: String,
    default: 'pending',
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conference',
  },
});

module.exports = mongoose.model('workshop', WorkshopSchema);
