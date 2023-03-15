import { RootHookObject } from "mocha";

import { sequelize } from "@/core/db/instance";
import { umzugMigrator, umzugSeeder } from "@/umzug";

export const mochaHooks: RootHookObject = {
  async beforeAll() {
    // Execute and check migrations
    await umzugMigrator.up();
    const migrations = await umzugMigrator.executed();
    console.log("Executed migrations:", migrations);

    // Execute and check seeds
    await umzugSeeder.up();
    const seeds = await umzugSeeder.executed();
    console.log("Executed seeds:", seeds);

    try {
      await sequelize.authenticate();
      console.log("Database check: connection OK");

      await sequelize.sync({ force: false, alter: false });
      console.log("Database check: models sync OK");
    } catch (err) {
      console.error("Database check: connection error", err);
    }
  },
};
