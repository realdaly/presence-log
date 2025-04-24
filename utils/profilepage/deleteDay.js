import getDatabase from "@/utils/getDatabase";

export default async function deleteDay(id){
    const db = await getDatabase();
    
    await db.execute(
        "DELETE FROM 'day' WHERE id = $1",
        [id]
    );

}