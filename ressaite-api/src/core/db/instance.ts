import { Sequelize } from "sequelize";

// import DatabaseConfig from "../../../sequelize-config.js";

// type DatabaseConfigKey = "development" | "test" | "production";

// const env_name: DatabaseConfigKey =
//   (process.env.ENV_NAME as DatabaseConfigKey) || "development";
// if (!["development", "test", "production"].includes(env_name)) {
//   throw new Error(`Incorrect ENV_NAME: ${env_name}`);
// }

// const db_name = DatabaseConfig[env_name].database;
// const db_user = DatabaseConfig[env_name].username;
// const db_password = DatabaseConfig[env_name].password;
const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
const db_dialect = process.env.DB_DIALECT;
const db_storage = process.env.DB_STORAGE;

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: ":memory:",
  logging: console.log,
});
//new Sequelize(db_name, db_user, db_password, {
//       // https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
//       dialect: "postgres",
//       host: "localhost",
//       port: 5432,
//       // https://sequelize.org/docs/v6/getting-started/#logging
//       logging: console.log,
//     })
export { sequelize };
