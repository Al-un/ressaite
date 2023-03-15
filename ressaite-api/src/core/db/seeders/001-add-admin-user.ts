import { tableName } from "@/um/models/User";
import { Seeder } from "@/umzug";

export const up: Seeder = async ({ context: sequelize }) => {
  return sequelize.getQueryInterface().bulkInsert(tableName, [
    {
      username: "admin",
      // "pouetpouet"
      password: "$2b$10$EuERg7PrpZtUDVr5MKXYYOzuJQUWiOFuY7C4FtKiP3rwwbMIBtaVu",
      email: "ressaite@al-un.fr",
      salt: "$2b$10$EuERg7PrpZtUDVr5MKXYYO",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
};

export const down: Seeder = async ({ context: sequelize }) => {
  sequelize
    .getQueryInterface()
    .bulkDelete(tableName, { email: "ressaite@al-un.fr" }, {});
};
