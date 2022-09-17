const express = require("express");
const router = express.Router();
const { Album, Song, User } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");

module.exports = router;
