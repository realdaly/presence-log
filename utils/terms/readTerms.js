import Database from "@tauri-apps/plugin-sql";

export default async function readTerms(){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});
    const terms = await db.select("SELECT * FROM term");

    return terms;
}