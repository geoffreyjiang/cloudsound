const express = require("express");
const router = express.Router();
const { setTokenCookie } = require("../../utils/auth.js");
const { User } = require("../../db/models");
const { restoreUser } = require("../../utils/auth.js");
const { requireAuth } = require("../../utils/auth.js");
const sessionRouter = require("./session.js");
const usersRouter = require("./users.js");
const songsRouter = require("./songs.js");
const albumRouter = require("./album.js");
const artistRouter = require("./artist.js");
const commentRouter = require("./comments.js");
router.use(restoreUser);

router.use("/session", sessionRouter);

router.use("/users", usersRouter);
router.use("/songs", songsRouter);
router.use("/albums", albumRouter);
router.use("/artists", artistRouter);
router.use("/comments", commentRouter);

// router.get("/restore-user", (req, res) => {
//   return res.json(req.user);
// });
// router.get("/require-auth", requireAuth, (req, res) => {
//   return res.json(req.user);
// });

router.post("/test", function (req, res) {
  res.json({ requestBody: req.body });
});

// router.get("/set-token-cookie", async (_req, res) => {
//   const user = await User.findOne({
//     where: {
//       username: "Demo-lition",
//     },
//   });
//   setTokenCookie(res, user);
//   return res.json({ user });
// });

module.exports = router;
