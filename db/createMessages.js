import pool from "./pool.js";
import generateRandomId from "../utils/generateRandomId.js";

const SQL = `INSERT INTO messages(id, message, userid) VALUES(69, 'Hello, this is the first message from the creator of this site', 'user112hjk');
INSERT INTO messages(id, message, userid) VALUES(70, 'Hello, this is the another message from THE creator.', 'user112hjk');
`;

pool.query(SQL);
