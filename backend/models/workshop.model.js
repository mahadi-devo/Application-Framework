const mongoose = require('mongoose');

const WorkshopSchema = mongoose.Schema({
  //   user: {
  //     type: mongoose.Schema.Types.ObjectId,
  //     ref: 'user',
  //   },
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
  },
  start: {
    type: String,
  },
  title: {
    type: String,
  },
});

module.exports = mongoose.model('workshop', WorkshopSchema);
