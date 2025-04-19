import getDatabase from "@/utils/getDatabase";

export default async function readEmployees(groupId){
    const db = await getDatabase();
    const employees = await db.select(
        "SELECT * FROM employee WHERE group_id = $1",
        [groupId]
    );
    
    return employees;
}