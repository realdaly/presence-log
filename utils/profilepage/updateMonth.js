import getDatabase from "@/utils/getDatabase";
import updateYearAutomatically from "@/utils/profilepage/updateYearAutomatically";

export default async function updateMonth(
  title, 
  moreHours, 
  moreMins, 
  id, 
  yearId
){
  const db = await getDatabase();

  await db.execute("BEGIN");
  try {
    // update title and more time
    await db.execute(
      `UPDATE month SET 
        title = $1,
        more_hours = $2,
        more_minutes = $3
      WHERE id = $4`,
      [title, moreHours, moreMins, id]
    );

    // update the year record
    await updateYearAutomatically(yearId, db);

    // fetch the month record again to compute net time
    const monthResult = await db.select(
      `SELECT more_hours, more_minutes, less_hours, less_minutes
       FROM month
       WHERE id = $1`,
      [id]
    );

    const {
      more_hours = 0,
      more_minutes = 0,
      less_hours = 0,
      less_minutes = 0
    } = monthResult[0] || {};

    // calculate net time difference
    const totalMoreMins = more_hours * 60 + more_minutes;
    const totalLessMins = less_hours * 60 + less_minutes;
    const netMinutes = totalMoreMins - totalLessMins;

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
      `UPDATE month SET 
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