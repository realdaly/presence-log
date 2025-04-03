import Database from "@tauri-apps/plugin-sql";

export default async function readStudent(studentId){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const student = await db.select(
        "SELECT * FROM student WHERE id = $1",
        [studentId]
    );
    
    return student;
}