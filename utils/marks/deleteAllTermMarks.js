import Database from "@tauri-apps/plugin-sql";

export default async function deleteAllTermMarks(field, classId){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        `UPDATE marks SET ${field} = NULL WHERE class_id = $1`,
        [classId],
    );

}