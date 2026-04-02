import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

class Module extends Model {
    public id!: number;
    public name!: string;
    public description!: string;
    public duration_days!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Module.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        duration_days: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
        },
    },
    {
        sequelize,
        tableName: 'modules',
    }
);

export default Module;
