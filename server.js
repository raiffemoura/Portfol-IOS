require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const feedbackRoute = require("./routes/feedbackRoute");

const app = express();
const PORT = 5000;

const uri =
  "mongodb+srv://raiffemoura:mongoDBportfol-IOS@cluster0.auzmfah.mongodb.net/Feedbacks?retryWrites=true&w=majority";

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
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
