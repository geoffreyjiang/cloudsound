"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PlaylistSong extends Model {
        static associate(models) {}
    }
    PlaylistSong.init(
        {
            playlistId: DataTypes.INTEGER,
            songId: DataTypes.INTEGER,
        },
        {
            sequelize,
            modelName: "PlaylistSong",
        }
    );
    return PlaylistSong;
};
