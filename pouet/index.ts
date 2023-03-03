import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { User } from "./prout/User";
import { Sequelize } from "sequelize-typescript";
import { AccessToken } from "./pouet/AccessToken";

// this is a top-level await
(async () => {
  // open the database
  const db = await open({
    filename: "./database.db",
    driver: sqlite3.Database,
  });

  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.db",
    models: [
      path.join(__dirname, "./prout/**/*.*"),
      path.join(__dirname, "./pouet/**/*.*"),
    ],
  });

  await sequelize.sync({ force: false, alter: false });

  const allUsers = await User.findAll();
  console.log(
    "All users",
    allUsers.map((x) => x.dataValues)
  );

  for (const u of allUsers) {
    console.log(`Users ${u.username} has tokens`, u.accessTokens);
    const x = await u.$get("accessTokens");
    console.log(`Users ${u.username} has now tokens`, x);
  }

  const pouet2 = await User.findOne({
    where: { username: "pouet2" },
    include: [AccessToken],
  });
  console.log("pouet2", pouet2);

  let allTokens = await AccessToken.findAll();
  console.log(
    "All tokens",
    allTokens.map((x) => x.dataValues)
  );
  for (const t of allTokens) {
    const u = await t.$get("user");
    console.log(`Token ${t.token} has user`, u?.dataValues);
  }
  // allTokens = await AccessToken.findAll({ include: [User] });
  // console.log(
  //   "All tokens",
  //   allTokens.map((x) => x.dataValues)
  // );
})();
