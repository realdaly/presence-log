import Database from "@tauri-apps/plugin-sql";

export default async function updateTerm(title, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "UPDATE term SET title = $1 WHERE id = $2",
        [title, id],
    );

}