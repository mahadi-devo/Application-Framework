const stripe = require("stripe")(
  "sk_test_51Is6w9CaLuVljyXit2L6GKkDbFDjEREemZfHCmiNF68Vi7b3T8jFUVGRlRA0cxlOxr1WOFFdnh1dAc0kA2eRJIvo00zkFGrrJI"
);

const pay = async (req, res) => {
  try {
    const { token, attendPrice } = req.body;

    console.log(req.body.attendPrice);

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: attendPrice * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
    });

    console.log(charge);

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "failure" });
  }
};

const researchPay = async (req, res) => {
  try {
    const { token, researchPrice } = req.body;

    console.log(req.body.attendPrice);

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id,
    });

    const charge = await stripe.charges.create({
      amount: attendPrice * 100,
      currency: "usd",
      customer: customer.id,
      receipt_email: token.email,
    });

    console.log(charge);

    res.json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.json({ status: "failure" });
  }
};

module.exports = { pay, researchPay };
