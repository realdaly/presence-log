import Database from "@tauri-apps/plugin-sql";

export default async function getDatabase() {
  const db = await Database.load("sqlite:presence.db");
  await db.execute("PRAGMA foreign_keys = ON;");
  return db;
}