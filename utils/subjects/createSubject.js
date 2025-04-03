import Database from "@tauri-apps/plugin-sql";

export default async function createSubject(title, isLiterary){
    const db = await Database.load("sqlite:grades.db", {dir: "AppData"});

    await db.execute(
        "INSERT into subject (title, is_literary) VALUES ($1, $2)",
        [title, isLiterary],
    );
}