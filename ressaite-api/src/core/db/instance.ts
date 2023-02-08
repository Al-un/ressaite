import { Sequelize } from "sequelize";

const db_name = "ressaite";
const db_user = "ressaite";
const db_password = "ressaite";

const sequelize = new Sequelize(db_name, db_user, db_password, {
  // https://sequelize.org/docs/v6/getting-started/#connecting-to-a-database
  dialect: "postgres",
  host: "localhost",
  port: 5432,
  // https://sequelize.org/docs/v6/getting-started/#logging
  logging: console.log,
});

export { sequelize };
