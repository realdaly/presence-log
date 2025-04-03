import { BsDatabaseAdd } from "react-icons/bs";
import Button from "@/components/ui/Button";

export default function ImportDatabaseBtn(){
    const importDatabase = async () => {
        try {
            // import needed plugins
            const { open, confirm } = await import("@tauri-apps/plugin-dialog");
            const { BaseDirectory, copyFile } = await import("@tauri-apps/plugin-fs");
            
            // Open a file dialog to select the database file
            const selectedFile = await open({
                filters: [
                    {
                        name: "SQLite Database",
                        extensions: ["db"],
                    },
                ],
            });

            // If no file is selected, exit the function
            if (!selectedFile) {
                alert("لم يتم اختيار ملف");
                return;
            }

            // confirmation dialog for importing a db
            const confirmation = await confirm(
                "لا يمكن التراجع عن هذه الخطوة، هل أنت متأكد؟",
                { title: "تأكيد استيراد قاعدة البيانات", kind: "warning" }
            );

            // copy file only if confirmation is true
            if(confirmation === true){
                // Copy the selected file to the app's database location
                await copyFile(selectedFile, "grades.db", {
                    toPathBaseDir: BaseDirectory.AppData
                });
                
                // Refresh the app to work with the new database
                window.location.reload();
            }
        } catch(error){
            console.error("حدث خطأ في استيراد قاعدة البيانات، التفاصيل:", error);
        }
    }

    return(
        <Button
            label="استيراد قاعدة بيانات"
            setFunc={() => importDatabase()}
        >
            <BsDatabaseAdd className="size-5" />
        </Button>
    );
}