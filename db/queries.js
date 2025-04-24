import pool from "./pool.js";
import generateRandomId from "../utils/generateRandomId.js";
import bcrypt from "bcryptjs";

export async function createUser(user) {
  pool.query(
    `INSERT INTO users(id, firstname, lastname, email, username, password) VALUES ($1, $2, $3, $4, $5, $6)`,
    [
      generateRandomId(),
      user.firstName,
      user.lastName,
      user.email,
      user.username,
      await bcrypt.hash(user.password, 10),
    ]
  );
}

export async function createMessage(message, user) {
  await pool.query(
    "INSERT INTO messages(id, message, userid) VALUES($1, $2, $3)",
    [generateRandomId(), message, user.id]
  );
}

export async function getAllMessages() {
  try {
    const { rows } = await pool.query("SELECT * FROM messages;");
    return rows;
  } catch (err) {
    console.log("error in retrieving messages");
    return false;
  }
}
