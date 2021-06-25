const Workshop = require('../models/workshop.model');

const add = async (req, res) => {
  const { address, author, discription, email, end, phone, start, title } =
    req.body;

  console.log(address);

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
    });

    const workshop = await newWorkShop.save();
    res.json(workshop);
  } catch (err) {
    console.error(err);
    res.status(500).json('Server error here');
  }
};

module.exports = { add };
