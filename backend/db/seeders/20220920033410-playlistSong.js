"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("PlaylistSongs", [
            {
                playlistId: 1,
                songId: 2,
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                playlistId: 3,
                songId: 1,
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                playlistId: 2,
                songId: 3,
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                playlistId: 1,
                songId: 1,
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("PlaylistSongs", null, {});
    },
};
