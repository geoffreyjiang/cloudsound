const express = require("express");
const router = express.Router();
const { Song, Album } = require("../../db/models");

router.post("/", async (req, res) => {
  const { title, description, url, imageUrl, albumId } = req.body;

  const song = await Song.create({
    title,
    description,
    url,
    previewImage: imageUrl,
    albumId,
  });

  res.json(song);
});

router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

module.exports = router;
