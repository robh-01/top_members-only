import { Router } from "express";
import * as indexController from "../controllers/indexControllers.js";

const indexRouter = Router();

indexRouter.get("/", indexController.indexPageGet);
indexRouter.get("/sign-in", indexController.signInGet);
indexRouter.post("/sign-in", indexController.signInPost);
indexRouter.post("/log-in", indexController.logInPost);
indexRouter.get("/log-out", indexController.logOutGet);
indexRouter.get("/add-message", indexController.addMessageGet);
indexRouter.post("/add-message", indexController.addMessagePost);

export { indexRouter };
