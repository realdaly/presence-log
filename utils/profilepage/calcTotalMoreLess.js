import getDatabase from "@/utils/getDatabase";

export default async function calcTotalMoreLess(employeeId){
  const db = await getDatabase();

  const result = await db.select(
    `SELECT 
      SUM(more_hours) AS total_more_hours, 
      SUM(more_minutes) AS total_more_minutes,
      SUM(less_hours) AS total_less_hours,
      SUM(less_minutes) AS total_less_minutes
    FROM year
    WHERE employee_id = $1`,
    [employeeId]
  );

  const {
    total_more_hours = 0,
    total_more_minutes = 0,
    total_less_hours = 0,
    total_less_minutes = 0,
  } = result[0] || {};

  const totalMoreMins = total_more_hours * 60 + total_more_minutes;
  const totalLessMins = total_less_hours * 60 + total_less_minutes;

  const netMinutes = totalMoreMins - totalLessMins;

  if (netMinutes >= 0) {
    const hours = Math.floor(netMinutes / 60);
    const minutes = netMinutes % 60;
    return {
      more: {
        hours,
        minutes,
      },
      less: {
        hours: 0,
        minutes: 0,
      },
    };
  } else {
    const absMinutes = Math.abs(netMinutes);
    const hours = Math.floor(absMinutes / 60);
    const minutes = absMinutes % 60;
    
    return {
      more: {
        hours: 0,
        minutes: 0,
      },
      less: {
        hours,
        minutes,
      },
    };
  }
}