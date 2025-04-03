import Database from "@tauri-apps/plugin-sql";

export default async function readEmployees(groupId){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});
    const employees = await db.select(
        "SELECT * FROM employee WHERE group_id = $1",
        [groupId]
    );
    
    return employees;
}