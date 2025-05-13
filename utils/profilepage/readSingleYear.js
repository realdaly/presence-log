import getDatabase from "@/utils/getDatabase";

export default async function readSingleYear(yearId){
  const db = await getDatabase();

  const result = await db.select(
    "SELECT * FROM year WHERE id = $1",
    [yearId]
  );

  return result[0] || null;
}
