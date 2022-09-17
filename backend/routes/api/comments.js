const express = require("express");
const router = express.Router();
const { Album, Song, User, Comment } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
router.put("/:id", restoreUser, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const comment = await Comment.findOne({
    where: { id },
    include: [{ model: User, attributes: ["id", "username"] }],
  });

  if (!comment) {
    res.status(404);
    res.json({
      message: "Comment couldn't be found",
      statusCode: 404,
    });
  }

  if (current.id === comment.userId) {
    await comment.update({ body });
  } else {
    const error = new Error("Invalid credentials");
    throw error;
  }

  res.json(comment);
});

router.delete("/:id", restoreUser, async (req, res, next) => {
  const { id } = req.params;
  const { body } = req.body;
  const { user } = req;
  const current = user.toSafeObject();
  const comment = await Comment.findOne({
    where: { id },
  });

  if (!comment) {
    res.status(404);
    res.json({
      message: "Comment couldn't be found",
      statusCode: 404,
    });
  }
  if (current.id === comment.userId) {
    await comment.destroy();
    res.json({
      message: "Deleted",
    });
  } else {
    const error = new Error("Invalid credentials");
    throw error;
  }
});

module.exports = router;
