import { RootHookObject } from "mocha";
import { Umzug } from "umzug";
import { sequelize } from "@/core/db/instance";

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    console.log("Helloworld");

    try {
      await sequelize.authenticate();
      console.log("Connection to DB OK");
    } catch (err) {
      console.error("Error when connecting to DB", err);
    }

    // https://github.com/sequelize/umzug#minimal-example
    const umzug = new Umzug({
      migrations: { glob: "src/core/db/migrations/*.js" },
      context: sequelize.getQueryInterface(),
      logger: console,
    });

    // Checks migrations and run them if they are not already applied. To keep
    // track of the executed migrations, a table (and sequelize model) called SequelizeMeta
    // will be automatically created (if it doesn't exist already) and parsed.
    await umzug.up();

    // returns an array of all already executed migrations
    const migrations = await umzug.executed();
    console.log(migrations);
  },
};
