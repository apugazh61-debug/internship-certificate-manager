import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

class User extends Model {
    public id!: number;
    public email!: string;
    public password_hash!: string;
    public role!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password_hash: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        role: {
            type: DataTypes.STRING, // 'admin', 'evaluator'
            defaultValue: 'admin',
        },
    },
    {
        sequelize,
        tableName: 'users',
    }
);

export default User;
