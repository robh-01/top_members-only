import pool from "./pool.js";
import generateRandomId from "../utils/generateRandomId.js";
import bcrypt from "bcryptjs";

async function getUserInfo(userId) {
  const { rows } = await pool.query("SELECT * FROM users WHERE id=$1", [
    userId,
  ]);
  if (rows.length === 0) {
    return null;
  }
  return rows[0];
}

//returns an object with message(text), username of the user who added the message, and added date
async function getMessageInfo(messageId) {
  const { rows } = await pool.query("SELECT * FROM messages WHERE id=$1", [
    messageId,
  ]);
  const message = rows[0].message;
  const creationDate = rows[0].created_at;
  const userInfo = await getUserInfo(rows[0].userid);
  let userName;
  if (userInfo) {
    userName = userInfo.username;
  } else {
    userName = "Not available";
  }
  return { message, userName, creationDate };
}

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
    const messages = await Promise.all(
      rows.map(async (message) => await getMessageInfo(message.id))
    );
    return messages;
  } catch (err) {
    console.log("error in retrieving messages");
    return false;
  }
}

export async function makeMember(userId) {
  try {
    await pool.query("UPDATE users SET ismember=true WHERE id=$1;", [userId]);
    return true;
  } catch (err) {
    console.log("error in making member");
    return false;
  }
}
