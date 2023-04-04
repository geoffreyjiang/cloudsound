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

router.get("/", async (req, res) => {
    const playlist = await Playlist.findAll();
    res.json(playlist);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const playlist = await Playlist.findByPk(id, {
        include: {
            model: Song,
            through: {
                attributes: [],
            },
        },
    });

    return res.json(playlist);
});

router.post("/", restoreUser, async (req, res) => {
    const { user } = req;
    const current = user.toSafeObject();
    const { name, userId, imageUrl } = req.body;
    const playlist = await Playlist.create({
        name,
        userId: current.id,
        imageUrl,
    });
    res.json(playlist);
});

router.post("/:id", restoreUser, async (req, res) => {
    const { id } = req.params;
    const { songId } = req.body;
    const playlist = await Playlist.findByPk(id);
    const song = await Song.findByPk(songId);
    playlist.Songs.push(songId);
    // await PlaylistSong.create({
    //     songId: playlist.id,
    //     playlistId: song.id,
    // });
    console.log(playlist);
    res.json(playlist);
});
module.exports = router;
