const Workshop = require("../models/workshop.model");
const UserModel = require("../models/user.model");
const attendeeEmailConfirmation = require("../utills/attendeePaymentConfirmation");
const crypto = require("crypto");

const add = async (req, res) => {
  const {
    address,
    author,
    discription,
    email,
    end,
    phone,
    start,
    title,
    conference,
  } = req.body;

  try {
    const newWorkShop = new Workshop({
      address,
      author,
      discription,
      email,
      end,
      phone,
      start,
      title,
      conference,
    });

    const workshop = await newWorkShop.save();
    res.json(workshop);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error add");
  }
};

const update = async (req, res) => {
  const { address, author, discription, email, end, phone, start, title } =
    req.body;
  // console.log('Backend');
  // console.log(start);
  const workshopFields = {};

  if (address) workshopFields.address = address;
  if (author) workshopFields.author = author;
  if (discription) workshopFields.discription = discription;
  if (email) workshopFields.email = email;
  if (end) workshopFields.end = end;
  if (phone) workshopFields.phone = phone;
  if (start) workshopFields.start = start;
  if (title) workshopFields.title = title;

  console.log(workshopFields.start);
  try {
    console.log(req.param.id);
    let workshop = Workshop.findById(req.params.id);

    if (!workshop) {
      return res.status(401).json({ msg: "Msg cannot be found" });
    }

    workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      { $set: workshopFields },
      { $new: true }
    );

    res.json(workshop);
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error update");
  }
};

const updateWorkshopStatus = async (req, res) => {
  try {
    const { workshopId, type } = req.body;

    let workshop = await Workshop.findById(workshopId);

    if (!workshop) {
      return res.status(400).json({ msg: "workshop cannot be found" });
    }

    const result = await Workshop.updateOne(
      { _id: workshop._id },
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
      await attendeeEmailConfirmation(
        user.email,
        `Workshop Approval Notification for the conference`,
        "Congratulation your work shop is approved",
        ""
      );
    } else if (type === "Rejected") {
      await attendeeEmailConfirmation(
        user.email,
        `Workshop Rejection Notification for the conference`,
        `Sorry Your workshop is rejected by the panel`,
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
    const workshop = await Workshop.find();
    res.json(workshop);
  } catch (err) {
    console.error(err);
  }
};

const getAllWorkshops = async (req, res) => {
  try {
    const workshop = await Workshop.find().populate("conference");
    res.json(workshop);
  } catch (err) {
    console.error(err);
  }
};

const del = async (req, res) => {
  try {
    let workshop = await Workshop.findById(req.params.id);
    console.log(req.params.id);
    if (!workshop) return res.status(404).json({ msg: "Cannot found" });

    await Workshop.findByIdAndRemove(req.params.id);
    res.json({ msg: "Workshop removed" });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  add,
  get,
  update,
  del,
  getAllWorkshops,
  updateWorkshopStatus,
};
