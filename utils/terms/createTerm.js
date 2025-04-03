import Database from "@tauri-apps/plugin-sql";

export default async function createTerm(title, markRef){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into term (title, mark_ref) VALUES ($1, $2)",
        [title, markRef],
    );
}