import getDatabase from "@/utils/getDatabase";

export default async function deleteEmployee(id){
    const db = await getDatabase();
    
    await db.execute(
        "DELETE FROM 'employee' WHERE id = $1",
        [id]
    );

}