const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");

const Clicks = require("../models/Clicks.js");

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", async (req, res) => {
  try {
    const clicks = await Clicks.find();
    res.json(clicks);
  } catch (error) {
    console.error("Error fetching clicks:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/", async (req, res) => {
  const { appName } = req.body;

  try {
    // Verificar se já existe um registro para o aplicativo
    let existingClicks = await Clicks.findOne({ appName });

    if (existingClicks) {
      // Se existir, incrementar 1 no contador de cliques
      existingClicks.clicks++;
      await existingClicks.save();
      res.json(existingClicks);
    } else {
      // Se não existir, cria um novo registro começando com o contador de cliques 1
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
