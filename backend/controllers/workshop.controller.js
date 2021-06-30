const Workshop = require('../models/workshop.model');

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
    res.status(500).json('Server error add');
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
      return res.status(401).json({ msg: 'Msg cannot be found' });
    }

    workshop = await Workshop.findByIdAndUpdate(
      req.params.id,
      { $set: workshopFields },
      { $new: true }
    );

    res.json(workshop);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error update');
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

const del = async (req, res) => {
  try {
    let workshop = await Workshop.findById(req.params.id);
    console.log(req.params.id);
    if (!workshop) return res.status(404).json({ msg: 'Cannot found' });

    await Workshop.findByIdAndRemove(req.params.id);
    res.json({ msg: 'Workshop removed' });
  } catch (error) {
    console.log(error);
  }
};
module.exports = { add, get, update, del };
