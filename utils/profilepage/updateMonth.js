import getDatabase from "@/utils/getDatabase";

export default async function updateMonth(title, id){
    const db = await getDatabase();
    
    await db.execute(
        "UPDATE 'month' SET title = $1 WHERE id = $2",
        [title, id],
    );
}