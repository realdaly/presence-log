import { BsDatabaseDown } from "react-icons/bs";
import Button from "@/components/ui/Button";

export default function ExportDatabaseBtn(){
    const exportDatabase = async () => {
        try {
            // import needed plugins
            const { save } = await import("@tauri-apps/plugin-dialog");
            const { BaseDirectory, copyFile } = await import("@tauri-apps/plugin-fs");

            // Open a save dialog to allow the user to specify the destination path
            const destinationPath = await save({
                defaultPath: "grades.db",
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
            await copyFile("grades.db", destinationPath, {
                fromPathBaseDir: BaseDirectory.AppData,
            });

            alert("تم حفظ قاعدة البيانات بنجاح");
        } catch(error) {
            alert("حدث خطأ في تصدير قاعدة البيانات، التفاصيل:", error);
        }
    }

    return(
        <Button
            label="تصدير قاعدة البيانات"
            setFunc={() => exportDatabase()}
        >
            <BsDatabaseDown className="size-5" />
        </Button>
    );
}