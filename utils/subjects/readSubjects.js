import Database from "@tauri-apps/plugin-sql";

export default async function readSubjects(){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const subjects = await db.select("SELECT * FROM subject");

    return subjects;
}