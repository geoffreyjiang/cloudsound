const express = require("express");
const router = express.Router();
const { Song, Album } = require("../../db/models");

router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  console.log(songs);
  res.json(songs);
});

module.exports = router;
