import getDatabase from "@/utils/getDatabase";
import updateYearAutomatically from "@/utils/profilepage/updateYearAutomatically";

export default async function deleteMonth(id, yearId){
  const db = await getDatabase();

  await db.execute("BEGIN");
  try {
    await db.execute(
      `DELETE FROM month WHERE id = $1`,
      [id]
    );

    await updateYearAutomatically(yearId, db);

    await db.execute("COMMIT");
  } catch (error) {
    await db.execute("ROLLBACK");
    throw error;
  }
}
