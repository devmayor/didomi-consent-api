'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
      },
      consents: {
        type: Sequelize.ARRAY(Sequelize.ENUM('email_notifications', 'sms_notifications')),
        allowNull: true,
      },
      deletedAt: Sequelize.DATE,
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: Sequelize.DATE,
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
