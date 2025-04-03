import Database from "@tauri-apps/plugin-sql";

export default async function updateMarks(field, mark, id){
    const db = await Database.load("sqlite:grades.db");
    
    await db.execute(
        `UPDATE marks SET ${field} = $1 WHERE id = $2`,
        [mark, id],
    );

}