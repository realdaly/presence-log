import getDatabase from "@/utils/getDatabase";

export default async function deleteMonth(id){
    const db = await getDatabase();
    
    await db.execute(
        "DELETE FROM 'month' WHERE id = $1",
        [id]
    );

}