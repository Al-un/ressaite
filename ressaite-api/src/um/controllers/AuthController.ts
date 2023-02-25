import { RequestHandler } from "express";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import AccessToken from "../models/AccessToken";
import User from "../models/User";

// ----------------------------------------------------------------------------

passport.use(
  // @ts-ignore
  new LocalStrategy(async function verify(username, password, cb) {
    // console.log(`Checking ${username} and ${password}`);
    const user = await User.findOne({ where: { username, password } });
    // console.log(`Found`, user?.dataValues);
    if (!user) {
      return cb(null, false, { message: "Incorrect username or password" });
    }

    let newAccessToken = new AccessToken();
    newAccessToken.init();
    newAccessToken = await AccessToken.create(newAccessToken);

    return cb(null, { user, token: newAccessToken });
  })
);

const login: RequestHandler = (req, res, next) => {
  // https://stackoverflow.com/a/32002327/4906586
  passport.authenticate(
    "local",
    { session: false },
    function (err: any, user: any, info: any) {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.json({ message: info.message });
      }

      res.json(user);
    }
  )(req, res, next);
};

const logout: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const token = req.user.token;

  const accessToken = await AccessToken.findOne({ where: { token } });
  if (!accessToken) {
    throw new Error();
  }
  console.log("FOUND", accessToken);
  const yesterday = new Date();
  yesterday.setDate(new Date().getDate() - 1);
  accessToken.set("expiresAt", yesterday);

  await accessToken.save();

  res.status(200);
};

const signUp: RequestHandler = async (req, res, next) => {
  // @ts-ignore
  const { username, password } = req.body;
  const newUser = await User.create({
    username: username,
    password: password,
  });

  req.login(newUser, function (err) {
    res.json({ err });
  });

  // var salt = crypto.randomBytes(16);
  // crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
  //   if (err) { return next(err); }
  //   db.run('INSERT INTO users (username, hashed_password, salt) VALUES (?, ?, ?)', [
  //     req.body.username,
  //     hashedPassword,
  //     salt
  //   ], function(err) {
  //     if (err) { return next(err); }
  //     var user = {
  //       id: this.lastID,
  //       username: req.body.username
  //     };
  //     req.login(user, function(err) {
  //       if (err) { return next(err); }
  //       res.redirect('/');
  //     });
  //   });
  // });
};

// ----------------------------------------------------------------------------

export default { login, logout, signUp };
