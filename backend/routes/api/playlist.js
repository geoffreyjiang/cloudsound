const express = require("express");
const router = express.Router();
const {
  Album,
  Song,
  User,
  Playlist,
  PlaylistSong,
} = require("../../db/models");
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

router.post("/:id/songs", restoreUser, async (req, res) => {
  const { id } = req.params;
  const { songId } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const song = await Song.findByPk(songId);
  const playlist = await Playlist.findOne({ where: { id } });
  if (!song) {
    res.status(404).json({
      statusCode: 404,
      message: "Song couldn't be found",
    });
  }
  if (!playlist) {
    res.status(404).json({
      statusCode: 404,
      message: "Playlist couldn't be found",
    });
  }

  //   res.json(songId);
  if (playlist.userId === current.id) {
    let playlistSong = await PlaylistSong.create({
      playlistId: playlist.id,
      songId: song.id,
    });
    // const data = PlaylistSong.findAll();
    res.json(playlistSong);
  } else {
    res.status(403).json({
      statusCode: 404,
      message: "Invalid Credentials",
    });
  }
});

module.exports = router;
