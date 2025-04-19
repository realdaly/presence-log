import getDatabase from "@/utils/getDatabase";

export default async function readYears(employeeId){
    const db = await getDatabase();
    const years = await db.select(
        "SELECT * FROM year WHERE employee_id = $1 ORDER BY id DESC",
        [employeeId]
    );
    
    return years;
}