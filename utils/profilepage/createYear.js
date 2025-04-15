import Database from "@tauri-apps/plugin-sql";

export default async function createYear(title, employeeId){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});

    await db.execute(
        `INSERT INTO year (title, employee_id, more_hours, more_minutes, less_hours, less_minutes) VALUES ($1, $2, 0, 0, 0, 0)`,
        [title, employeeId],
    );
}