const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Clicks = require("../models/Clicks.js");

router.use(bodyParser.urlencoded({ extended: true }));

router.post("/", async (req, res) => {
  const { appName } = req.body;

  try {
    // Verificar se já existe um registro para o aplicativo
    let existingClicks = await Clicks.findOne({ appName });

    if (existingClicks) {
      // Se existir, incrementar o contador de cliques
      existingClicks.clicks++;
      await existingClicks.save();
      res.json(existingClicks);
    } else {
      // Se não existir, criar um novo registro com o contador inicializado em 1
      let newClicks = new Clicks({
        appName,
        clicks: 1,
      });
      let savedClicks = await newClicks.save();
      res.json(savedClicks);
    }
  } catch (error) {
    console.error("Error saving clicks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
