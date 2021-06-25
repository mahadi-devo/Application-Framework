const ResearcherModel = require('../models/researcher.model');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const add = async (req, res) => {
  try {
    const { title, author, email, abstract, area, file } = req.body.data;

    const user = req.body.user;

    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: 'ml_default',
    });

    const newResearcher = new ResearcherModel({
      user: user,
      title: title,
      author: author,
      email: email,
      abstract: abstract,
      area: area,
      file: uploadResponse.secure_url,
    });

    console.log(newResearcher);

    const researcher = await newResearcher.save();
    res.status(200).json(researcher);
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = { add };
