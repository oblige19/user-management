"use strict";
const bcrypt = require("bcrypt");

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

    await bcrypt.hash("admin", 12).then((hashedPassword) => {
      queryInterface.bulkInsert(
        "Users",
        [
          {
            firstName: "AJ",
            lastName: "Carlos",
            address: "Laguna",
            postCode: "4024",
            phoneNumber: "123456",
            email: "user@gmail.com",
            username: "admin",
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            firstName: "First",
            lastName: "Last",
            address: "Addr",
            postCode: "4023",
            phoneNumber: "123456",
            email: "user2@gmail.com",
            username: "adm",
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          {
            firstName: "First2",
            lastName: "Last2",
            address: "Addr2",
            postCode: "4023",
            phoneNumber: "123456",
            email: "user3@gmail.com",
            username: "first",
            password: hashedPassword,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ],
        {}
      );
    });
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
