import getDatabase from "@/utils/getDatabase";

export default async function readEmployeeStatistics(employeeId){
  const db = await getDatabase();

  // count how many LWOP days the employee has
  const lwopResult = await db.select(
    `SELECT COUNT(*) AS count FROM day WHERE employee_id = $1 AND is_lwop = 1`,
    [employeeId]
  );
  const lwopDays = parseInt(lwopResult[0]?.count) || 0;

   // count how many absent days the employee has
   const absentResult = await db.select(
    `SELECT COUNT(*) AS count FROM day WHERE employee_id = $1 AND is_absent = 1`,
    [employeeId]
  );
  const absentDays = parseInt(absentResult[0]?.count) || 0;

  return {
    lwop_days: lwopDays,
    absent_days: absentDays
  };
}
