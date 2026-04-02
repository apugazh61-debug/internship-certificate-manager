import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';
import Intern from './Intern';

class Stipend extends Model {
    public id!: number;
    public intern_id!: number;
    public amount!: number;
    public payment_date!: string;
    public status!: 'pending' | 'paid' | 'failed';
    public notes?: string;
}

Stipend.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        intern_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Intern,
                key: 'id',
            },
        },
        amount: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
        },
        payment_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('pending', 'paid', 'failed'),
            defaultValue: 'pending',
        },
        notes: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'stipends',
    }
);

// Define associations elsewhere or here if circular dependency is managed
// For now, we rely on lib/models.ts

export default Stipend;
