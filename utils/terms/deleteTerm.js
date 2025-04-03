import Database from "@tauri-apps/plugin-sql";

export default async function deleteTerm(id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        "DELETE FROM term WHERE id = $1",
        [id]
    );

}