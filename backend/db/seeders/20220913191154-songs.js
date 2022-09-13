"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          title: "the song title",
          description: "a good song",
          url: "url",
          previewImage: "an image",
          userId: 1,
          albumId: 1,
        },
        {
          title: "the other song title",
          description: "another good song",
          url: "url",
          previewImage: "an image",
          userId: 2,
          albumId: 1,
        },
        {
          title: "song title",
          description: "a song",
          url: "url",
          previewImage: "an image",
          userId: 1,
          albumId: 2,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     */
    await queryInterface.bulkDelete("Songs", null, {});
  },
};
