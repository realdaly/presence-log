import Database from "@tauri-apps/plugin-sql";

export default async function updateSubject(title, isLiterary, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE subject SET title = $1, is_literary = $2 WHERE id = $3",
        [title, isLiterary, id],
    );

}