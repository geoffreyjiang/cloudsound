const express = require("express");
const router = express.Router();
const { Album, User, Song } = require("../../db/models");
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

router.put("/:id", restoreUser, async (req, res, next) => {
  const { id } = req.params;
  const { title, description, imageUrl } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const album = await Album.findByPk(id);

  if (!album) {
    res.status(404);
    res.json({
      message: "Album couldn't be found",
      statusCode: 404,
    });
  }

  if (current.id === album.userId) {
    await album.update({ title, description, imageUrl });
  } else {
    const error = new Error("Invalid credentials");
    throw error;
  }

  res.json(album);
});

router.get("/current", restoreUser, async (req, res) => {
  const { user } = req;
  const current = user.toSafeObject();

  const albums = await Album.findAll({ where: { userId: current.id } });
  res.json(albums);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const album = await Album.findOne({
    where: { id },
    include: [
      {
        model: User,
        as: "Artist",
        attributes: ["id", "username", "imageUrl"],
      },
      {
        model: Song,
        attributes: [
          "id",
          "userId",
          "title",
          "description",
          "url",
          "createdAt",
          "updatedAt",
          "imageUrl",
        ],
      },
    ],
  });

  if (!album) {
    res.status = 404;
    res.json({
      message: "Album does not exist",
      statusCode: "404",
    });
  }

  res.json(album);
});
router.post("/:id/songs", async (req, res) => {
  const { id } = req.params;
  const album = await Album.findOne({ where: { id } });
  if (!album) {
    res.status(404).json({
      message: "Album does not exist",
      statusCode: "404",
    });
  }
});

router.get("/", async (req, res) => {
  const album = await Album.findAll();
  res.json(album);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { user } = req;
  const current = user.toSafeObject();
  const album = await Album.findOne({ where: { id } });

  if (!album) {
    res.status(404).json({
      message: "Album not found",
      statusCode: 404,
    });
  }

  if (current.id === album.userId) {
    album.destroy();
    res.json("Deleted");
  } else {
    res.status(403).json({ message: "invalid credentials", statusCode: 403 });
  }
});
module.exports = router;
