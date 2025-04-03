import Database from "@tauri-apps/plugin-sql";

export default async function updateStudentInfo(field, value, studentId){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        `UPDATE student SET ${field} = $1 WHERE id = $2`,
        [value, studentId],
    );

}