const express = require("express");
const router = express.Router();
const { Song, Album, User, Comment } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

router.post("/:id/comments", restoreUser, async (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const song = await Song.findOne({ where: { id } });

  if (!song) {
    res.status(404);
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
  const comment = await Comment.create({
    body,
    songId: id,
    userId: current.id,
  });
  res.json(comment);
});

router.get("/:id/comments", async (req, res) => {
  const { id } = req.params;
  const song = await Song.findOne({ where: { id } });
  if (!song) {
    res.status(404);
    res.json({
      message: "Song does not exist",
      statusCode: 404,
    });
  }
  const comment = await Comment.findOne({
    where: { songId: id },
    include: [{ model: User, attributes: ["id", "username"] }],
  });
  res.json(comment);
});

router.post("/", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();
  const { title, description, url, imageUrl, albumId } = req.body;
  const album = await Album.findOne({ where: { id: albumId } });

  if (!album) {
    res.status(404);
    res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
    throw error;
  } else if (!title && !url) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = {
      statusCode: 400,
      error: { title: "Song title is required", url: "Audio is required" },
    };
    throw error;
  } else if (!title) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = {
      statusCode: 400,
      error: { title: "Song title is required" },
    };
    throw error;
  } else if (!url) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = { statusCode: 400, error: { url: "Audio is required" } };
    throw error;
  }
  const song = await Song.create({
    title,
    description,
    url,
    imageUrl,
    albumId,
    userId: current.id,
  });

  res.json(song);
});

router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();

  const songs = await Song.findAll({ where: { userId: current.id } });
  res.json(songs);
});

router.put("/:id", restoreUser, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, url, imageUrl } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const song = await Song.findByPk(id);

  if (!song) {
    res.status(404);
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  } else if (!title && !url) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = {
      statusCode: 400,
      error: { title: "Song title is required", url: "Audio is required" },
    };
    throw error;
  } else if (!title) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = { error: { title: "Song title is required" } };
    throw error;
  } else if (!url) {
    const error = new Error("Validation Error");
    error.status = 400;
    error.errors = { error: { url: "Audio is required" } };
    throw error;
  }

  if (current.id === song.userId) {
    await song.update({ title, description, url, imageUrl });
  } else {
    const error = new Error("Invalid credentials");
    throw error;
  }

  res.json(song);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const song = await Song.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "imageUrl"],
      },
      { model: Album, attributes: ["id", "title", "imageUrl"] },
    ],
  });
  if (!song) {
    res.status(404);
    res.json({
      message: "Song couldn't be found",
      statusCode: 404,
    });
  }
  res.json(song);
});

router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  res.json(songs);
});

module.exports = router;
