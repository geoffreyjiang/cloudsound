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
  } else if (!body) {
    res.status(400).json({
      message: "Validation error",
      statusCode: 400,
      errors: {
        body: "Comment body text is required",
      },
    });
  }
  if (current.id === comment.userId) {
    await comment.update({ body });
  } else {
    res.status(403).json({ message: "Forbidden", statusCode: 403 });
  }

  res.json(comment);
});

router.delete("/:id", restoreUser, async (req, res, next) => {
  const { id } = req.params;
  const { user } = req;
  const current = user.toSafeObject();
  const comment = await Comment.findOne({
    where: { id },
  });

  if (!comment) {
    res.status(404).json({
      message: "Comment couldn't be found",
      statusCode: 404,
    });
  }
  if (current.id === comment.userId) {
    await comment.destroy();
    res.json({
      message: "Successfully deleted",
    });
  } else {
    res.status(403).json({ message: "Forbidden", statusCode: 403 });
  }
});

module.exports = router;
