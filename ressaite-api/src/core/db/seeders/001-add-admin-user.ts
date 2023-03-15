import { Seeder } from "@/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
  return sequelize.getQueryInterface().bulkInsert("users", [
    {
      username: "admin",
      password: "plop",
      email: "ressaite@al-un.fr",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
  sequelize
    .getQueryInterface()
    .bulkDelete("users", { email: "ressaite@al-un.fr" }, {});
};
