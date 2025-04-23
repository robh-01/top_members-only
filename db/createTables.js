import pool from "./pool.js";

function generateId() {
  return crypto.randomUUID();
}

const SQL = `
CREATE TABLE IF NOT EXISTS messages(
id TEXT,
message TEXT,
userid TEXT
);

CREATE TABLE IF NOT EXISTS users(
id TEXT,
username VARCHAR(255),
firstName VARCHAR(255),
lastName VARCHAR(255),
email TEXT,
password TEXT,
isadmin BOOLEAN DEFAULT false,
ismember BOOLEAN DEFAULT false
);
`;

pool.query(SQL);
