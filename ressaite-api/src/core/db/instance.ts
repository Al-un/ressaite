import { Sequelize } from "sequelize";

import DatabaseConfig from "./config.js";

type DatabaseConfigKey = "development" | "test" | "production";

const env_name: DatabaseConfigKey =
  (process.env.ENV_NAME as DatabaseConfigKey) || "development";
if (!["development", "test", "production"].includes(env_name)) {
  throw new Error(`Incorrect ENV_NAME: ${env_name}`);
}

const db_name = DatabaseConfig[env_name].database;
const db_user = DatabaseConfig[env_name].username;
const db_password = DatabaseConfig[env_name].password;

const sequelize = new Sequelize(db_name, db_user, db_password, {
  // https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  // https://sequelize.org/docs/v6/getting-started/#logging
  logging: console.log,
});

export { sequelize };
