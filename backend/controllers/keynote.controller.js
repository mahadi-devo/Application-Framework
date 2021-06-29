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

const update = async (req, res) => {
  const { _id, name, organization, image, conferenceId } = req.body;

  const keynoteFields = {};

  if (name) keynoteFields.name = name;
  if (organization) keynoteFields.organization = organization;

  try {
    let keynote = await Keynote.findById(_id);

    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image, {
        upload_preset: 'ml_default',
      });

      if (uploadResponse) {
        keynoteFields.image = uploadResponse.secure_url;
      }
    }

    if (!keynote) {
      res.status(404).json({
        message: 'Keynote speaker is not availabe',
      });
    }

    keynote = await Keynote.findByIdAndUpdate(
      _id,
      { $set: keynoteFields },
      { new: true }
    );

    res.status(200).json({ keynote, success: true });
  } catch (error) {
    res.status(500);
  }
};

const remove = async (req, res) => {
  console.log('in');
  const id = req.params.id;

  try {
    const keynote = await Keynote.findById(id);

    if (keynote === null) {
      ress.status(404).json({
        msg: 'keynote speaker not found',
      });
    }

    await Keynote.findByIdAndRemove(id);

    res.status(200).json({
      msg: 'keynote speaker deleted',
    });
  } catch (error) {
    res.status(500);
  }
};

const getKeynotes = async (req, res) => {
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
