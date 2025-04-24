import getDatabase from "@/utils/getDatabase";

export default async function readSingleGroup(id){
    const db = await getDatabase();
    const group = await db.select(
        "SELECT * FROM 'group' WHERE id = $1",
        [id]
    );

    return group[0];
}