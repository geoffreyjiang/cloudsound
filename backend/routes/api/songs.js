const express = require("express");
const router = express.Router();
const { Song } = require("../../db/models");
// const { check } = require("express-validator");
// const { handleValidationErrors } = require("../../utils/validation");

// const validator = require("validator");

// const validateSong = [
//   check("title")
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage("Song title is required"),
//   check("url")
//     .exists({ checkFalsy: true })
//     .notEmpty()
//     .withMessage("Audio is required"),
//   handleValidationErrors,
// ];

router.get("/", async (req, res) => {
  const songs = await Song.findAll();
  console.log(songs);
  res.json(songs);
});

module.exports = router;
