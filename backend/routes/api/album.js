const express = require("express");
const router = express.Router();
const { Album } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

router.post("/", restoreUser, async (req, res) => {
  const { title, description, imageUrl, userId } = req.body;
  const { user } = req;
  const id = user.id;
  const newAlbum = await Album.create({
    title,
    description,
    imageUrl,
    userId: id,
  });

  res.json(newAlbum);
});

router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();

  const albums = await Album.findAll({ where: { userId: current.id } });
  res.json(albums);
});

router.get("/", async (req, res) => {
  const album = await Album.findAll();
  res.json(album);
});

module.exports = router;
