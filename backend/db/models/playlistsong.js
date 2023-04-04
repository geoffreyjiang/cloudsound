"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class PlaylistSong extends Model {
        static associate(models) {
            PlaylistSong.belongsTo(models.Playlist, {
                foreignKey: "playlistId",
            });
            PlaylistSong.belongsTo(models.Song, {
                foreignKey: "songId",
            });
        }
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
