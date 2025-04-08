import Database from "@tauri-apps/plugin-sql";

export default async function createEmployee(name, image, order, groupId){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});

    await db.execute(
        "INSERT into 'employee' (name, image, 'order', group_id) VALUES ($1, $2, $3, $4)",
        [name, image, order, groupId],
    );
}