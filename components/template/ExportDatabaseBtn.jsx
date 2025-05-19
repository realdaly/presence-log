import { BsDatabaseDown } from "react-icons/bs";

export default function ExportDatabaseBtn(){
    const exportDatabase = async () => {
        try {
            // import needed plugins
            const { save } = await import("@tauri-apps/plugin-dialog");
            const { BaseDirectory, copyFile } = await import("@tauri-apps/plugin-fs");

            // Open a save dialog to allow the user to specify the destination path
            const destinationPath = await save({
                defaultPath: "presence.db",
                filters: [
                    {
                        name: "SQLite Database",
                        extensions: ["db"],
                    },
                ],
            });

            // If no destination is selected, exit the function
            if (!destinationPath) {
                alert("لم يتم تحديد مكان للحفظ");
                return;
            }

            // Copy the database to the specified location
            await copyFile("presence.db", destinationPath, {
                fromPathBaseDir: BaseDirectory.AppData,
            });

            alert("تم حفظ قاعدة البيانات بنجاح");
        } catch(error) {
            alert("حدث خطأ في تصدير قاعدة البيانات، التفاصيل:", error);
        }
    }

    return(
        <button
            className="flex items-center gap-x-2 w-fit bg-white text-accent1 font-bold px-3 py-1 rounded-full transition-all hover:text-white hover:bg-accent1 border border-accent1"
            onClick={() => exportDatabase()}
        >
            تصدير قاعدة البيانات
            <BsDatabaseDown className="size-5" />
        </button>
    );
}