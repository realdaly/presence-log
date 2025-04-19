import getDatabase from "@/utils/getDatabase";

export default async function deleteGroup(id){
    const db = await getDatabase();
    
    await db.execute(
        "DELETE FROM 'group' WHERE id = $1",
        [id]
    );

}