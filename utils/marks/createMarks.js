import Database from "@tauri-apps/plugin-sql";

export default async function createMarks(classId, subjectId, studentId, term, mark){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        `INSERT into marks (class_id, subject_id, student_id, ${term}) VALUES ($1, $2, $3, $4)`,
        [classId, subjectId, studentId, mark],
    );
}