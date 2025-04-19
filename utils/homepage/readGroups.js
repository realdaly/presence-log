import getDatabase from "@/utils/getDatabase";

export default async function readGroups(){
    const db = await getDatabase();
    const groups = await db.select("SELECT * FROM 'group'");

    return groups;
}