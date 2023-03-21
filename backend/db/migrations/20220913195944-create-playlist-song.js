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
                references: { model: "Playlist", key: "id" },
                onDelete: "cascade",
            },
            songId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: "Song",
                    key: "id",
                },
                onDelete: "cascade",
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable("PlaylistSongs");
    },
};
