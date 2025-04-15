import Database from "@tauri-apps/plugin-sql";

export default async function createMonth(title, employeeId, yearId){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});

    await db.execute(
        `INSERT INTO month (title, employee_id, year_id, more_hours, more_minutes, less_hours, less_minutes) VALUES ($1, $2, $3, 0, 0, 0, 0)`,
        [title, employeeId, yearId],
    );
}