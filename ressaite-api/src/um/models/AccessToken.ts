import { sequelize } from "@/core/db/instance";
import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import { randomUUID } from "crypto";

class AccessToken extends Model<
  InferAttributes<AccessToken>,
  InferCreationAttributes<AccessToken>
> {
  declare id: CreationOptional<number>;
  declare token: string;
  declare expiresAt: Date;

  init(): void {
    this.token = randomUUID();
    this.expiresAt = new Date();
    this.expiresAt.setDate(this.expiresAt.getDate() + 30);
  }
}

AccessToken.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: { type: new DataTypes.STRING(128), allowNull: false },
    expiresAt: { type: DataTypes.DATE, allowNull: false },
  },
  { tableName: "access_token", sequelize }
);

export default AccessToken