const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: String,
  description: {
    type: String,
    required: true,
  },
  rating: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
