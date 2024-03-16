const express = require("express");
const router = express.Router();
const { format, getDate, getMonth, getYear } = require("date-fns");
const ptBR = require("date-fns/locale/pt-BR");

const Feedback = require("../models/Feedback");

router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find();
    res.json(feedbacks);
  } catch (error) {
    console.error("Error fetching feedbacks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  if (!req.body.name || !req.body.description || !req.body.rating) {
    return res
      .status(400)
      .json({ error: "Name, description and rating are required fields." });
  }

  let feedbackDate = new Date();
  let options = { year: "numeric", month: "long", day: "numeric" };
  let formattedDate = feedbackDate.toLocaleDateString("pt-BR", options);

  let feedback = new Feedback({
    name: req.body.name,
    description: req.body.description,
    rating: req.body.rating,
    date: formattedDate,
  });

  try {
    let savedFeedback = await feedback.save();
    res.json(savedFeedback);
  } catch (error) {
    console.error("Error saving feedback:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
