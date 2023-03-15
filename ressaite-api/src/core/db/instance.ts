import path from "path";
import { Sequelize } from "sequelize-typescript";

const db_username = process.env.DB_USERNAME;
const db_password = process.env.DB_PASSWORD;
const db_database = process.env.DB_NAME;
const db_host = process.env.DB_HOST;
let db_port = process.env.DB_PORT
  ? parseInt(process.env.DB_PORT, 10)
  : undefined;
const db_dialect = process.env.DB_DIALECT;
const db_storage = process.env.DB_STORAGE;

if (db_dialect === "sqlite") {
  if (!db_storage) {
    throw new Error("Need DB_STORAGE for sqlite");
  }
} else {
  if (db_dialect !== "postgres") {
    throw new Error("Please use a PostgreSQL DB");
  }

  if (!db_username || !db_password || !db_database || !db_host) {
    throw new Error("Incorrect RDBMS config!");
  }

  if (!db_port) {
    db_port = 5432;
    console.log("Using 5432 as default port");
  }
}

const sequelize = new Sequelize({
  // https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
  dialect: db_dialect,
  username: db_username,
  password: db_password,
  host: db_host,
  port: db_port,
  storage: db_storage,
  // https://sequelize.org/docs/v6/getting-started/#logging
  logging: console.log,
  // Loading models for sync
  models:[
    path.join(__dirname, "../../um/models/**/*.*"),
  ]
});

export { sequelize };
