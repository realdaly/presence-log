import Database from "@tauri-apps/plugin-sql";

export default async function emptyAllStudentMarks(studentId){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        `UPDATE marks SET 
            first_term_mark = NULL, 
            midterm_mark = NULL, 
            second_term_mark = NULL, 
            final_exam_mark = NULL, 
            second_try_mark = NULL 
        WHERE student_id = $1`,
        [studentId],
    );

}