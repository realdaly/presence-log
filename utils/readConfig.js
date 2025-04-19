import getDatabase from "@/utils/getDatabase";

export default async function readConfig(setTitle, setSchool, setYear, setPrincipal, accentColor, setAccentColor){
    const defaultTitle = "ســـجـــل الـــدرجـــــات الـــمـــدرســـــي";
    const db = await getDatabase();
    const response = await db.select("SELECT * from config LIMIT 1");
    
    if(response?.length > 0){
        // set title and accentColor states to the database values if there was
        setTitle(response[0].title);
        setSchool(response[0].school);
        setYear(response[0].year);
        setPrincipal(response[0].principal);
        setAccentColor(response[0].accentColor);
    } else {
        // create single config record in "config" table if there wasn't one already addded
        await db.execute(
            "INSERT into config (title, accentColor) VALUES ($1, $2)",
            [defaultTitle, accentColor],
        );
        // set default app title
        setTitle(defaultTitle);
    }
}