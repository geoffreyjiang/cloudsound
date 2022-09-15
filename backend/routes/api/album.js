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

module.exports = router;
