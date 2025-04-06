import path from "path";

function configEjs(app) {
  app.set("views", path.join(import.meta.dirname, "../", "views"));
    app.set("view engine", "ejs");
}

export default configEjs;
