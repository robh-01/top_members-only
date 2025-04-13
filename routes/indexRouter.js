import { Router } from "express";
import * as indexController from "../contollers/indexControllers.js";

const indexRouter = Router();

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/sign-in", indexController.signInGet);
indexRouter.post("/sign-in", indexController.signInPost);
indexRouter.post("/log-in", indexController.logInPost);

export { indexRouter };
