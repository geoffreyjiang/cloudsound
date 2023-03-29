"use strict";
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable("PlaylistSongs", {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            playlistId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Playlists", key: "id" },
                onDelete: "cascade",
            },
            songId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: { model: "Songs", key: "id" },
                onDelete: "cascade",
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("PlaylistSongs");
    },
};
