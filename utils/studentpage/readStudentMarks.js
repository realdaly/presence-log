import Database from "@tauri-apps/plugin-sql";

export default async function readStudentMarks(studentId){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const marks = await db.select(
        "SELECT * FROM marks WHERE student_id = $1",
        [studentId]
    );
    
    return marks;
}