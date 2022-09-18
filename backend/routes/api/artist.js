const express = require("express");
const router = express.Router();
const { Album, Song, User } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

router.get("/:id/albums", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();

  const songs = await Album.findAll({ where: { userId: current.id } });
  res.json(songs);
});

module.exports = router;
