import Database from "@tauri-apps/plugin-sql";

export default async function readGroups(){
    const db = await Database.load("sqlite:presence.db", {dir: "AppData"});
    const groups = await db.select("SELECT * FROM 'group'");

    return groups;
}