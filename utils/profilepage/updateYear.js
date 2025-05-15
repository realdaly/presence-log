import getDatabase from "@/utils/getDatabase";

export default async function updateYear(
  title,
  moreHours,
  moreMins,
  id
){
  const db = await getDatabase();

  await db.execute("BEGIN");
  try {
    // update the year with the provided values
    await db.execute(
      `UPDATE year SET 
        title = $1,
        more_hours = $2,
        more_minutes = $3
      WHERE id = $4`,
      [title, moreHours, moreMins, id]
    );

    // fetch the year row again to compute net time
    const yearResult = await db.select(
      `SELECT more_hours, more_minutes, less_hours, less_minutes
       FROM year
       WHERE id = $1`,
      [id]
    );

    const {
      more_hours = 0,
      more_minutes = 0,
      less_hours = 0,
      less_minutes = 0
    } = yearResult[0] || {};

    // compute net minutes
    const totalMoreMins = more_hours * 60 + more_minutes;
    const totalLessMins = less_hours * 60 + less_minutes;
    const netMinutes = totalMoreMins - totalLessMins;

    // normalize the net time
    let finalMoreHours = 0;
    let finalMoreMinutes = 0;
    let finalLessHours = 0;
    let finalLessMinutes = 0;

    if (netMinutes >= 0) {
      finalMoreHours = Math.floor(netMinutes / 60);
      finalMoreMinutes = netMinutes % 60;
    } else {
      const abs = Math.abs(netMinutes);
      finalLessHours = Math.floor(abs / 60);
      finalLessMinutes = abs % 60;
    }

    // apply normalized values to the database
    await db.execute(
      `UPDATE year SET 
        more_hours = $1,
        more_minutes = $2,
        less_hours = $3,
        less_minutes = $4
      WHERE id = $5`,
      [
        finalMoreHours,
        finalMoreMinutes,
        finalLessHours,
        finalLessMinutes,
        id
      ]
    );

    await db.execute("COMMIT");

  } catch (error) {
    await db.execute("ROLLBACK");
    throw error;
  }
}