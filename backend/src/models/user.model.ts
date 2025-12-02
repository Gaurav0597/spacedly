import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public refresh_token!: string | null;
  public is_two_factor_enabled!: boolean;
  public two_factor_otp!: string;
  public two_factor_otp_expiry!: Date;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      autoIncrement: true,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    refresh_token: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_two_factor_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
    },
    two_factor_otp: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    two_factor_otp_expiry: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  { modelName: 'User', timestamps: true, tableName: 'users', sequelize },
);

export default User;
