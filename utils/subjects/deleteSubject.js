import Database from "@tauri-apps/plugin-sql";

export default async function deleteSubject(id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "DELETE FROM subject WHERE id = $1",
        [id]
    );

}