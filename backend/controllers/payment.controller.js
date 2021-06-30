const Payment = require('../models/payment.model');

const add = async (req, res) => {
  try {
    const { conferenceId, type } = req.body;
    const user = req.user;

    const newPayment = new Payment({
      conference: conferenceId,
      user: user,
      type: type,
    });

    const payment = await newPayment.save();

    res.status(200).json({
      payment,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = {
  add,
};
