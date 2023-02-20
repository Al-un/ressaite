import Express from "express";
import passport from "passport";

import AuthController from "../controllers/AuthController";

const AuthRouter = Express.Router();

// ----------------------------------------------------------------------------

AuthRouter.post("/login", AuthController.login);

AuthRouter.post("/signup", AuthController.signUp);

AuthRouter.post(
  "/logout",
  passport.authenticate("bearer", { session: false }),
  AuthController.logout
);

// ----------------------------------------------------------------------------

export default AuthRouter;
