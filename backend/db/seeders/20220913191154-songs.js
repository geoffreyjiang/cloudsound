"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert(
      "Songs",
      [
        {
          title: "the song title",
          description: "a good song",
          url: "https://cloudsound-audio.s3.us-west-1.amazonaws.com/09+Nights.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1528590005476-4f5a6f2bdd9e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          userId: 1,
          albumId: 1,
        },
        {
          title: "the other song title",
          description: "another good song",
          url: "https://cloudsound-audio.s3.us-west-1.amazonaws.com/Menu+(Prod+By+Monte+Booker).mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1492284163710-4eef97892705?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=388&q=80",
          userId: 2,
          albumId: 3,
        },
        {
          title: "song title",
          description: "a song",
          url: "https://cloudsound-audio.s3.us-west-1.amazonaws.com/09+Nights.mp3",
          imageUrl:
            "https://images.unsplash.com/photo-1619983081593-e2ba5b543168?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
          userId: 4,
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
