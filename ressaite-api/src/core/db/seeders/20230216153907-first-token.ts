import { Seeder } from "@/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
  return sequelize.getQueryInterface().bulkInsert("access_token", [
    {
      token: "pouet",
      expiresAt: new Date("2099-12-31T23:59:59"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      token: "expired",
      expiresAt: new Date("2019-12-31T23:59:59"),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
  sequelize
    .getQueryInterface()
    .bulkDelete("access_token", { token: "pouet" }, {});
  sequelize
    .getQueryInterface()
    .bulkDelete("access_token", { token: "expired" }, {});
};
