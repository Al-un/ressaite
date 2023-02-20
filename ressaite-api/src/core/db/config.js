module.exports = {
  development: {
    username: "ressaite",
    password: "ressaite",
    database: "ressaite",
    host: "127.0.0.1",
    dialect: "postgres",
  },
  test: {
    username: "root",
    password: "",
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: "",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};
