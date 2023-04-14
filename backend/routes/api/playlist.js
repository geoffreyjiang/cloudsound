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

router.post("/:id/add", restoreUser, async (req, res) => {
    const { id } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(id);
    console.log(id);
    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    const song = await Song.findByPk(songId);

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    await playlist.addSong(song);

    return res.json(playlist);
});

router.delete("/:id/remove", async (req, res) => {
    const { id } = req.params;
    const { songId } = req.body;

    const playlist = await Playlist.findByPk(id);

    if (!playlist) {
        return res.status(404).json({ message: "Playlist not found" });
    }

    const song = await Song.findByPk(songId);

    if (!song) {
        return res.status(404).json({ message: "Song not found" });
    }

    await playlist.removeSong(song);

    return res.json(playlist);
});

module.exports = router;

// PlaylistSong.create({
//     songId: song.id,
//     playlistId: id,
// });
// res.json(playlist);
