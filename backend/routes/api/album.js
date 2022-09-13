const express = require("express");
const router = express.Router();
const { Album } = require("../../db/models");

router.post("/", async (req, res) => {
  const { title, description, previewImage } = req.body;
  const newAlbum = await Album.create({
    title,
    description,
    previewImage,
  });

  res.json(newAlbum);
});

module.exports = router;
