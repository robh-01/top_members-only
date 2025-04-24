import { userValidations } from "../validations/userValidations.js";
import { messageValidations } from "../validations/messageValidations.js";
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
        errorMessage: errorMessages[0], //send only one error message for clean ui
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

export function addMessageGet(req, res, next) {
  if (req.user) {
    res.render("add-message");
  } else {
    res.status(403).redirect("/");
  }
}

export const addMessagePost = [
  messageValidations,
  async (req, res, next) => {
    const { errors } = validationResult(req);
    const { message } = req.body;
    const user = req.user;

    if (errors.length != 0) {
      const errorMessages = errors.map((error) => error.msg);

      return res.status(400).render("add-message", {
        errorMessage: errorMessages[0], //send only one error message for better ui
        previousInputs: { message },
      });
    }

    if (user) {
      try {
        queries.createMessage(message, user);
        res.redirect("/");
      } catch (err) {
        res.status(500).redirect("/");
      }
    } else {
      res.status(403).redirect("/");
    }
  },
];
