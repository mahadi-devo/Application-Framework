const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
  conference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'conference',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  research: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'researcher',
  },
  type: {
    type: String,
    enum: ['1', '2'],
    default: null,
  },
});

module.exports = mongoose.model('payment', PaymentSchema);
