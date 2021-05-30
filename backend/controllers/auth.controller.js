const User = require('../models/user.model');

const registerController = async (req, res, next) => {
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

    sendToken(user, 200, res);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email }).select('+password');

    if (!userExist) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await userExist.comparePass(password);

    if (!isMatch) {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    sendToken(userExist, 200, res);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const logoutController = async (req, res, next) => {
  try {
    res.cookie('JwtToken', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
    });

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: e,
    });
  }
};

const sendToken = async (user, statusCode, res) => {
  const token = await user.getJwtToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res
    .status(statusCode)
    .cookie('JwtToken', token, options)
    .json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        role: user.role,
        email: user.email,
      },
      token,
    });
};

module.exports = { registerController, loginController, logoutController };
