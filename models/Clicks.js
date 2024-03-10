const mongoose = require("mongoose");

const clicksSchema = new mongoose.Schema({
  appName: {
    type: String,
    required: true,
  },
  clicks: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Clicks", clicksSchema);
