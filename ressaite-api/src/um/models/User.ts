import { sequelize } from "../../core/db/instance";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare password: string;
  declare email: string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: new DataTypes.STRING(128), allowNull: false },
    password: { type: new DataTypes.STRING(128), allowNull: false },
    email: { type: new DataTypes.STRING(128) },
  },
  { tableName: "users", sequelize }
);

export default User;
