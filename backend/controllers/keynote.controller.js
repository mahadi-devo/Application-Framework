const { updateKeynotes } = require('./conference.controller');
const cloudinary = require('cloudinary').v2;
const Keynote = require('../models/keynote.model');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const add = async (req, res) => {
  try {
    const { name, organization, image, conferenceId } = req.body;
    console.log(req.body.conferenceId);
    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: 'ml_default',
    });

    const newKeynote = new Keynote({
      conferenceId: conferenceId,
      image: uploadResponse.secure_url,
      name: name,
      organization: organization,
    });

    const keynote = await newKeynote.save();
    const keynoteId = keynote._id;
    await updateKeynotes(conferenceId, keynoteId);

    res.status(200).json({
      keynote,
    });
  } catch (error) {
    console.log(error);
  }
};

const update = async (req, res) => {};

const remove = async (req, res) => {};

const getKeynotes = async (req, res) => {
  console.log(req.params.id);
  try {
    const id = req.params.id;
    const data = await Keynote.find({ conferenceId: id });

    res.status(200).json({
      data,
      sucess: true,
    });
  } catch (error) {
    res.status(500);
  }
};

module.exports = { add, update, remove, getKeynotes };
