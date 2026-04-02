import { sequelize } from '../lib/models';

async function syncDatabase() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');

        // Sync all models
        // force: true will DROP tables if they exist (good for dev, bad for prod)
        // alter: true will try to update tables to match models
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to synchronize the database:', error);
    } finally {
        await sequelize.close();
    }
}

syncDatabase();
