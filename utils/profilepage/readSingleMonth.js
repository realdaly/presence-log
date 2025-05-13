import getDatabase from "@/utils/getDatabase";

export default async function readSingleMonth(monthId){
  const db = await getDatabase();

  const result = await db.select(
    "SELECT * FROM month WHERE id = $1",
    [monthId]
  );

  return result[0] || null;
}
