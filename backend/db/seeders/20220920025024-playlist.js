"use strict";

module.exports = {
    async up(queryInterface, Sequelize) {
        return queryInterface.bulkInsert("Playlists", [
            {
                userId: 1,
                name: "The Playlist",
                imageUrl:
                    "https://cdn.pixabay.com/photo/2020/08/03/09/51/iphone-5459688__340.png",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                userId: 2,
                name: "The other Playlist",
                imageUrl:
                    "https://cdn.pixabay.com/photo/2017/08/06/12/54/headphones-2592263__340.jpg",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                userId: 3,
                name: "The best Playlist",
                imageUrl:
                    "https://cdn.pixabay.com/photo/2018/04/11/19/48/music-3311599__340.png",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
            {
                userId: 1,
                name: "Yeeeeeee",
                imageUrl:
                    "https://cdn.pixabay.com/photo/2020/05/25/17/05/mockup-5219512__340.jpg",
                createdAt: Sequelize.literal("CURRENT_TIMESTAMP"),
                updatedAt: Sequelize.literal("CURRENT_TIMESTAMP"),
            },
        ]);
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    },
};
