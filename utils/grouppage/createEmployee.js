import getDatabase from "@/utils/getDatabase";

export default async function createEmployee(name, image, annualLeaveDays, order, groupId){
    const db = await getDatabase();

    await db.execute(
        "INSERT into 'employee' (name, image, annual_leave_days, 'order', group_id) VALUES ($1, $2, $3, $4, $5)",
        [name, image, annualLeaveDays, order, groupId],
    );
}