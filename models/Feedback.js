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
  rating: { type: Number, default: 5 },
  likes: { type: Number, default: 0 },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
