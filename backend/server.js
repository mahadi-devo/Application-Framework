const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const mongoConnect = require("./config/db");

// env config
dotenv.config({ path: "./backend/config/.env" });

// DB Connection
mongoConnect();

// Routes
const auth = require("./routes/auth.route");
const conference = require("./routes/conference.route");
const researcher = require("./routes/researcher.route");
const workshop = require("./routes/workshop.route");
const keynote = require("./routes/keynote.route");
const stripe = require("./routes/stripe.route");
const user = require("./routes/user.route");
const payment = require("./routes/payment.route");
const response = require("./routes/response.route");

const app = express();

// Body Parser
app.use(express.json({ limit: "50mb" }));

app.use(mongoSanitize());

app.use(helmet());

app.use(xss());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100,
});
app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// CORS
app.use(cors());

// Mount routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/conferences", conference);
app.use("/api/v1/user", user);
app.use("/api/v1/researcher", researcher);
app.use("/api/v1/workshop", workshop);
app.use("/api/v1/keynotes", keynote);
app.use("/api/v1/stripe", stripe);
app.use("/api/v1/payment", payment);
app.use("/api/v1/response", response);

const dirname = path.resolve();
// app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(dirname, "frontend/start")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(dirname, "frontend", "start", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("api..");
  });
}

// morgan http
process.env.NODE_ENV === "development" ? app.use(morgan("dev")) : "";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

process.on("unhandledRejection", (reason, promise) => {
  console.log("Unhandled Rejection at:", promise, "reason:", reason);
  // process.exit(1);
});
