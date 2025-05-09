import getDatabase from "@/utils/getDatabase";

export default async function calcRemainingLeaveDays(employeeId, setRemainingLeaveDays){
  const db = await getDatabase();
  // get the total leave days set by the admin
  const employee = await db.select(
    `SELECT annual_leave_days FROM employee WHERE id = $1`,
    [employeeId]
  );

  if (!employee) {
    throw new Error(`Employee with id ${employeeId} not found`);
  }

  const totalLeaveDays = employee[0]?.annual_leave_days;
  
  // count how many leave days were taken
  const result = await db.select(
    `SELECT COUNT(*) AS count FROM day WHERE employee_id = $1 AND time_off = 1`,
    [employeeId]
  );

  const usedLeaveDays = result[0]?.count;

  // return remaining leave days
  const remainingDays =  (parseInt(totalLeaveDays) - parseInt(usedLeaveDays)) || 0;
  setRemainingLeaveDays(remainingDays);
}