import { RequestHandler } from "express";
import passport from "passport";
import { Strategy as BearerStrategy } from "passport-http-bearer";

import AccessToken from "../models/AccessToken";

// ----------------------------------------------------------------------------

passport.use(
  new BearerStrategy(async function verify(token, cb) {
    const validToken = await AccessToken.findOne({ where: { token } });
    if (!validToken) {
      return cb(null, false);
    }
    console.log("TOKEN", validToken.dataValues);
    console.log(
      `Comparing ${validToken.dataValues.expiresAt} with now ${new Date()}`
    );
    if (validToken.dataValues.expiresAt < new Date()) {
      return cb(null, false, { scope: "all", message: "expired" });
    }

    return cb(null, { token });
  })
);

const authenticate: RequestHandler = (req, res, next) => {
  passport.authenticate(
    "bearer",
    { session: false },
    function (err, user, info) {
      // console.log("ERR", err);
      // console.log("user", user);
      // console.log("info", info);
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json(info);
      }

      // console.log("POUET", req.user);
      next();
    }
  )(req, res, next);
};

// passport.serializeUser(function (user, done) {
//   done(null, user);
// });

// passport.deserializeUser(async function (id: string, done) {
//   try {
//     const user = await User.findByPk(id);
//     done(null, user);
//   } catch (err) {
//     done(err, false);
//   }
// });

// ----------------------------------------------------------------------------

export default { authenticate };
