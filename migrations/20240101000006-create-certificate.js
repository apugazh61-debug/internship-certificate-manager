'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('certificates', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            certificate_id: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },
            intern_id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'interns',
                    key: 'id'
                }
            },
            issue_date: {
                type: Sequelize.DATEONLY,
                allowNull: false,
                defaultValue: Sequelize.NOW
            },
            file_path: {
                type: Sequelize.STRING,
                allowNull: true
            },
            qr_code_url: {
                type: Sequelize.TEXT,
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
        await queryInterface.dropTable('certificates');
    }
};
