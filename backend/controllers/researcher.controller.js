const ResearcherModel = require("../models/researcher.model");
const UserModel = require("../models/user.model");
const ConferenceModel = require("../models/conference.model");
const cloudinary = require("cloudinary").v2;
const crypto = require("crypto");
const attendeeEmailConfirmation = require("../utills/attendeePaymentConfirmation");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const add = async (req, res) => {
  console.log("Back");
  const { title, author, email, abstract, area, file, conference } = req.body;
  try {
    //const user = req.body.user;

    const uploadResponse = await cloudinary.uploader.upload(file, {
      upload_preset: "ml_default",
    });

    const newResearcher = new ResearcherModel({
      //user: user,
      title: title,
      author: author,
      email: email,
      abstract: abstract,
      area: area,
      conference: conference,
      file: uploadResponse.secure_url,
    });

    console.log(newResearcher);

    const researcher = await newResearcher.save();
    res.status(200).json(researcher);
  } catch (error) {
    res.status(500).json(error);
  }
};

const update = async (req, res) => {
  const { title, author, abstract, email, area, file } = req.body;
  console.log("Backend");
  const researchFields = {};

  if (title) researchFields.title = title;
  if (author) researchFields.author = author;
  if (email) researchFields.email = email;
  if (abstract) researchFields.abstract = abstract;
  if (area) researchFields.area = area;
  if (file) researchFields.file = file;

  console.log(researchFields.abstract);
  try {
    console.log(req.param.id);
    let research = ResearcherModel.findById(req.params.id);

    if (!research) {
      return res.status(401).json({ msg: "Msg cannot be found" });
    }

    research = await ResearcherModel.findByIdAndUpdate(
      req.params.id,
      { $set: researchFields },
      { $new: true }
    );

    res.json(research);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error update");
  }
};

const updateResearchStatus = async (req, res) => {
  try {
    const { researchId, type } = req.body;

    let research = await ResearcherModel.findById(researchId).populate(
      "conference"
    );

    console.log(research.conference);
    if (!research) {
      return res.status(400).json({ msg: "research cannot be found" });
    }

    const result = await ResearcherModel.updateOne(
      { _id: research._id },
      { status: type }
    );

    const user = await UserModel.findById(req.user);

    let { token } = user;

    if (!token) {
      token = await UserModel.updateOne(
        { _id: req.user },
        { token: crypto.randomBytes(32).toString("hex") }
      );
    }

    if (type === "Approved") {
      const htmlBody = `<p>please pay and confirm by following link:</p><a href="http://${
        req.headers.host ? req.headers.host : "localhost:3000"
      }/researchPay/${user._id}/${token}">Click here</a>`;
      await attendeeEmailConfirmation(
        user.email,
        `Research Approval Notification for the conference`,
        "please pay and confirm by following link:\n",
        htmlBody
      );
    } else if (type === "Rejected") {
      await attendeeEmailConfirmation(
        user.email,
        `Research Rejection Notification for the conference`,
        `Sorry Your research is rejected by the panel ${research.name}`,
        ""
      );
    }

    res.status(200).json({ result });
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error update");
  }
};

const get = async (req, res) => {
  try {
    const research = await ResearcherModel.find();

    res.json(research);
  } catch (err) {
    console.error(err);
  }
};

const getAllResearches = async (req, res) => {
  try {
    const workshop = await ResearcherModel.find().populate("conference");
    res.json(workshop);
  } catch (err) {
    console.error(err);
  }
};

const del = async (req, res) => {
  try {
    console.log("Hi");
    let research = await ResearcherModel.findById(req.params.id);
    console.log(req.params.id);
    if (!research) return res.status(404).json({ msg: "Cannot found" });

    await ResearcherModel.findByIdAndRemove(req.params.id);
    res.json({ msg: "Research removed" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  add,
  del,
  get,
  update,
  getAllResearches,
  updateResearchStatus,
};
