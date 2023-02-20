"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("access_token", [
      {
        token: "pouet",
        expiresAt: new Date("2099-12-31T23:59:59"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        token: "expired",
        expiresAt: new Date("2019-12-31T23:59:59"),
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete("access_token", { token: "pouet" }, {});
    queryInterface.bulkDelete("access_token", { token: "expired" }, {});
  },
};
