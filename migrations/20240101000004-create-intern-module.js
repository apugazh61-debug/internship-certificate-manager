'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('intern_modules', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            intern_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'interns',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            module_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'modules',
                    key: 'id'
                },
                onDelete: 'CASCADE'
            },
            status: {
                type: Sequelize.ENUM('pending', 'in_progress', 'completed'),
                defaultValue: 'pending'
            },
            score: {
                type: Sequelize.FLOAT,
                allowNull: true
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('intern_modules');
    }
};
