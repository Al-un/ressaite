import { Migration } from "@/umzug";
import { DataTypes } from "sequelize";

export const up: Migration = async ({ context: sequelize }) => {
  await sequelize.getQueryInterface().createTable("access_token", {
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
  await sequelize.getQueryInterface().dropTable("access_token");
};
