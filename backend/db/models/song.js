"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Song.belongsTo(models.Album, { foreignKey: "albumId" });
      Song.belongsTo(models.User, { as: "Artist", foreignKey: "userId" });
    }
  }
  Song.init(
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      url: DataTypes.STRING,
      imageUrl: DataTypes.STRING,
      userId: DataTypes.INTEGER,
      albumId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Song",
    }
  );
  return Song;
};
