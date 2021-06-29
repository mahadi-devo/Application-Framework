const User = require('../models/user.model');

const addUser = async (req, res) => {
  try {
    const { email, name, role, password } = req.body;
    const userExist = await User.findOne({ email });

    if (userExist) {
      res.status(400).json({
        success: false,
        message: 'User already exist',
      });
    }

    const user = await User.create({ email, name, role, password });

    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
}

module.exports = { addUser };
