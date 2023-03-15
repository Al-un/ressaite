import { RootHookObject } from "mocha";

import { initSequelize, sequelize } from "@/core/db/instance";
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
      await initSequelize(sequelize);
    } catch (err) {
      console.error("Database check: connection error", err);
    }
  },
};
