'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('stipends', {
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
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            amount: {
                type: Sequelize.DECIMAL(10, 2),
                allowNull: false
            },
            payment_date: {
                type: Sequelize.DATEONLY,
                allowNull: false
            },
            status: {
                type: Sequelize.ENUM('pending', 'paid', 'failed'),
                defaultValue: 'pending'
            },
            notes: {
                type: Sequelize.STRING,
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
        await queryInterface.dropTable('stipends');
    }
};
