import express from "express";
import { sequelize } from "./core/db/instance";
import { faireUnPouet } from "@al-un/ressaite-core/pouet";

(async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection to DB OK");
  } catch (err) {
    console.error("Error when connecting to DB", err);
  }
})();

const app = express();

// import CookieParser from "cookie-parser";
// import BodyParser from "body-parser";
// app.use(CookieParser());
// app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json());

const port = 8000;

import AuthRouter from "@/um/routers/AuthRouter";
import AuthMiddleware from "@/um/middleware/AuthMiddleware";

app.get("/helloworld", (req, res) => {
  res.send("helloworld\n");
});

app.use(AuthRouter);

app.get("/pouet", AuthMiddleware.authenticate, function (req, res) {
  res.send("YAYY\n");
});

app.listen(port, () => {
  faireUnPouet();
  console.log("Ready to plop!");
});
