import getDatabase from "@/utils/getDatabase";

export default async function updateGroup(title, requiredHours, requiredMinutes, id){
    const db = await getDatabase();
    
    await db.execute(
        "UPDATE 'group' SET title = $1, required_hours = $2, required_minutes = $3 WHERE id = $4",
        [title, requiredHours, requiredMinutes, id],
    );
}