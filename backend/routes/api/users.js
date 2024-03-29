const express = require("express");
const router = express.Router();
const { setTokenCookie, requireAuth } = require("../../utils/auth");
const { User, Song, Album, Playlist } = require("../../db/models");
const { check } = require("express-validator");
const { handleValidationErrors } = require("../../utils/validation");
const { Op } = require("sequelize");
const validateSignup = [
    check("email")
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage("Please provide a valid email."),
    check("username")
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage("Please provide a username with at least 4 characters."),
    check("username")
        .not()
        .isEmail()
        .withMessage("Username cannot be an email."),
    check("password")
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage("Password must be 6 characters or more."),
    check("firstName")
        .exists({ checkFalsy: true })
        .withMessage("Invalid first name"),
    check("lastName")
        .exists({ checkFalsy: true })
        .withMessage("Invalid last name"),
    handleValidationErrors,
];

router.post("/", validateSignup, async (req, res) => {
    const { email, password, username, firstName, lastName, imageUrl } =
        req.body;
    const checkEmail = await User.findOne({ where: { email } });
    const checkUsername = await User.findOne({ where: { username } });

    if (checkEmail) {
        res.status(403);
        res.json({
            message: "User already exists",
            statusCode: 403,
            errors: {
                email: "User with that email already exists",
            },
        });
    } else if (checkUsername) {
        res.status(403).json({
            message: "User already exists",
            statusCode: 403,
            errors: {
                username: "User with that username already exists",
            },
        });
    } else if (!email && !username && !firstName && !lastName) {
        res.status(400).json({
            message: "Validation error",
            statusCode: 400,
            errors: {
                email: "Invalid email",
                username: "Username is required",
                firstName: "First Name is required",
                lastName: "Last Name is required",
            },
        });
    }

    const user = await User.signup({
        email,
        username,
        password,
        firstName,
        lastName,
        imageUrl,
    });

    // await setTokenCookie(res, user);
    const token = await setTokenCookie(res, user);
    return res.json({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email,
        token,
    });
});

router.get("/:id/songs", async (req, res, next) => {
    const { id } = req.params;
    const songs = await User.findByPk(id, {
        include: {
            model: Song,
            attributes: [
                "id",
                "userId",
                "title",
                "description",
                "url",
                "imageUrl",
                "createdAt",
                "updatedAt",
            ],
        },
    });
    if (!songs) {
        res.status(404);
        res.json({
            statusCode: "404",
            message: "Artist couldn't be found",
        });
    }

    res.json(songs);
});

router.get("/:id/playlists", async (req, res) => {
    const { id } = req.params;
    const playlists = await User.findByPk(id, {
        include: {
            model: Playlist,
            attributes: [
                "id",
                "userId",
                "name",
                "imageUrl",
                "createdAt",
                "updatedAt",
            ],
        },
    });
    if (!playlists) {
        res.status(404);
        res.json({
            statusCode: 404,
            message: "Artist couldn't be found",
        });
    }

    res.json(playlists);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findOne({
        where: { id },
        attributes: ["id", "username", "imageUrl"],
        include: [
            {
                model: Song,
                attributes: ["imageUrl"],
            },
        ],
    });

    const totalSongs = await Song.count({
        where: {
            userId: Number(id),
        },
    });

    const totalAlbums = await Album.count({
        where: {
            userId: Number(id),
        },
    });

    if (!user) {
        res.status(404).json({
            statusCode: 404,
            message: "Artist does not exists",
        });
    }
    user.dataValues.totalSongs = totalSongs;
    user.dataValues.totalAlbums = totalAlbums;
    res.json(user);
});

module.exports = router;
