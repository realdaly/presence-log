import getDatabase from "@/utils/getDatabase";

export default async function readDays(employeeId, monthId, yearId){
    const db = await getDatabase();
    const days = await db.select(
        "SELECT * FROM day WHERE employee_id = $1 AND month_id = $2 AND year_id = $3 ORDER BY id DESC",
        [employeeId, monthId, yearId]
    );
    
    return days;
}