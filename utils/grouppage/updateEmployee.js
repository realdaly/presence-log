import getDatabase from "@/utils/getDatabase";

export default async function updateEmployee(name, image, annualLeaveDays, order, groupId, id){
    const db = await getDatabase();
    
    await db.execute(
        "UPDATE 'employee' SET name = $1, image = $2, annual_leave_days = $3, 'order' = $4, group_id = $5 WHERE id = $6",
        [name, image, annualLeaveDays, order, groupId, id],
    );
}