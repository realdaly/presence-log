import EmployeeCard from "@/components/grouppage/EmployeeCard";
import NoData from "@/components/ui/NoData";
import { appDataDir } from "@tauri-apps/api/path";
import { useEffect, useState } from "react";
import { convertFileSrc } from "@tauri-apps/api/core";

export default function Employees({employeesData}){
    const [appDataPath, setAppDataPath] = useState("");

    useEffect(() => {
        async function fetchAppDataPath() {
          const path = await appDataDir();
          setAppDataPath(path);
        }
        fetchAppDataPath();
    }, []);

    return(
        <div className="flex flex-wrap items-center justify-center gap-5 pt-10">
            {employeesData.map(item => {
                const assetUrl = convertFileSrc(`${appDataPath}/${item.image}`);
                
                return(
                    <EmployeeCard 
                        key={item.id}
                        name={item.name}
                        image={assetUrl}
                        path="#"
                    />
                );
            })}
            {employeesData.length == 0 &&
                <NoData />
            }
        </div>
    )
}