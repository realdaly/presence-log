import getDatabase from "@/utils/getDatabase";

export default async function createGroup(title, requiredHours, requiredMinutes){
    const db = await getDatabase();

    await db.execute(
        "INSERT into 'group' (title, required_hours, required_minutes) VALUES ($1, $2, $3)",
        [title, requiredHours, requiredMinutes],
    );
}