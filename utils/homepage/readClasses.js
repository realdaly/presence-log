import Database from "@tauri-apps/plugin-sql";

export default async function readClasses(setData){
    const db = await Database.load("sqlite:grades.db");
    const classes = await db.select(`
        SELECT 
            class.id, 
            class.title, 
            class.theme,
            class.is_literary, 
            COUNT(student.id) AS student_count 
        FROM 
            class
        LEFT JOIN 
            student 
        ON 
            class.id = student.class_id 
        GROUP BY 
            class.id
    `);
    if(setData){
        setData(classes);
    }
}