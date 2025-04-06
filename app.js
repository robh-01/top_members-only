import express from "express";
const app = express();

//configs
import configEjs from "./configs/ejs.config.js";

import { indexRouter } from "./routes/indexRouter.js";

configEjs(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`listening on port ${PORT}`));
