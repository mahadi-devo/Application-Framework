const Conference = require("../models/conference.model");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const get = async (req, res) => {
  try {
    const data = await Conference.find({});

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
};

const getPending = async (req, res) => {
  try {
    const data = await Conference.find({ status: 'pending' });

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
};

const update = async (req, res) => {
  const {
    title,
    startDate,
    endDate,
    location,
    description,
    attendPrice,
    researchPrice,
    image,
    status,
    _id,
    keynotes,
  } = req.body;

  const conferenceFields = {};

  if (title) conferenceFields.title = title;
  if (startDate) conferenceFields.startDate = startDate;
  if (endDate) conferenceFields.endDate = endDate;
  if (location) conferenceFields.location = location;
  if (description) conferenceFields.description = description;
  if (image) conferenceFields.image = image;
  if (status) conferenceFields.status = status;
  if (keynotes) conferenceFields.keynotes = keynotes;
  if (attendPrice) conferenceFields.attendPrice = attendPrice;
  if (researchPrice) conferenceFields.researchPrice = researchPrice;

  try {
    let conference = await Conference.findById(_id);

    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "ml_default",
    });

    if (uploadResponse) {
      conferenceFields.image = uploadResponse.secure_url;
    }

    console.log(uploadResponse);

    if (!conference) {
      res.status(404).json({
        message: "conference is not availabe",
      });
    }

    conference = await Conference.findByIdAndUpdate(
      _id,
      { $set: conferenceFields },
      { new: true }
    ).populate("keynotes");

    res.status(200).json({ conference, success: true });
  } catch (error) {
    res.status(500).json({
      success: false,
      mss: error,
    });
  }
};

const conferenceConfirmation = async (req, res) => {
  const { status, _id } = req.body;

  const conferenceFields = {};

  if (status === 1) {
    conferenceFields.status = 'approved';
  } else if (status === 2) {
    conferenceFields.status = 'declined';
  } else {
    conferenceFields.status = 'pending';
  }

  try {
    let conference = await Conference.findById(_id);
    if (!conference) {
      res.status(404).json({
        message: 'conference is not availabe',
      });
    }

    conference = await Conference.findByIdAndUpdate(
      _id,
      { $set: conferenceFields },
      { new: true }
    );

    res.status(200).json({ conference, success: true });
    
  } catch (error) {
    res.status(500).json({
      success: false,
      mss: error,
    });
  }
};

const getConference = async (req, res) => {
  try {
    const id = req.params.id;
    const data = await Conference.findById(id).populate("keynotes");

    res.status(200).json({
      data,
      sucess: true,
    });
  } catch (error) {}
};

const add = async (req, res) => {
  try {
    const {
      title,
      startDate,
      endDate,
      location,
      description,
      image,
      attendPrice,
      researchPrice,
    } = req.body.data;

    console.log(req.body.data.attendPrice, req.body.data.researchPrice);

    const user = req.user;

    const uploadResponse = await cloudinary.uploader.upload(image, {
      upload_preset: "ml_default",
    });

    const newConference = new Conference({
      user: user,
      title: title,
      startDate: startDate,
      endDate: endDate,
      location: location,
      description: description,
      attendPrice: attendPrice,
      researchPrice: researchPrice,
      image: uploadResponse.secure_url,
      keynotes: [],
      status: "pending",
    });

    const conference = await newConference.save();
    res.status(200).json({ conference });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateKeynotes = async (conferenceId, keynoteId) => {
  await Conference.updateOne(
    { _id: conferenceId },
    { $push: { keynotes: [keynoteId] } }
  );
};

module.exports = {
  add,
  get,
  update,
  getConference,
  updateKeynotes,
  getPending,
  conferenceConfirmation,
};
