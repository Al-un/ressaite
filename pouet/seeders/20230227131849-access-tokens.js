"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // https://stackoverflow.com/a/48753999/4906586
    const users = await queryInterface.sequelize.query(
      `SELECT id FROM users WHERE username = "pouet2"`
    );
    const userRows = users[0];
    const pouet2Id = userRows[0].id;

    console.log("userRows", userRows);
    console.log("pouet2Id", pouet2Id);

    const result = await queryInterface.bulkInsert("access_tokens", [
      {
        token: "token1",
        userId: pouet2Id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        token: "token2",
        userId: pouet2Id,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
    console.log("result", result);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("access_tokens", { token: "token1" });
    await queryInterface.bulkDelete("access_tokens", { token: "token2" });
  },
};
