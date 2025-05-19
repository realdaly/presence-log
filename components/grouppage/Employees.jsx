import EmployeeCard from "@/components/grouppage/EmployeeCard";
import NoData from "@/components/ui/NoData";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";

export default function Employees({employeesData, getEmployees, groupTitle, groupId}){
    const [appDataPath, setAppDataPath] = useState("");

    useEffect(() => {
        async function fetchAppDataPath() {
          const path = await appDataDir();
          setAppDataPath(path);
        }
        fetchAppDataPath();
    }, []);

    return(
        <div className="mt-5 pb-5  h-[calc(100vh-250px)] overflow-y-auto xl:rounded-t-xl">
            <div className="flex flex-wrap items-center justify-center gap-5 pt-10">
                {employeesData
                // create a shallow copy to avoid mutating the original array
                .slice()
                // sort in ascending order
                .sort((a, b) => a.order - b.order)
                .map(item => (
                    <EmployeeCard 
                        key={item.id}
                        currentEmployee={item}
                        appDataPath={appDataPath}
                        getEmployees={getEmployees}
                        groupTitle={groupTitle}
                        groupId={groupId}
                    />
                ))}
                {employeesData.length == 0 &&
                    <NoData />
                }
            </div>
        </div>
    )
}