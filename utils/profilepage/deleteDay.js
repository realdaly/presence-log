import getDatabase from "@/utils/getDatabase";
import updateMonthAutomatically from "@/utils/profilepage/updateMonthAutomatically";
import updateYearAutomatically from "@/utils/profilepage/updateYearAutomatically";

export default async function deleteDay(id, monthId, yearId) {
    const db = await getDatabase();

    await db.execute("BEGIN");
    try {
        await db.execute(
            "DELETE FROM 'day' WHERE id = $1",
            [id]
        );

        await updateMonthAutomatically(monthId, db);
        await updateYearAutomatically(yearId, db);

        await db.execute("COMMIT");
    } catch (error) {
        await db.execute("ROLLBACK");
        throw error;
    }
}