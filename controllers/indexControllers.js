import { userValidations } from "../validations/userValidations.js";
import { validationResult } from "express-validator";

import * as queries from "../db/queries.js";
import { passport } from "../configs/passport.config.js";

export async function indexPageGet(req, res, next) {
  const messages = await queries.getAllMessages();
  res.render("index", { user: req.user, messages });
}

export function signInGet(req, res, next) {
  res.render("sign-in");
}

export const signInPost = [
  userValidations,
  async (req, res, next) => {
    const { errors } = validationResult(req);
    const { firstName, lastName, email, username, password } = req.body;
    const user = { firstName, lastName, email, username, password };

    if (errors.length != 0) {
      const errorMessages = errors.map((error) => error.msg);

      return res.status(400).render("sign-in", {
        errorMessage: errorMessages[0],
        previousInputs: { ...user },
      });
    }
    await queries.createUser(user);
    res.send("Sign-in successful.");
  },
];

export const logInPost = [
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/failure",
  }),
];

export function logOutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}