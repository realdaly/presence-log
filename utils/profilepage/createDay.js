import getDatabase from "@/utils/getDatabase";

async function updateMonth(monthId, db) {
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

async function updateYear(yearId, db) {
  const result = await db.select(
    `SELECT 
      SUM(more_hours) AS total_more_hours, 
      SUM(more_minutes) AS total_more_minutes, 
      SUM(less_hours) AS total_less_hours, 
      SUM(less_minutes) AS total_less_minutes
    FROM month 
    WHERE year_id = $1`,
    [yearId]
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
    `UPDATE year 
     SET more_hours = $1, more_minutes = $2, 
         less_hours = $3, less_minutes = $4 
     WHERE id = $5`,
    [
      normalized_more_hours,
      normalized_more_minutes,
      normalized_less_hours,
      normalized_less_minutes,
      yearId,
    ]
  );
}

export default async function createDay(
  title,
  time_off,
  attend_hour,
  attend_minute,
  leave_hour,
  leave_minute,
  exit_hour,
  exit_minute,
  enter_hour,
  enter_minute,
  date_day,
  date_month,
  note,
  required_hours,
  required_minutes,
  employeeId,
  monthId,
  yearId
) {
  const db = await getDatabase();

  let total_minutes = 0;
  let total_hours = 0;
  let more_minutes = 0;
  let more_hours = 0;
  let less_minutes = 0;
  let less_hours = 0;

  const required_total_minutes = (required_hours ?? 0) * 60 + (required_minutes ?? 0);

  if (!time_off) {
    const attend_total = (parseInt(attend_hour) || 0) * 60 + (parseInt(attend_minute) || 0);
    const leave_total = (parseInt(leave_hour) || 0) * 60 + (parseInt(leave_minute) || 0);

    const exit_total =
      exit_hour != null && exit_minute != null
        ? (parseInt(exit_hour) || 0) * 60 + (parseInt(exit_minute) || 0)
        : 0;
    const enter_total =
      enter_hour != null && enter_minute != null
        ? (parseInt(enter_hour) || 0) * 60 + (parseInt(enter_minute) || 0)
        : 0;

    const implicit_time = enter_total > 0 && exit_total > 0 ? enter_total - exit_total : 0;

    const net_minutes = leave_total - attend_total - implicit_time;

    if (net_minutes > 0) {
      total_hours = Math.floor(net_minutes / 60);
      total_minutes = net_minutes % 60;
    }

    const total_worked_minutes = total_hours * 60 + total_minutes;

    if (total_worked_minutes > required_total_minutes) {
      const diff = total_worked_minutes - required_total_minutes;
      more_hours = Math.floor(diff / 60);
      more_minutes = diff % 60;
    } else if (total_worked_minutes < required_total_minutes) {
      const diff = required_total_minutes - total_worked_minutes;
      less_hours = Math.floor(diff / 60);
      less_minutes = diff % 60;
    }
  } else {
    attend_hour = 0;
    attend_minute = 0;
    leave_hour = 0;
    leave_minute = 0;
    exit_hour = 0;
    exit_minute = 0;
    enter_hour = 0;
    enter_minute = 0;
    more_hours = 0;
    more_minutes = 0;
    less_hours = 0;
    less_minutes = 0;
    total_hours = 0;
    total_minutes = 0;
  }

  // Use a transaction for stability
  await db.execute("BEGIN");
  try {
    await db.execute(
      `INSERT INTO day (
        title,
        time_off,
        attend_hour,
        attend_minute,
        leave_hour,
        leave_minute,
        more_hours,
        more_minutes,
        less_hours,
        less_minutes,
        total_hours,
        total_minutes,
        exit_hour,
        exit_minute,
        enter_hour,
        enter_minute,
        date_day,
        date_month,
        note,
        required_hours,
        required_minutes,
        employee_id,
        month_id,
        year_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6,
        $7, $8, $9, $10, $11, $12,
        $13, $14, $15, $16, $17, $18,
        $19, $20, $21, $22, $23, $24
      )`,
      [
        title,
        time_off,
        attend_hour,
        attend_minute,
        leave_hour,
        leave_minute,
        more_hours,
        more_minutes,
        less_hours,
        less_minutes,
        total_hours,
        total_minutes,
        exit_hour,
        exit_minute,
        enter_hour,
        enter_minute,
        date_day,
        date_month,
        note,
        required_hours,
        required_minutes,
        employeeId,
        monthId,
        yearId,
      ]
    );

    await updateMonth(monthId, db);
    await updateYear(yearId, db);

    await db.execute("COMMIT");
  } catch (error) {
    await db.execute("ROLLBACK");
    throw error;
  }
}