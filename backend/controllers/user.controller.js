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

const updateUser = async (req, res) => {
  const { _id, email, name, role } = req.body;

  const userFields = {};

  if(_id) userFields._id=_id;
  if(email) userFields.email=email;
  if(name) userFields.name=name;
  if(role) userFields.role=role;

  try {
    let user = await User.findById(_id);
    console.log('findById');
    if (!user) {
      res.status(404).json({
        message: 'user is not availabe',
      });
    }

    user = await User.findByIdAndUpdate(
      _id,
      { $set: userFields },
      { new: true }
    );
    console.log('update');

    res.status(200).json({ conference, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      mss: error,
    });
  }
}
const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }

}
const getAllUser = async (req, res) => {
  try {
    const data = await User.find({});

    res.status(200).json({
      data,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }
}
const removeUser = async (req, res) => {
  const { _id } = req.body;

  try {
    const user = await User.findByIdAndRemove(_id);

    res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    res.status(500).json({
      error,
      success: false,
    });
  }
}

module.exports = { addUser, updateUser, getUser, getAllUser, removeUser};
