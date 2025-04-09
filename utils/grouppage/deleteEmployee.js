import Database from "@tauri-apps/plugin-sql";

export default async function deleteEmployee(id){
    const db = await Database.load("sqlite:presence.db");
    
    await db.execute(
        "DELETE FROM 'employee' WHERE id = $1",
        [id]
    );

}