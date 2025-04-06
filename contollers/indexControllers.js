import { userValidations } from "../validations/userValidations.js";
import { validationResult } from "express-validator";

import * as queries from "../db/queries.js";

export function indexPageGet(req, res, next) {
  res.render("index", { user: req.user });
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
    res.send("Sign-in successful.")
    
  },
];
