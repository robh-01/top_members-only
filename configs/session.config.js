import session from "express-session";
import pool from "../db/pool.js";

import dotenv from "dotenv";
dotenv.config();

import connectPgSimple from "connect-pg-simple";
const pgSession = connectPgSimple(session);

function configSession(app) {
  app.use(
    session({
      store: new pgSession({
        pool: pool,
        tableName: "user_sessions",
        createTableIfMissing: true,
        pruneSessionInterval: 60, //prune the expired sessions every 60 seconds
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 }, //1day = 24(hrs) * 60(minutes) * 60(seconds) * 1000 (milliseconds)
    })
  );
}

export default configSession;
