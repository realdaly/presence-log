import getDatabase from "@/utils/getDatabase";

export default async function readMonths(employeeId, yearId){
    const db = await getDatabase();
    const months = await db.select(
        "SELECT * FROM month WHERE employee_id = $1 AND year_id = $2 ORDER BY id DESC",
        [employeeId, yearId]
    );
    
    return months;
}