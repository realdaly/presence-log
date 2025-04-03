import Database from "@tauri-apps/plugin-sql";

export default async function readMarks(classId){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const marks = await db.select(
        "SELECT * FROM marks WHERE class_id = $1",
        [classId]
    );
    
    return marks;
}