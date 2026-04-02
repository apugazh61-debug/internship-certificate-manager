import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

class InternModule extends Model {
    public id!: number;
    public intern_id!: number;
    public module_id!: number;
    public status!: string; // 'pending', 'in_progress', 'completed'
    public score!: number; // Optional score
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

InternModule.init(
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
                model: 'interns',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        module_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'modules',
                key: 'id',
            },
            onDelete: 'CASCADE',
        },
        status: {
            type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
            defaultValue: 'pending',
        },
        score: {
            type: DataTypes.FLOAT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'intern_modules',
    }
);

export default InternModule;
