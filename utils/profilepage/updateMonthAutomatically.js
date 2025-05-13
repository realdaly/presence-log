export default async function updateMonthAutomatically(monthId, db){
  const result = await db.select(
    `SELECT 
      SUM(more_hours) AS total_more_hours, 
      SUM(more_minutes) AS total_more_minutes, 
      SUM(less_hours) AS total_less_hours, 
      SUM(less_minutes) AS total_less_minutes
    FROM day 
    WHERE month_id = $1`,
    [monthId]
  );

  const {
    total_more_hours = 0,
    total_more_minutes = 0,
    total_less_hours = 0,
    total_less_minutes = 0,
  } = result[0] || {};

  const normalized_more_hours = Math.floor(total_more_minutes / 60) + total_more_hours;
  const normalized_more_minutes = total_more_minutes % 60;

  const normalized_less_hours = Math.floor(total_less_minutes / 60) + total_less_hours;
  const normalized_less_minutes = total_less_minutes % 60;

  await db.execute(
    `UPDATE month 
      SET more_hours = $1, more_minutes = $2, 
          less_hours = $3, less_minutes = $4 
      WHERE id = $5`,
    [
      normalized_more_hours,
      normalized_more_minutes,
      normalized_less_hours,
      normalized_less_minutes,
      monthId,
    ]
  );
}