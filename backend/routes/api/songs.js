const express = require("express");
const router = express.Router();
const { Song, Album, User, Comment } = require("../../db/models");
const { setTokenCookie, restoreUser } = require("../../utils/auth");
const {
    singlePublicFileUpload,
    multiplePublicFileUpload,
} = require("../../awsS3");

router.post("/:id/comments", restoreUser, async (req, res) => {
    const { id } = req.params;
    const { body, username } = req.body;
    const { user } = req;
    const current = user.toSafeObject();
    const song = await Song.findOne({ where: { id } });
    if (!song) {
        res.status(404);
        res.json({
            message: "Song couldn't be found",
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
    const comment = await Comment.create({
        body,
        songId: id,
        userId: current.id,
        username,
    });
    // console.log(comment);
    res.json(comment);
});

router.get("/:id/comments", async (req, res) => {
    const { id } = req.params;
    const song = await Song.findOne({ where: { id } });
    if (!song) {
        res.status(404);
        res.json({
            message: "Song does not exist",
            statusCode: 404,
        });
    }
    // console.log(song, "LINE46");
    // const comment = await Comment.findOne({
    //   where: { songId: id },
    //   include: [{ model: User, attributes: ["id", "username"] }],
    // });
    const comment = await Comment.findAll({
        where: { songId: id },
        include: [{ model: User, attributes: ["id", "username"] }],
    });
    // console.log(comment);
    // console.log(comment, "/ID/COMMENTS");
    res.json(comment);
});

router.post(
    "/",
    restoreUser,
    // multiplePublicFileUpload([
    //     { name: "imageUrl", maxCount: 1 },
    //     { name: "url", maxCount: 1 },
    // ]),
    async (req, res) => {
        const { user } = req;
        const current = user.toSafeObject();
        // const { title, description, url, imageUrl, albumId } = req.body;
        // const album = await Album.findOne({ where: { id: albumId } });
        const { title, description, url, imageUrl, username } = req.body;
        if (url) await singlePublicFileUpload(req.files.url[0]);
        if (imageUrl) await singlePublicFileUpload(req.files.imageUrl[0]);
        // if (!album) {
        //   res.status(404);
        //   res.json({
        //     message: "Album couldn't be found",
        //     statusCode: 404,
        //   });
        // } else
        if (!title && !url) {
            const error = new Error("Validation Error");
            error.status = 400;
            error.errors = {
                statusCode: 400,
                error: {
                    title: "Song title is required",
                    url: "Audio is required",
                },
            };
            throw error;
        } else if (!title) {
            const error = new Error("Validation Error");
            error.status = 400;
            error.errors = {
                statusCode: 400,
                error: { title: "Song title is required" },
            };
            throw error;
        } else if (!url) {
            const error = new Error("Validation Error");
            error.status = 400;
            error.errors = {
                statusCode: 400,
                error: { url: "Audio is required" },
            };
            throw error;
        }
        const song = await Song.create({
            title,
            description,
            url,
            imageUrl,
            // albumId,
            username,
            userId: current.id,
        });

        res.json(song);
    }
);

router.get("/current", restoreUser, async (req, res) => {
    const { user } = req;
    const current = user.toSafeObject();

    const songs = await Song.findAll({ where: { userId: current.id } });
    res.json(songs);
});

router.put("/:id", restoreUser, async (req, res) => {
    const { id } = req.params;
    const { title, description, url, imageUrl } = req.body;
    const { user } = req;
    const current = user.toSafeObject();
    const song = await Song.findByPk(id);

    if (!song) {
        res.status(404);
        res.json({
            message: "Song couldn't be found",
            statusCode: 404,
        });
    } else if (!title && !url) {
        const error = new Error("Validation Error");
        error.status = 400;
        error.errors = {
            statusCode: 400,
            error: {
                title: "Song title is required",
                url: "Audio is required",
            },
        };
        throw error;
    } else if (!title) {
        const error = new Error("Validation Error");
        error.status = 400;
        error.errors = { error: { title: "Song title is required" } };
        throw error;
    } else if (!url) {
        const error = new Error("Validation Error");
        error.status = 400;
        error.errors = { error: { url: "Audio is required" } };
        throw error;
    }

    if (current.id === song.userId) {
        await song.update({ title, description, url, imageUrl });
    } else {
        const error = new Error("Invalid credentials");
        throw error;
    }

    res.json(song);
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const song = await Song.findOne({
        where: { id },
        include: [
            {
                model: User,
                as: "Artist",
                attributes: ["id", "username", "imageUrl"],
            },
            { model: Album, attributes: ["id", "title", "imageUrl"] },
        ],
    });
    if (!song) {
        res.status(404);
        res.json({
            message: "Song couldn't be found",
            statusCode: 404,
        });
    }
    res.json(song);
});

router.get("/", async (req, res) => {
    let { page, size } = req.query;

    let limit, offset;

    if (!page) page = 1;
    if (!size) size = 8;

    page = Number(page);
    size = Number(size);

    if (page >= 1 && size >= 1) {
        limit = size;
        offset = size * (page - 1);
    }

    // const songs = await Song.findAll({ limit, offset });
    const songs = await Song.findAll();
    console.log(songs);

    res.json(songs);
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;
    const { user } = req;
    const current = user.toSafeObject();
    const song = await Song.findOne({ where: { id } });

    if (!song) {
        res.status(404).json({
            message: "Song not found",
            statusCode: 404,
        });
    }

    if (current.id === song.userId) {
        await song.destroy();
        res.json("Successfully deleted");
    } else {
        res.status(403).json({ message: "Forbidden", statusCode: 403 });
    }
});

module.exports = router;
