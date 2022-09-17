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
router.get("/", async (req, res) => {
  const album = await Album.findAll();
  res.json(album);
});

module.exports = router;
