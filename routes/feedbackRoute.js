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

router.post("/", express.urlencoded({ extended: true }), async (req, res) => {
  if (!req.body.name || !req.body.description) {
    return res
      .status(400)
      .json({ error: "Name and description are required fields." });
  }

  let feedbackDate = new Date();
  // let formattedDate = `${getDate(feedbackDate)} de ${getMonth(feedbackDate,"MMMM",{ locale: ptBR })} de ${getYear(feedbackDate)}`;
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
    res.status(500).json({ error: "Internal Server Error from cath" });
  }
});

module.exports = router;
