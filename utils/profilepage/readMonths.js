import Database from "@tauri-apps/plugin-sql";

export default async function readMonths(employeeId, yearId){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});
    const months = await db.select(
        "SELECT * FROM month WHERE employee_id = $1 AND year_id = $2 ORDER BY id DESC",
        [employeeId, yearId]
    );
    
    return months;
}