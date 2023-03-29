"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Playlist extends Model {
        static associate(models) {
            Playlist.belongsToMany(models.Song, {
                through: models.PlaylistSong,
                foreignKey: "playlistId",
                otherKey: "songId",
            });
            Playlist.belongsTo(models.User, { foreignKey: "userId" });
        }
    }
    Playlist.init(
        {
            name: DataTypes.STRING,
            userId: DataTypes.INTEGER,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: "Playlist",
        }
    );
    return Playlist;
};
