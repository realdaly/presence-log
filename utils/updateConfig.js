import getDatabase from "@/utils/getDatabase";

export default async function updateConfig(title, school, year, principal, accentColor){
    const db = await getDatabase();
    
    await db.execute(
        "UPDATE config SET title = $1, school = $2, year = $3, principal = $4, accentColor = $5 WHERE id = $6",
        [title, school, year, principal, accentColor, 1],
    );

}