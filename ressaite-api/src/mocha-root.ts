import { RootHookObject } from "mocha";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import { SequelizeStorage, Umzug } from "umzug";
import { Sequelize } from "sequelize";
import { sequelize } from "@/core/db/instance";
import { umzugMigrator, umzugSeeder } from "@/umzug";

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    console.log("Helloworld");

    // const db = await open({
    //   filename: "./pouet.db",
    //   driver: sqlite3.Database,
    // });

    // // console.log(!!queryInterface);
    // const sequelize = new Sequelize({
    //   dialect: "sqlite",
    //   storage: "./pouet.db",
    // });

    // // https://github.com/sequelize/umzug#minimal-example
    // const umzug = new Umzug({
    //   migrations: { glob: ["core/db/migrations/*.ts", { cwd: __dirname }] },
    //   context: sequelize,
    //   logger: console,
    //   storage: new SequelizeStorage({ sequelize }),
    // });

    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    await umzugMigrator.up();

    // returns an array of all already executed migrations
    const migrations = await umzugMigrator.executed();
    console.log("Executed migrations:", migrations);

    await umzugSeeder.up();
    const seeds = await umzugSeeder.executed();
    console.log("Executed seeds:", seeds);

    try {
      await sequelize.authenticate();
      console.log("Connection to DB OK");
    } catch (err) {
      console.error("Error when connecting to DB", err);
    }
  },
};
