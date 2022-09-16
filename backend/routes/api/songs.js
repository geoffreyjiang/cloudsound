const express = require("express");
const router = express.Router();
const { Song, Album } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

router.post("/", async (req, res) => {
  const { title, description, url, imageUrl, albumId } = req.body;

  const album = await Album.findOne({ where: { id: albumId } });

  if (!album) {
    const error = new Error("Album couldn't be found");
    error.status = 404;
    throw error;
  }

  const song = await Song.create({
    title,
    description,
    url,
    imageUrl,
    albumId,
  });

  res.json(song);
});

router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();

  const songs = await Song.findAll({ where: { userId: current.id } });
  res.json(songs);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await Song.findOne({ where: { id: req.params.id } });
  if (!song) {
    const error = new Error("Song couldn't be found");
    error.status = 404;
    throw error;
  }
  res.json(song);
});

router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

module.exports = router;
