"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        username: "pouet",
        password: "pouet",
        email: "pouet@pouet.pouet",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "pouet2",
        password: "pouet2",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", { username: "pouet" });
    await queryInterface.bulkDelete("users", { username: "pouet2" });
  },
};
