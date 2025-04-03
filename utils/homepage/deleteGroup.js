import Database from "@tauri-apps/plugin-sql";

export default async function deleteGroup(id){
    const db = await Database.load("sqlite:presence.db");
    
    await db.execute(
        "DELETE FROM 'group' WHERE id = $1",
        [id]
    );

}