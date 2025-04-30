import getDatabase from "@/utils/getDatabase";

export default async function deleteYear(id){
    const db = await getDatabase();
    
    await db.execute(
        "DELETE FROM 'year' WHERE id = $1",
        [id]
    );

}