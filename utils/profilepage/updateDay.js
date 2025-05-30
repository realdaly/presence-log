import getDatabase from "@/utils/getDatabase";
import updateMonthAutomatically from "@/utils/profilepage/updateMonthAutomatically";
import updateYearAutomatically from "@/utils/profilepage/updateYearAutomatically";

export default async function updateDay(
    id,
    title,
    time_off,
    is_lwop, 
    is_absent, 
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
    monthId,
    yearId
  ){
    const db = await getDatabase();
  
    let total_minutes = 0;
    let total_hours = 0;
    let more_minutes = 0;
    let more_hours = 0;
    let less_minutes = 0;
    let less_hours = 0;
  
    const required_total_minutes = (required_hours ?? 0) * 60 + (required_minutes ?? 0);
  
    if (!time_off && !is_lwop && !is_absent) {
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
  
    await db.execute("BEGIN");
    try {
      await db.execute(
        `UPDATE day SET
          title = $1,
          time_off = $2,
          is_lwop = $3,
          is_absent = $4,
          attend_hour = $5,
          attend_minute = $6,
          leave_hour = $7,
          leave_minute = $8,
          more_hours = $9,
          more_minutes = $10,
          less_hours = $11,
          less_minutes = $12,
          total_hours = $13,
          total_minutes = $14,
          exit_hour = $15,
          exit_minute = $16,
          enter_hour = $17,
          enter_minute = $18,
          date_day = $19,
          date_month = $20,
          note = $21
        WHERE id = $22`,
        [
          title,
          time_off,
          is_lwop,
          is_absent,
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
          id
        ]
      );
  
      await updateMonthAutomatically(monthId, db);
      await updateYearAutomatically(yearId, db);
  
      await db.execute("COMMIT");

    } catch (error) {
      await db.execute("ROLLBACK");
      throw error;
    }
  }