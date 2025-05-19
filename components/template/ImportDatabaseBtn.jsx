import { BsDatabaseAdd } from "react-icons/bs";

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
                await copyFile(selectedFile, "presence.db", {
                    toPathBaseDir: BaseDirectory.AppData
                });
                
                // move to main page to avoid errors
                window.location.href = "/";
            }
        } catch(error){
            console.error("حدث خطأ في استيراد قاعدة البيانات، التفاصيل:", error);
        }
    }

    return(
        <button
            className="flex items-center gap-x-2 w-fit bg-white text-accent1 font-bold px-3 py-1 rounded-full transition-all hover:text-white hover:bg-accent1 border border-accent1" 
            onClick={() => importDatabase()}
        >
            استيراد قاعدة بيانات
            <BsDatabaseAdd className="size-5" />
        </button>
    );
}