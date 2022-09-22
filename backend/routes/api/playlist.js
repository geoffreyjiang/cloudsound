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
  if (!name) {
    res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Playlist name is required",
      },
    });
  }
  const newPlaylist = await Playlist.create({
    userId: current.id,
    name: req.body.name,
    imageUrl,
  });

  res.json(newPlaylist);
});

router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();
  const playlists = await Playlist.findAll({ where: { userId: current.id } });
  res.json(playlists);
});

router.post("/:id/songs", restoreUser, async (req, res) => {
  const { id } = req.params;
  const { songId, name } = req.body;
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
    res.json(playlistSong);
  } else {
    res.status(403).json({
      statusCode: 404,
      message: "Invalid Credentials",
    });
  }
});

router.put("/:id", restoreUser, async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const current = user.toSafeObject();
  const playlist = await Playlist.findByPk(id);
  const { name, imageUrl } = req.body;

  if (!playlist) {
    res.status(404).json({ statusCode: 404, message: "Playlist not found" });
  } else if (!name) {
    res.status(400).json({
      message: "Validation Error",
      statusCode: 400,
      errors: {
        name: "Playlist name is required",
      },
    });
  }
  if (current.id === playlist.userId) {
    const update = await playlist.update({ name, imageUrl });
    res.json(update);
  } else {
    res.status(403).json({ statusCode: 403, message: "Forbidden" });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const playlist = await Playlist.findByPk(id, {
    include: [{ model: Song, through: { attributes: [] } }],
  });

  if (!playlist) {
    res.status(404).json({
      statusCode: 404,
      message: "Playlist couldn't be found",
    });
  }
  res.json(playlist);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const current = user.toSafeObject();
  const playlist = await Playlist.findOne({ where: { id } });

  if (!playlist) {
    res.status(404).json({
      message: "Playlist not found",
      statusCode: 404,
    });
  }
  if (current.id === playlist.userId) {
    await playlist.destroy();
    res.json("Successfully deleted");
  } else {
    res.status(403).json({ message: "Forbidden", statusCode: 403 });
  }
});
module.exports = router;
