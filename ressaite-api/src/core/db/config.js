module.exports = {
  development: {
    username: "ressaite",
    password: "ressaite",
    database: "ressaite",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    storage: process.env.DB_STORAGE,
  },
  production: {
    username: "root",
    password: "",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
