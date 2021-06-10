const Conference = require('../models/conference.model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const get = async (req, res) => {};

const getConference = async (req, res) => {};

const add = async (req, res) => {
  try {
    const { title, startDate, endDate, location, description, picture } =
      req.body.data;

    const user = req.body.user;

    const uploadResponse = await cloudinary.uploader.upload(picture, {
      upload_preset: 'ml_default',
    });

    const newConference = new Conference({
      user: user,
      title: title,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description,
      image: uploadResponse.secure_url,
      keynotes: null,
    });

    const conference = await newConference.save();
    res.status(200).json(conference);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update = async (req, res) => {};

module.exports = { add, get, update, getConference };
