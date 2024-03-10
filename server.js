require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedbackRoute = require("./routes/feedbackRoute");
const clicksRoute = require("./routes/clicksRoute");

const app = express();
const PORT = 5000;
const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB:", error);
  });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {});
app.use("/feedbacks", feedbackRoute);
app.use("/clicks", clicksRoute);
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
