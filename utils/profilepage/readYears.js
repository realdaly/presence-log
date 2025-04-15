import Database from "@tauri-apps/plugin-sql";

export default async function readYears(employeeId){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});
    const years = await db.select(
        "SELECT * FROM year WHERE employee_id = $1",
        [employeeId]
    );
    
    return years;
}