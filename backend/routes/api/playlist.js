const express = require("express");
const router = express.Router();
const { Album, Song, User, Playlist } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

router.post("/", restoreUser, async (req, res) => {
  const { name, imageUrl } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const newPlaylist = await Playlist.create({
    userId: current.id,
    name: req.body.name,
    imageUrl,
  });

  res.json(newPlaylist);
});

module.exports = router;
