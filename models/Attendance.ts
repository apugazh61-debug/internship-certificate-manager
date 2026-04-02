import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

class Attendance extends Model {
    public id!: number;
    public intern_id!: number;
    public date!: string; // YYYY-MM-DD
    public status!: string; // 'present', 'absent', 'late', 'excused'
    public check_in_time?: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Attendance.init(
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
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM('present', 'absent', 'late', 'excused'),
            defaultValue: 'present',
        },
        check_in_time: {
            type: DataTypes.DATE, // Stores time
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'attendances',
    }
);

export default Attendance;
