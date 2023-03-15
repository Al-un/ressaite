import { DataTypes } from "sequelize";

import { tableName as userTableName } from "@/um/models/User";
import { tableName } from "@/um/models/AccessToken";
import { Migration } from "@/umzug";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable(tableName, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    token: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: userTableName,
        key: "id",
      },
    },
    expiresAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
  });
};

export const down: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().dropTable(tableName);
};
