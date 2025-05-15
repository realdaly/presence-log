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

  // convert everything to total minutes
  const totalMoreMins = total_more_hours * 60 + total_more_minutes;
  const totalLessMins = total_less_hours * 60 + total_less_minutes;

  const netMinutes = totalMoreMins - totalLessMins;

  let more_hours = 0;
  let more_minutes = 0;
  let less_hours = 0;
  let less_minutes = 0;

  if (netMinutes >= 0) {
    more_hours = Math.floor(netMinutes / 60);
    more_minutes = netMinutes % 60;
  } else {
    const absMinutes = Math.abs(netMinutes);
    less_hours = Math.floor(absMinutes / 60);
    less_minutes = absMinutes % 60;
  }

  await db.execute(
    `UPDATE month 
      SET more_hours = $1, more_minutes = $2, 
          less_hours = $3, less_minutes = $4 
      WHERE id = $5`,
    [
      more_hours,
      more_minutes,
      less_hours,
      less_minutes,
      monthId,
    ]
  );
}