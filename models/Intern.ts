import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

class Intern extends Model {
    public id!: number;
    public intern_id!: string; // Unique ID like INT-2023-001
    public name!: string;
    public email!: string;
    public phone!: string;
    public status!: string; // 'active', 'completed', 'terminated'
    public join_date!: Date;
    public end_date?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Intern.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        intern_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.ENUM('active', 'completed', 'terminated'),
            defaultValue: 'active',
        },
        join_date: {
            type: DataTypes.DATEONLY, // Just date, no time
            allowNull: false,
        },
        end_date: {
            type: DataTypes.DATEONLY,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'interns',
    }
);

export default Intern;
