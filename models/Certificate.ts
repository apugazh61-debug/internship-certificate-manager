import { DataTypes, Model } from 'sequelize';
import sequelize from '@/lib/db';

class Certificate extends Model {
    public id!: number;
    public certificate_id!: string; // Unique public ID for verification (e.g. UUID)
    public intern_id!: number;
    public issue_date!: Date;
    public file_path!: string; // Path to generated PDF on server/S3
    public qr_code_url!: string; // URL for QR code (points to verification page)
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Certificate.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        certificate_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        intern_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'interns',
                key: 'id',
            },
        },
        issue_date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        file_path: {
            type: DataTypes.STRING,
            allowNull: true, // Might be generated later
        },
        qr_code_url: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'certificates',
    }
);

export default Certificate;
