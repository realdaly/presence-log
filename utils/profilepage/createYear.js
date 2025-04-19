import getDatabase from "@/utils/getDatabase";

export default async function createYear(title, employeeId){
    const db = await getDatabase();

    await db.execute(
        `INSERT INTO year (title, employee_id, more_hours, more_minutes, less_hours, less_minutes) VALUES ($1, $2, 0, 0, 0, 0)`,
        [title, employeeId],
    );
}