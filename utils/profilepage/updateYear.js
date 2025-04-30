import getDatabase from "@/utils/getDatabase";

export default async function updateYear(title, id){
    const db = await getDatabase();
    
    await db.execute(
        "UPDATE 'year' SET title = $1 WHERE id = $2",
        [title, id],
    );
}