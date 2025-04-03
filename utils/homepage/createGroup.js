import Database from "@tauri-apps/plugin-sql";

export default async function createGroup(title, requiredHours, requiredMinutes){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});

    await db.execute(
        "INSERT into 'group' (title, required_hours, required_minutes) VALUES ($1, $2, $3)",
        [title, requiredHours, requiredMinutes],
    );
}